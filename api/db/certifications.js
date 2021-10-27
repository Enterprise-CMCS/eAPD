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
  const subQuery = db('auth_affiliations')
    .select(['auth_affiliations.user_id', 'auth_affiliations.state_id', 'auth_affiliations.id'])
    .leftOuterJoin('auth_roles',  'auth_roles.id', 'auth_affiliations.role_id')
    .where( 'auth_roles.name',  '=',  'eAPD State Staff')
    .orWhere( 'auth_affiliations.status', '=', 'requested')
    .as('affiliations')

  return db('state_admin_certifications')
    .select([
      'state_admin_certifications.id',
      'state_admin_certifications.name',
      'state_admin_certifications.email',
      'state_admin_certifications.phone',
      'state_admin_certifications.state',
      'state_admin_certifications.affiliationId',
      'state_admin_certifications.fileUrl',
      'state_admin_certifications.ffy'
    ])
    .countDistinct('affiliations.id as potentialMatches')
    .leftOuterJoin('okta_users', function oktaCertificationsJoin() {
      this
        .on('okta_users.email', '=', 'state_admin_certifications.email')
        .orOn('okta_users.displayName', '=', 'state_admin_certifications.name')

    })

    .leftOuterJoin(subQuery, function oktaAffiliationJoin() {
      this.on('okta_users.user_id', '=', 'affiliations.user_id')
        .andOn('state_admin_certifications.state', '=', 'affiliations.state_id')
    })

    .groupBy('state_admin_certifications.id')

}
    
module.exports = {
  addStateAdminCertification,
  getStateAdminCertifications,

};
