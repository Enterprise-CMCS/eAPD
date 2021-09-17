/* eslint-disable camelcase */
const knex = require('./knex');

const addStateAdminCertification = (
  data,
  { db = knex } = {}
) => {
    
  return db('state_admin_certifications')
    .insert({...data}, ['id'])
    .then(ids => {
      return db('state_admin_certifications_audit')
        .insert({
          changeDate: new Date(),
          changedBy: data.uploadedBy,
          changeType: 'add',
          certificationId: ids[0].id
        })
    })
};
    
module.exports = { addStateAdminCertification };