const knex = require('./knex');
const { updateStateProfile } = require('./states');

const createAPD = async (apd, { db = knex } = {}) => {
  const ids = await db('apds')
    .insert(apd)
    .returning('id');
  return ids[0];
};

const deleteAPDByID = async (id, { db = knex } = {}) => {
  await db('apds')
    .where('id', id)
    .update({ status: 'archived' });
};

const getAllAPDsByState = async (stateID, { db = knex } = {}) =>
  db('apds')
    .where('state_id', stateID)
    .select('document', 'id', 'state_id', 'status', 'updated_at');

const getAPDByID = async (id, { db = knex } = {}) =>
  db('apds')
    .where('id', id)
    .first('document', 'id', 'state_id', 'status', 'updated_at');

const getAPDByIDAndState = async (id, stateID, { db = knex } = {}) =>
  db('apds')
    .where('id', id)
    .andWhere('state_id', stateID)
    .first('document', 'id', 'state_id', 'status', 'updated_at');

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
  deleteAPDByID,
  getAllAPDsByState,
  getAPDByID,
  getAPDByIDAndState,
  updateAPDDocument
};
