const hash = require('../../auth/passwordHash');

exports.seed = async knex => {
  await knex('users').insert([
    {
      id: 2000,
      email: 'all-permissions-and-state',
      name: 'Wonder Woman',
      password: hash.hashSync('password'),
      position: 'User that can do anything at all',
      auth_role: 'admin',
      state_id: 'mn'
    },
    {
      id: 2001,
      email: 'all-permissions-no-state',
      name: 'Superman',
      password: hash.hashSync('password'),
      position: 'User without a home',
      auth_role: 'admin'
    },
    {
      id: 2010,
      email: 'no-permissions',
      name: 'Lucy Ricardo',
      password: hash.hashSync('password'),
      position: 'User never allowed to do anything'
    }
  ]);
};
