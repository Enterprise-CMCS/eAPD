import nodeCrypto from 'crypto';
import knex from './knex';

export const createNewFileForAPD = async (
  fileBuffer,
  apdID,
  metadata = null,
  size = 0,
  { db = knex, crypto = nodeCrypto } = {}
) => {
  const id = crypto.createHash('sha256').update(fileBuffer).digest('hex');

  const [{ count }] = await db('apd_files')
    .count()
    .where({ id, apd_id: apdID });

  if (+count === 0) {
    await db('apd_files').insert({
      id,
      apd_id: apdID,
      metadata,
      size
    });
  }
  return id;
};

export const deleteFileByID = async (id, { db = knex } = {}) =>
  db('apd_files').where('id', id).delete();

export const fileBelongsToAPD = async (id, apdID, { db = knex } = {}) => {
  const c = await db('apd_files').where({ id, apd_id: apdID }).count();
  return +c[0].count === 1;
};
