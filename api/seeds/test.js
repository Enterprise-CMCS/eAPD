const users = require('./test/users');

exports.seed = (knex) => {
  // Don't seed this data if we're not in a test environment.
  if (process.env.NODE_ENV !== 'test') {
    return Promise.resolve();
  }

  // Chain together specific seeds from here.
  return users.seed(knex);
};
