/* eslint-disable camelcase */
const knex = require('./knex');

const addStateAdminCertification = (
  data,
  { db = knex } = {}
) => {    
  const today = new Date();      
  const oneYearFromToday = new Date(new Date().setFullYear(new Date().getFullYear() + 1));

  return db('state_admin_certifications')
    .insert({
      certificationDate: today,
      certificationExpiration: oneYearFromToday,
      ...data
    })
    .then(() =>{
      return db('state_admin_certifications_audit')
        .insert({
          changedBy: data.username,
          changeDate: today,
          changeType: 'add'
        })
    });
};
    
module.exports = { addStateAdminCertification };