const users = require('./development/users');

// Deletes ALL existing entries
exports.seed = (knex) => {
  // Don't seed this data if we're not in a development environment.
  if (process.env.NODE_ENV !== 'development') {
    return Promise.resolve();
  }

  // Chain together specific seeds from here.
  return users.seed(knex);
};
