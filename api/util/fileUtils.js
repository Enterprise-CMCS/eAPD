const ft = require('file-type');
const knex = require('../db/knex');

const generateFileName = async (
  buffer,
  fileId,
  { db = knex } = {}
) => {
  const { ext = null } = await ft.fromBuffer(buffer);
  
  const certification = await db('state_admin_certifications')
    .select('name', 'state', 'ffy')
    .where('fileUrl', 'like', `%${fileId}%`)
    .first();
    
  const reversedName = certification.name.split(' ').reverse().join('-');
  
  const upperCaseState = certification.state.toUpperCase();
  
  return `${reversedName}-${upperCaseState}-${certification.ffy}.${ext}`;
}
  
module.exports = {
  generateFileName
};