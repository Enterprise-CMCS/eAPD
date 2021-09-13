/* eslint-disable camelcase */
const knex = require('./knex');

const addStateAdminCertification = (
  data,
  { db = knex } = {}
) => {    
  
  // const authAffiliationAudit = {
  //   changeDate: newDate(),
  //   changedBy: ???,
  //   changeType: "CREATED??"
  //   certificationId: ??? // need to get from the record created below
  // }
    
  return db('state_admin_certifications')
    .insert({
      ...data
    })
    // .then(() =>{
    //   return db('state_admin_certifications_audit')
    //     .insert(authAffiliationAudit)
    // })
};
    
module.exports = { addStateAdminCertification };