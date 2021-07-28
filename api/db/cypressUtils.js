const knex = require('knex');
const config = require('../knexfile');

const { getUserFromOkta: getUserFromOkta_ } = require('./oktaUsers');

const defaultKnex = knex(config.development);

const cypressKnex = connection =>
  knex({
    client: 'postgresql',
    connection
  });

const removeAffiliationsForUser = async ({
  username,
  db = defaultKnex,
  getUserFromOkta = getUserFromOkta_
}) => {
  const { id } = await getUserFromOkta(username);
  return db('auth_affiliations').where('user_id', id).delete();
};

module.exports = {
  removeAffiliationsForUser,
  databaseConnector: cypressKnex
};
