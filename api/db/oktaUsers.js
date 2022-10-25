/* eslint-disable camelcase */
const logger = require('../logger')('db/oktaUsers');
const knex = require('./knex');
const { oktaClient } = require('../auth/oktaAuth');

const getOktaUser = (user_id, { db = knex } = {}) => {
  return db('okta_users').where({ user_id }).first();
};

const getUserFromOkta = async username =>
  (await oktaClient.getUser(username)) || {};

const createOktaUser = (user_id, oktaUser, { db = knex } = {}) =>
  db('okta_users').insert({
    user_id,
    ...oktaUser
  });

const updateOktaUser = (user_id, oktaUser, { db = knex } = {}) =>
  db('okta_users').where({ user_id }).update(oktaUser);

const createOrUpdateOktaUser = (user_id, oktaUser, { db = knex } = {}) =>
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

const sanitizeProfile = profile => {
  const desiredFields = ['displayName', 'email', 'login'];
  const cleanProfile = {};
  desiredFields.forEach(field => {
    cleanProfile[field] = profile[field];
  });
  return cleanProfile;
};

const createOrUpdateOktaUserFromOkta = async (
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

module.exports = {
  createOktaUser,
  createOrUpdateOktaUser,
  getOktaUser,
  getUserFromOkta,
  updateOktaUser,
  createOrUpdateOktaUserFromOkta,
  sanitizeProfile
};
