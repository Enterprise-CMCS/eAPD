/* eslint-disable camelcase */
import loggerFactory from '../logger';
import knex from './knex';
import { oktaClient } from '../auth/oktaAuth';

const logger = loggerFactory('db/oktaUsers');

export const getOktaUser = (user_id, { db = knex } = {}) => {
  return db('okta_users').where({ user_id }).first();
};

export const getUserFromOkta = async username =>
  (await oktaClient.getUser(username)) || {};

export const createOktaUser = (user_id, oktaUser, { db = knex } = {}) =>
  db('okta_users').insert({
    user_id,
    ...oktaUser
  });

export const updateOktaUser = (user_id, oktaUser, { db = knex } = {}) =>
  db('okta_users').where({ user_id }).update(oktaUser);

export const createOrUpdateOktaUser = (user_id, oktaUser, { db = knex } = {}) =>
  getOktaUser(user_id, { db })
    .then(user => {
      if (!user) {
        return createOktaUser(user_id, oktaUser, { db });
      }
      return updateOktaUser(user_id, oktaUser, { db });
    })
    .catch(e =>
      logger.error({
        message: `could not create or update user_id: ${user_id}`,
        e
      })
    );

export const sanitizeProfile = profile => {
  const desiredFields = ['displayName', 'email', 'login'];
  const cleanProfile = {};
  desiredFields.forEach(field => {
    cleanProfile[field] = profile[field];
  });
  return cleanProfile;
};

export const createOrUpdateOktaUserFromOkta = async (
  user_id,
  { okta = oktaClient, db = knex } = {}
) => {
  const response = await okta.getUser(user_id);
  const oktaUser = sanitizeProfile(response.profile);

  oktaUser.user_id = user_id;
  return getOktaUser(oktaUser.user_id, { db })
    .then(user => {
      if (!user) {
        return db('okta_users').insert(oktaUser);
      }
      return db('okta_users').where({ user_id }).update(oktaUser);
    })
    .catch(e =>
      logger.error({
        message: `could not create or update user_id: ${user_id}`,
        e
      })
    );
};
