import { oktaClient } from '../auth/oktaAuth';
import loggerFactory from '../logger';

const logger = loggerFactory('user seeder');

export const up = async knex => {
  await knex.schema.table('users', table => {
    table
      .string('username')
      .comment('username of user from authentication service');
  });

  await knex.schema.table('auth_affiliations', table => {
    table
      .string('username')
      .comment('username of user from authentication service');
  });

  const toUpdate = await knex('auth_affiliations').whereNull('username');

  for (let i = 0; i < toUpdate.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    const userID = toUpdate[i].user_id;
    logger.info(`Updating ${userID} with username from okta`);
    // eslint-disable-next-line no-await-in-loop
    const oktaUser = await oktaClient.getUser(userID);
    // eslint-disable-next-line no-await-in-loop
    await knex('auth_affiliations')
      .where({ user_id: userID })
      .update({ username: oktaUser.profile.login });
  }
};

export const down = async knex => {
  // remove uid from users
  await knex.schema.table('users', table => {
    table.dropColumn('username');
  });
  // remove uid from users
  await knex.schema.table('auth_affiliations', table => {
    table.dropColumn('username');
  });
};
