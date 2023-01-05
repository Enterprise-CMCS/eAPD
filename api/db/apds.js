const { applyPatch } = require('fast-json-patch');
const {
  deepCopy,
  calculateBudget,
  hasBudgetUpdate,
  APD_TYPE
} = require('@cms-eapd/common');

const knex = require('./knex');
const logger = require('../logger')('db/apds');
const { updateStateProfile } = require('./states');
const {
  Budget,
  HITECHBudget,
  MMISBudget,
  APD,
  HITECH,
  MMIS
} = require('../models/index');
const { adminCheckApd } = require('../util/adminCheck');

const getApdModel = apdType => {
  let model;
  switch (apdType) {
    case APD_TYPE.HITECH:
      model = HITECH;
      break;
    case APD_TYPE.MMIS:
      model = MMIS;
      break;
    default:
      model = APD;
  }
  return model;
};

const getBudgetModel = apdType => {
  let model;
  switch (apdType) {
    case APD_TYPE.HITECH:
      model = HITECHBudget;
      break;
    case APD_TYPE.MMIS:
      model = MMISBudget;
      break;
    default:
      model = Budget;
  }
  return model;
};

const createAPD = async apd => {
  const apdJSON = deepCopy(apd);
  const { apdType } = apd;

  const apdDoc = await getApdModel(apdType).create(apdJSON);
  const json = calculateBudget(apdDoc.toJSON());
  const newBudget = await getBudgetModel(apdType).create(json);
  apdDoc.budget = newBudget;
  await apdDoc.save();

  return apdDoc._id.toString(); // eslint-disable-line no-underscore-dangle
};

const deleteAPDByID = async id =>
  APD.updateOne({ _id: id }, { status: 'archived' });

const getAllAPDsByState = async stateId =>
  APD.find(
    { stateId, status: 'draft' },
    '_id id createdAt updatedAt stateId status name years apdType'
  )
    .lean({ virtuals: true })
    .sort({ updatedAt: 'desc' });

const getAPDByID = async id =>
  APD.findById(id).populate('budget').lean({ virtuals: true });

const getAPDByIDAndState = async (id, stateId) =>
  APD.findOne({ _id: id, stateId }).populate('budget').lean({ virtuals: true });

const getAllSubmittedAPDs = async () =>
  APD.find({ status: 'submitted' }).populate('budget').lean({ virtuals: true });

const processUpdate = (
  updatedAt,
  { apdId, newStatus: status = null, comment } = {},
  { db = knex } = {}
) =>
  new Promise(resolve => {
    const result = { apdId, success: false };
    // check that the status has a value
    if (!status || status === '') {
      logger.error(`Error updating ${apdId} status: newStatus is missing`);
      resolve({ ...result, error: 'newStatus missing' });
    }
    // check that the apdId is a valid APD
    APD.findById(apdId)
      .lean({ virtuals: true })
      .then(found => {
        if (!found) {
          logger.error(
            `Error updating ${apdId} status: No APD found for APD Id`
          );
          resolve({ ...result, error: 'No APD found for APD Id' });
        }
        // Insert the status update
        db('apd_review_status')
          .insert({
            apd_id: apdId,
            status,
            comment,
            updated_at: updatedAt
          })
          .returning(['apd_id', 'status'])
          .then(([updated]) => {
            logger.info(
              `Success: updated ${updated.apd_id} status to ${updated.status}`
            );
            resolve({
              apdId: updated.apd_id,
              updatedStatus: updated.status,
              success: true
            });
          })
          .catch(error => {
            // catch for inserting into the database
            logger.error(`Error updating ${apdId} status: ${error}`);
            resolve({ ...result, error });
          });
      })
      .catch(() => {
        // catch for APD look up
        logger.error(`Error updating ${apdId} status: APD Id is invalid`);
        resolve({ ...result, error: 'APD Id is invalid' });
      });
  });

const updateAPDReviewStatus = async ({ updates = [] } = {}) => {
  const updatedAt = new Date().toISOString();
  return Promise.all(updates.map(update => processUpdate(updatedAt, update)));
};

