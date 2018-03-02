const truncate = require('./shared/delete-everything');
const states = require('./shared/states');
const roles = require('./test/roles');
const users = require('./test/users');

exports.seed = async knex => {
  // Don't seed this data if we're not in a test environment.
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  // Call specific seeds from here.
  await truncate.seed(knex);
  await roles.seed(knex);
  await states.seed(knex);
  await users.seed(knex);
};
