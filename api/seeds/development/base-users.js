const moment = require('moment')
const logger = require('../../logger')('user seeder');
const { oktaClient } = require('../../auth/oktaAuth');
const { createUsersToAdd } = require('../shared/set-up-users');

exports.seed = async knex => {
  const {oktaAffiliations, stateCertifications} = await createUsersToAdd(knex, oktaClient);
  await knex('auth_affiliations').insert(oktaAffiliations);
  logger.info('Completed adding affiliations');
  await knex('state_admin_certifications').insert(stateCertifications)
  const auditEntries = stateCertifications.map(certification =>{
    return {
      username:certification.uid,
      changeDate:moment().format('YYYY-MM-DD HH:mm:ss'),
      changedBy: 'seeds'
    }
  })

  await knex('state_admin_certifications_audit').insert(auditEntries)

};
