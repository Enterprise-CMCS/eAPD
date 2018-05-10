const bcrypt = require('bcryptjs');

exports.seed = async knex => {
  await knex('users').insert([
    {
      id: 2000,
      email: 'all-permissions-and-state',
      password: bcrypt.hashSync('password'),
      auth_role: 'admin',
      state_id: 'mn'
    },
    {
      id: 2001,
      email: 'all-permissions-no-state',
      password: bcrypt.hashSync('password'),
      auth_role: 'admin'
    },
    {
      id: 2010,
      email: 'no-permissions',
      password: bcrypt.hashSync('password')
    }
  ]);
};
