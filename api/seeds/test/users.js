const bcrypt = require('bcryptjs');

// Deletes ALL existing entries
exports.seed = async knex => {
  await knex('users').insert([
    {
      id: 57,
      email: 'em@il.com',
      password: bcrypt.hashSync('password'),
      auth_role: 'admin'
    },
    {
      id: 58,
      email: 'user2@email',
      password: bcrypt.hashSync('something'),
      state_id: 'mn'
    }
  ]);
};
