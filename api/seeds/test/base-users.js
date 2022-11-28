import fs from 'fs';
import loggerFactory from '../../logger';
import { oktaClient } from '../../auth/oktaAuth';
import createUsersToAdd from '../shared/set-up-users';
import issueTokens from '../shared/issueTokens';

const logger = loggerFactory('user seeder');

const seed = async knex => {
  const { oktaAffiliations, stateCertifications, oktaUsers } =
    await createUsersToAdd(knex, oktaClient);
  logger.info(`Affiliations ${JSON.stringify(oktaAffiliations)}`);
  await knex('auth_affiliations').insert(oktaAffiliations);
  logger.info('Completed adding affiliations');
  await knex('okta_users').insert(oktaUsers);
  logger.info('Completed adding okta_users');
  await knex('state_admin_certifications').insert(stateCertifications);

  const testTokens = await issueTokens(oktaUsers);

  // save the tokens to a file
  try {
    fs.writeFileSync(
      `${__dirname}/../test/tokens.json`,
      JSON.stringify(testTokens, null, 4)
    );
  } catch (err) {
    // not much to do here but log it
    logger.error(`Error creating base users: ${err}`);
  }
};

export default seed;
