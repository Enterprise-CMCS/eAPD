/* eslint-disable camelcase */
const knex = require('./knex');

const addStateAdminCertification = async (
  username,
  name, 
  email, 
  phone, 
  state, 
  certifiedByName,
  certifiedByTitle,
  certifiedByEmail,
  certifiedBySignature,
  fileUrl,
  { db = knex } = {}
) => {    
  const today = new Date();      
  const oneYearFromToday = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  return await db('state_admin_certifications').insert({
    username,
    name, 
    email, 
    phone, 
    state, 
    certifiedByName,
    certifiedByTitle,
    certifiedByEmail,
    certifiedBySignature,
    fileUrl,
    certificationDate: today,
    certificationExpiration: oneYearFromToday
  });
};
    
module.exports = { addStateAdminCertification };