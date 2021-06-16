const mongoose = require('mongoose');
const knex = require('./knex');
const { updateStateProfile } = require('./states');

const createAPD = async (apd, { APD = mongoose.model('APD') } = {}) => {
  let newApd = new APD(apd);

  newApd = await newApd.save();
  return newApd._id; // eslint-disable-line no-underscore-dangle
};

const deleteAPD = async (id, { APD = mongoose.model('APD') } = {}) => {
  const result = await APD.findOneAndRemove({ _id: id });
  return result;
};

const deleteAPDByID = async (id, { db = knex } = {}) => {
  await db('apds').where('id', id).update({ status: 'archived' });
};

const getAllAPDsByState = async (stateID, { db = knex } = {}) =>
  db('apds')
    .where('state_id', stateID)
    .select('created_at', 'document', 'id', 'state_id', 'status', 'updated_at');

const getAPDByID = async (id, { db = knex } = {}) =>
  db('apds')
    .where('id', id)
    .first('created_at', 'document', 'id', 'state_id', 'status', 'updated_at');

const getAPDByIDAndState = (id, stateID, { db = knex } = {}) =>
  db('apds')
    .where('id', id)
    .andWhere('state_id', stateID)
    .first('created_at', 'document', 'id', 'state_id', 'status', 'updated_at');

const updateAPDDocument = async (
  id,
  stateID,
  document,
  { db = knex, updateProfile = updateStateProfile } = {}
) => {
  const updateTime = new Date().toISOString();

  const transaction = await db.transaction();
  await transaction('apds')
    .where('id', id)
    .update({ document, updated_at: updateTime });

  if (document.stateProfile) {
    await updateProfile(stateID, document.stateProfile, { transaction });
  }

  await transaction.commit();

  return updateTime;
};

module.exports = {
  createAPD,
  deleteAPD,
  deleteAPDByID,
  getAllAPDsByState,
  getAPDByID,
  getAPDByIDAndState,
  updateAPDDocument
};
