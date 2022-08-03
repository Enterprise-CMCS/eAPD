const { applyPatch } = require('fast-json-patch');
const jsonpointer = require('jsonpointer');
const logger = require('../logger')('db/apds');
const { updateStateProfile } = require('./states');
const { validateApd } = require('../schemas');
const { APD } = require('../models');

const createAPD = async apd => {
  // There is an update to mongoose for a prototype polution vulnerability.
  // Resolving the vulnerability causes some issues with deeply nested objects
  // in the model. The way to resolve this issue is to remove the deeply nested
  // object from the model before saving and then set it using and update with
  // the full path values.
  const { actualExpenditures = {} } = JSON.parse(
    JSON.stringify(apd.previousActivities || {})
  );
  console.log(`adding APD id=${apd.id} _id=${apd._id}`);
  let newApd = new APD({
    ...apd,
    previousActivities: {
      ...apd.previousActivities,
      actualExpenditures: undefined // remove the deeply nested object causing issues
    }
  });
  logger.verbose(`Creating APD: ${newApd._id}`);
  newApd = await newApd.save();

  // update the record with the deeply nested object using their full paths
  const set = {};
  Object.keys(actualExpenditures).forEach(year => {
    set[`previousActivities.actualExpenditures.${year}.hithie`] =
      actualExpenditures[year].hithie;
    set[`previousActivities.actualExpenditures.${year}.mmis.50`] =
      actualExpenditures[year].mmis['50'];
    set[`previousActivities.actualExpenditures.${year}.mmis.75`] =
      actualExpenditures[year].mmis['75'];
    set[`previousActivities.actualExpenditures.${year}.mmis.90`] =
      actualExpenditures[year].mmis['90'];
  });
  await APD.updateOne(
    // eslint-disable-next-line no-underscore-dangle
    { _id: newApd._id },
    {
      $set: set
    }
  );

  return newApd._id.toString(); // eslint-disable-line no-underscore-dangle
};

const deleteAPDByID = async id =>
  APD.updateOne({ _id: id }, { status: 'archived' }).exec();

const getAllAPDsByState = async stateId =>
  APD.find(
    { stateId, status: 'draft' },
    '_id id createdAt updatedAt stateId status name years'
  ).lean();

const getAPDByID = async id => APD.findById(id).lean();

const getAPDByIDAndState = (id, stateId) =>
  APD.findOne({ _id: id, stateId }).lean();

// Apply the patches to the APD document
const patchAPD = async (id, stateId, apdDoc, patch) => {
  // duplicate the apdDoc so that dates will be converted to strings
  const apdJSON = JSON.parse(JSON.stringify(apdDoc));
  // apply the patches to the apd
  const { newDocument } = applyPatch(apdJSON, patch);
  // update the apd in the database
  await APD.replaceOne({ _id: id, stateId }, newDocument, {
    multipleCastError: true,
    runValidators: true
  });
  // return the updated apd
  return newDocument;
};

const updateAPDDocument = async (
  id,
  stateId,
  patch,
  { updateProfile = updateStateProfile, validate = validateApd } = {}
) => {
  // Get the updated apd json
  const apdDoc = await APD.findOne({ _id: id, stateId }).lean();
  if (patch.length > 0) {
    let updatedDoc;
    const updateErrors = {};
    let updated = [...patch];
    // Add updatedAt timestamp to the patch
    patch.push({
      op: 'replace',
      path: '/updatedAt',
      value: new Date().toISOString()
    });
    try {
      updatedDoc = await patchAPD(id, stateId, apdDoc, patch, { APD });
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
      const validPatches = Object.keys(updatedPatch).map(
        key => updatedPatch[key]
      );
      updatedDoc = await patchAPD(id, stateId, apdDoc, validPatches, { APD });

      // convert updatedPatch map to an array and set it to updated
      updated = Object.keys(updatedPatch).map(key => updatedPatch[key]);
    }

    // Determine if state profile needs to be updated in postgres
    const stateUpdated = patch.find(({ path }) =>
      path.includes('/keyStatePersonnel')
    );
    if (stateUpdated) {
      await updateProfile(stateId, updatedDoc.keyStatePersonnel);
    }

    // Will probably eventually switch to apd.validate
    const validationErrors = {};
    const valid = validate(JSON.parse(JSON.stringify(updatedDoc)));
    if (!valid) {
      // Rather than send back the full error from the validator, pull out just the relevant bits
      // and fetch the value that's causing the error.
      validate.errors.forEach(({ instancePath, message }) => {
        validationErrors[instancePath] = {
          dataPath: instancePath,
          message,
          value: jsonpointer.get(updatedDoc, instancePath)
        };
      });
    }

    return {
      errors: { ...updateErrors, ...validationErrors },
      apd: updatedDoc,
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
  updateAPDDocument
};
