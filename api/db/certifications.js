const nodeCrypto = require('crypto');
const knex = require('./knex');

const addStateAdminCertification = async (
  fileBuffer,
  username,
  state,
  certifiedBy,
  email,
  fileSize = 0,
  fileMetadata = null,
  { db = knex, crypto = nodeCrypto } = {}
) => {
  const fileId = crypto
    .createHash('sha256')
    .update(fileBuffer)
    .digest('hex');
  
  const today = new Date();      
  const oneYearFromToday = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  await db('state_admin_certifications').insert({
    username,
    state,
    certificationDate: today,
    certificationExpiration: oneYearFromToday,
    certifiedBy,
    fileId,
    fileSize,
    fileMetadata,
    email
  });
  return fileId;
};

const deleteStateAdminCertification = async (fileId, { db = knex } = {}) =>
  db('state_admin_certifications')
    .where('fileId', fileId)
    .delete();
    
module.exports = { addStateAdminCertification, deleteStateAdminCertification };