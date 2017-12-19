const bcrypt = require('bcryptjs');

// Deletes ALL existing entries
exports.seed = (knex) => {
  if (process.env.NODE_ENV !== 'test') {
    return Promise.resolve();
  }
  return knex('users').del()
    .then(() => knex('users').insert([
      { id: 57, email: 'em@il.com', password: bcrypt.hashSync('password') }
    ]));
};
