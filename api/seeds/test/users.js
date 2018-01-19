const bcrypt = require('bcryptjs');

// Deletes ALL existing entries
exports.seed = knex =>
  knex('users').insert([
    {
      id: 57,
      email: 'em@il.com',
      password: bcrypt.hashSync('password'),
      auth_role: 'admin'
    }
  ]);
