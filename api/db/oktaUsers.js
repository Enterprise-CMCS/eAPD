/* eslint-disable camelcase */
const logger = require('../logger')('db/oktaUsers');
const knex = require('./knex');

const getOktaUser = (user_id, { db = knex } = {}) => {
  return db('okta_users').where({ user_id }).first();
}

const createOktaUser = (user_id, email, metadata, { db = knex } = {}) => (
  db('okta_users')
  .insert({
    user_id,
    email,
    metadata
  })
)

const updateOktaUser = (user_id, email, metadata, { db = knex } = {}) => (
  db('okta_users')
  .where({ user_id })
  .update({ email, metadata })
)

const createOrUpdateOktaUser = (user_id, email, metadata) => (
  getOktaUser(user_id).then(user => {
    if (!user) {
      return createOktaUser(user_id, email, metadata)
    }
    return updateOktaUser(user_id, email, metadata)
  })
  .catch(e => logger.error({
     message: `could not create or update user_id: ${user_id}`,
     e
  }))
)

module.exports = {
  createOktaUser,
  createOrUpdateOktaUser,
  getOktaUser,
  updateOktaUser
}
