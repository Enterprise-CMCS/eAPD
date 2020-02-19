const uuidv4 = require('uuid/v4');
const knex = require('./knex');

const createNewFileForAPD = async (
  apdID,
  metadata = null,
  size = 0,
  { db = knex, uuid = uuidv4 } = {}
) => {
  const id = uuid();
  await db('apd_files').insert({
    id,
    apd_id: apdID,
    metadata,
    size
  });
  return id;
};

const deleteFileByID = async (id, { db = knex } = {}) =>
  db('apd_files')
    .where('id', id)
    .delete();

const fileBelongsToAPD = async (id, apdID, { db = knex } = {}) => {
  const c = await db('apd_files')
    .where({ id, apd_id: apdID })
    .count();
  return +c[0].count === 1;
};

module.exports = { createNewFileForAPD, deleteFileByID, fileBelongsToAPD };
