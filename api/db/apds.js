import { applyPatch } from 'fast-json-patch';
import { deepCopy, calculateBudget, hasBudgetUpdate } from '@cms-eapd/common';
import loggerFactory from '../logger/index.js';
import { updateStateProfile } from './states.js';
import adminCheckApd from '../util/adminCheck.js';
import { Budget, APD } from '../models/index.js';

const logger = loggerFactory('db/apds');

export const createAPD = async apd => {
  const apdDoc = await APD.create(apd);
  const newBudget = await Budget.create(calculateBudget(apdDoc.toJSON()));
  apdDoc.budget = newBudget;
  await apdDoc.save();

  return apdDoc._id.toString(); // eslint-disable-line no-underscore-dangle
};

export const deleteAPDByID = async id =>
  APD.updateOne({ _id: id }, { status: 'archived' });

export const getAllAPDsByState = async stateId =>
  APD.find(
    { stateId, status: 'draft' },
    '_id id createdAt updatedAt stateId status name years'
  ).lean();

export const getAPDByID = async id =>
  APD.findById(id).lean().populate('budget');

export const getAPDByIDAndState = (id, stateId) =>
  APD.findOne({ _id: id, stateId }).lean().populate('budget');

// Apply the patches to the APD document
const patchAPD = async (id, stateId, apdDoc, patch) => {
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
  return APD.findOne({ _id: id, stateId }).lean();
};

export const adminCheckAPDDocument = async id => {
  // get the updated apd json
  const apdDoc = await getAPDByID(id);
  // call admin check util
  return adminCheckApd(apdDoc);
};

export const updateAPDDocument = async (
  id,
  stateId,
  patch,
  { updateProfile = updateStateProfile } = {}
) => {
  // Get the updated apd json
  const apdDoc = await APD.findOne({ _id: id, stateId })
    .populate('budget')
    .lean();
  if (patch.length > 0) {
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
      updatedDoc = await patchAPD(id, stateId, apdDoc, patch);
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
      updatedDoc = await patchAPD(id, stateId, apdDoc, validPatches);

      // convert updatedPatch map to an array and set it to updated
      updated = Object.keys(updatedPatch).map(key => updatedPatch[key]);
    }

    try {
      if (hasBudgetUpdate(validPatches)) {
        updatedBudget = calculateBudget(updatedDoc);
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
