const mongoose = require('mongoose');
const toMongodb = require('jsonpatch-to-mongodb');
const jsonpointer = require('jsonpointer');
const logger = require('../logger')('db/apds');
const { updateStateProfile } = require('./states');
const { validateApd } = require('../schemas');

const createAPD = async (apd, { APD = mongoose.model('APD') } = {}) => {
  let newApd = new APD(apd);

  newApd = await newApd.save();
  return newApd._id.toString(); // eslint-disable-line no-underscore-dangle
};

const deleteAPDByID = async (id, { APD = mongoose.model('APD') } = {}) =>
  APD.updateOne({ _id: id }, { status: 'archived' }).exec();

const getAllAPDsByState = async (
  stateId,
  { APD = mongoose.model('APD') } = {}
) =>
  APD.find(
    { stateId, status: 'draft' },
    '_id id createdAt updatedAt stateId status name years'
  ).lean();

const getAPDByID = async (id, { APD = mongoose.model('APD') } = {}) =>
  APD.findById(id).lean();

const getAPDByIDAndState = (
  id,
  stateId,
  { APD = mongoose.model('APD') } = {}
) => APD.findOne({ _id: id, stateId }).lean();

const updateAPDDocument = async (
  id,
  stateId,
  patch,
  {
    APD = mongoose.model('APD'),
    updateProfile = updateStateProfile,
    validate = validateApd
  } = {}
) => {
  if (patch.length > 0) {
    const updateErrors = {};
    let updated = [...patch];
    // Add updatedAt timestamp to the patch
    patch.push({ op: 'replace', path: 'updatedAt', value: Date.now() });
    try {
      // Convert the patches to a mongo update format and update the APD
      const mongoPatch = toMongodb(patch);
      await APD.updateOne({ _id: id, stateId }, mongoPatch, {
        multipleCastError: true
      });
    } catch (err) {
      logger.error(`Error patching APD ${id}: ${JSON.stringify(err)}`);

      // convert patch array to a map to make it easier to update the error cases
      const updatedPatch = {};
      patch.forEach(({ op, path, value }) => {
        updatedPatch[path] = { op, path, value };
      });

      Object.keys(err.errors).forEach(key => {
        const {
          name,
          message,
          stringValue,
          value,
          kind,
          valueType
        } = err.errors[key];

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
        updatedPatch[dataPath] = { op: 'replace', path: dataPath, value: null };
      });

      // If there are errors, nothing was saved, so we need to try to update again
      const validPatches = Object.keys(updatedPatch).map(
        key => updatedPatch[key]
      );
      const mongoPatch = toMongodb(validPatches);
      await APD.updateOne({ _id: id, stateId }, mongoPatch, {
        multipleCastError: true
      });

      // convert updatedPatch map to an array and set it to updated
      updated = Object.keys(updatedPatch).map(key => updatedPatch[key]);
    }
    // Get the updated apd json
    const apd = await APD.findOne({ _id: id, stateId }).lean();

    // Determine if state profile needs to be updated in postgres
    const stateUpdated = patch.find(({ path }) =>
      path.includes('/stateProfile')
    );
    if (stateUpdated) {
      await updateProfile(stateId, apd.stateProfile);
    }

    // Will probably eventually switch to apd.validate
    const validationErrors = {};
    const valid = validate(JSON.parse(JSON.stringify(apd)));
    if (!valid) {
      // Rather than send back the full error from the validator, pull out just the relevant bits
      // and fetch the value that's causing the error.
      validate.errors.forEach(({ dataPath, message }) => {
        validationErrors[dataPath] = {
          dataPath,
          message,
          value: jsonpointer.get(apd, dataPath)
        };
      });
    }

    return {
      errors: { ...updateErrors, ...validationErrors },
      apd,
      stateUpdated,
      updated
    };
  }
  // If there are no patches, return the original APD
  return {
    apd: await APD.findOne({ _id: id, stateId }).lean(),
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
