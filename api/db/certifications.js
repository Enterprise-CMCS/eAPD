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

const getStateAdminCertifications = (
  {db = knex} = {}
) =>{
  return db('state_admin_certifications')
    .select([
      'state_admin_certifications.id',
      'state_admin_certifications.name',
      'state_admin_certifications.email',
      'state_admin_certifications.phone',
      'state_admin_certifications.state',
      'state_admin_certifications.affiliationId'
    ])
    .countDistinct('auth_affiliations.id as potentialMatches')
    .leftOuterJoin('okta_users', function() {
      this
        .on('okta_users.email', '=', 'state_admin_certifications.email')
        .orOn('okta_users.displayName', '=', 'state_admin_certifications.name')

    })
    .leftOuterJoin('auth_affiliations', function(){
      this.on('auth_affiliations.user_id', '=', 'okta_users.user_id')
        .andOn('auth_affiliations.state_id', '=', 'state_admin_certifications.state')
    })

    .groupBy('state_admin_certifications.id')
    // .where('auth_affiliations.state_id', 'state_admin_certifications.state')

}
    
module.exports = {
  addStateAdminCertification,
  getStateAdminCertifications,

};
