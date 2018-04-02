const bcrypt = require('bcryptjs');

exports.seed = async knex => {
  await knex('users').insert([
    {
      id: 2000,
      email: 'em@il.com',
      password: bcrypt.hashSync('password'),
      auth_role: 'admin'
    },
    {
      id: 2001,
      email: 'user2@email',
      password: bcrypt.hashSync('something'),
      state_id: 'mn'
    },
    {
      id: 2010,
      email: 'no-permissions',
      password: bcrypt.hashSync('password')
    }
  ]);
};
