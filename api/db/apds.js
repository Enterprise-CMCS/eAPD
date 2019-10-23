const db = require('./knex');
const { updateStateProfile } = require('./states');

const createAPD = async apd => {
  const ids = await db('apds')
    .insert(apd)
    .returning('id');
  return ids[0];
};

const deleteAPDByID = async id => {
  await db('apds')
    .where('id', id)
    .update({ status: 'archived' });
};

const getAllAPDsByState = async stateID =>
  db('apds')
    .where('state_id', stateID)
    .select('document', 'id', 'state_id', 'status', 'updated_at');

const getAPDByID = async id =>
  db('apds')
    .where('id', id)
    .first('document', 'id', 'state_id', 'status', 'updated_at');

const getAPDByIDAndState = async (id, stateID) =>
  db('apds')
    .where('id', id)
    .andWhere('state_id', stateID)
    .first('document', 'id', 'state_id', 'status', 'updated_at');

const updateAPDDocument = async (id, stateID, document) => {
  const updateTime = new Date().toISOString();

  const transaction = await db.transaction();
  await transaction('apds')
    .where('id', id)
    .update({ document, updated_at: updateTime });

  await updateStateProfile(stateID, document.stateProfile, { transaction });

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
