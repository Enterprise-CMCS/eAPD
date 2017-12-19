const bcrypt = require('bcryptjs');

// Deletes ALL existing entries
exports.seed = (knex) => {
  // Don't seed this data if we're not in a test environment.
  if (process.env.NODE_ENV !== 'test') {
    return Promise.resolve();
  }
  return knex('users').del()
    .then(() => knex('users').insert([
      { id: 57, email: 'em@il.com', password: bcrypt.hashSync('password') }
    ]));
};
