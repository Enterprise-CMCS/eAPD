const mongoose = require('mongoose');
const toMongodb = require('jsonpatch-to-mongodb');
const logger = require('../logger')('db/apds');
const { updateStateProfile } = require('./states');

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
  { APD = mongoose.model('APD'), updateProfile = updateStateProfile } = {}
) => {
  // Convert the patches to a mongo update format and update the APD
  let updateErrors;
  try {
    await APD.updateOne(
      { _id: id, stateId },
      toMongodb([
        ...patch,
        { op: 'replace', path: '/updatedAt', value: Date.now() }
      ]),
      {
        multipleCastError: true,
        strict: true
      }
    );
  } catch (err) {
    updateErrors = err.errors;
    logger.error(`Error patching APD ${id}: ${JSON.stringify(err)}`);
  }

  const apd = await APD.findOne({ _id: id, stateId }).exec();

  // Determine if state profile needs to be updated in postgres
  const stateUpdated = patch.find(({ path }) => path.includes('/stateProfile'));
  if (stateUpdated) {
    await updateProfile(stateId, apd.stateProfile);
  }
  const validationErrors = apd.validateSync() || [];

  return {
    errors: { ...updateErrors, ...validationErrors },
    apd: apd._doc, // eslint-disable-line no-underscore-dangle
    stateUpdated
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