// Apply the patches to the APD document
const patchAPD = async ({ id, stateId, apdDoc, patch }) => {
  // duplicate the apdDoc so that dates will be converted to strings
  const apdJSON = deepCopy(apdDoc);
  // apply the patches to the apd
  const { newDocument } = applyPatch(apdJSON, patch);
  // update the apd in the database
  await APD.replaceOne({ _id: id, stateId }, newDocument, {
    multipleCastError: true,
    runValidators: true
  });

  // return the updated apd
  return APD.findOne({ _id: id, stateId }).lean({ virtuals: true });
};

const adminCheckAPDDocument = async id => {
  // get the updated apd json
  const apdDoc = await getAPDByID(id);
  // call admin check util
  return adminCheckApd(apdDoc);
};

const updateAPDDocument = async (
  { id, stateId, patch },
  { updateProfile = updateStateProfile } = {}
) => {
  // Get the updated apd json
  const apdDoc = await APD.findOne({ _id: id, stateId })
    .populate('budget')
    .lean({ virtuals: true });
  if (apdDoc && patch.length > 0) {
    let updatedDoc;
    const updateErrors = {};
    let updatedBudget = deepCopy(apdDoc.budget);
    const budgetErrors = {};
    let updated = [...patch];
    let validPatches = [...patch];
    // Add updatedAt timestamp to the patch
    patch.push({
      op: 'replace',
      path: '/updatedAt',
      value: new Date().toISOString()
    });
    try {
      updatedDoc = await patchAPD({ id, stateId, apdDoc, patch });
    } catch (err) {
      logger.error(`Error patching APD ${id}: ${JSON.stringify(err)}`);

      // convert patch array to a map to make it easier to update the error cases
      const updatedPatch = {};
      patch.forEach(({ op, path, value }) => {
        updatedPatch[path] = { op, path, value };
      });

      if (err?.errors) {
        Object.keys(err.errors).forEach(key => {
          const { name, message, stringValue, value, kind, valueType } =
            err.errors[key];

          // convert error path from mongo style to json patch style
          const dataPath = `/${key.replace(/\./g, '/')}`;
          // Add error to updateErrors map
          updateErrors[dataPath] = {
            dataPath,
            name,
            message,
            valueType,
            stringValue,
            kind,
            errorValue: value,
            newValue: null
          };

          // update the updatePatch to set the value to null instead of the invalid value
          updatedPatch[dataPath] = {
            op: 'replace',
            path: dataPath,
            value: null
          };
        });
      }

      // If there are errors, nothing was saved, so we need to try to update again
      validPatches = Object.keys(updatedPatch).map(key => updatedPatch[key]);
      updatedDoc = await patchAPD({ id, stateId, apdDoc, patch: validPatches });

      // convert updatedPatch map to an array and set it to updated
      updated = Object.keys(updatedPatch).map(key => updatedPatch[key]);
    }

    try {
      if (hasBudgetUpdate(validPatches)) {
        updatedBudget = calculateBudget(updatedDoc);
        // eslint-disable-next-line no-underscore-dangle
        updatedBudget.__t = apdDoc.budget.__t;
        // eslint-disable-next-line no-underscore-dangle
        await Budget.replaceOne({ _id: updatedDoc.budget }, updatedBudget, {
          multipleCastError: true,
          runValidators: true
        });
      }
    } catch (e) {
      logger.error(`Error updating budget for APD ${id}: ${JSON.stringify(e)}`);
      budgetErrors.error = e;
    }

    // Determine if state profile needs to be updated in postgres
    const stateUpdated = patch.find(({ path }) =>
      path.includes('/keyStatePersonnel')
    );
    if (stateUpdated) {
      await updateProfile(stateId, updatedDoc.keyStatePersonnel);
    }

    return {
      errors: { ...updateErrors },
      apd: {
        ...updatedDoc,
        budget: updatedBudget
      },
      stateUpdated,
      updated
    };
  }
  // If there are no patches, return the original APD
  return {
    apd: apdDoc,
    errors: {},
    stateUpdated: false,
    updated: []
  };
};

module.exports = {
  createAPD,
  deleteAPDByID,
  getAllAPDsByState,
  getAPDByID,
  getAPDByIDAndState,
  getAllSubmittedAPDs,
  updateAPDReviewStatus,
  updateAPDDocument,
  adminCheckAPDDocument
};
