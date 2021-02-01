const logger = require('../../logger')('user seeder');
const { oktaClient } = require('../../auth/oktaAuth');
const { createUsersToAdd } = require('../shared/set-up-users');

exports.seed = async knex => {
  const oktaAffiliations = await createUsersToAdd(knex, oktaClient);
  await knex('auth_affiliations').insert(oktaAffiliations);
  logger.info('Completed adding affiliations');
};
