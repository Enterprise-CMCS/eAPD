import { format } from 'date-fns';
import fs from 'fs';
import loggerFactory from '../../logger/index.js';
import { oktaClient } from '../../auth/oktaAuth.js';
import createUsersToAdd from '../shared/set-up-users.js';
import issueTokens from '../shared/issueTokens.js';
import path from 'path';

const logger = loggerFactory('user seeder');
const __dirname = path.resolve();

const seed = async knex => {
  const { oktaAffiliations, stateCertifications, oktaUsers } =
    await createUsersToAdd(knex, oktaClient);
  await knex('auth_affiliations').insert(oktaAffiliations);
  logger.info('Completed adding affiliations');
  await knex('okta_users').insert(oktaUsers);
  logger.info('Completed adding okta_users');
  await knex('state_admin_certifications').insert(stateCertifications);

  const auditEntries = stateCertifications.map(certification => {
    return {
      certificationId: certification.id,
      changeDate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
      changedBy: 'seeds'
    };
  });
  await knex('state_admin_certifications_audit').insert(auditEntries);

  const testTokens = await issueTokens(oktaUsers);

  // save the tokens to a file
  try {
    fs.writeFileSync(
      `${__dirname}/seeds/test/tokens.json`,
      JSON.stringify(testTokens, null, 4)
    );
  } catch (err) {
    // not much to do here but log it
    logger.error(`Errors creating tokens ${err}`);
  }
};

export default seed;
