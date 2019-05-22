const hash = require('../../auth/passwordHash');

exports.seed = async knex => {
  await knex('users').insert([
    {
      email: 'em@il.com',
      password: hash.hashSync('password'),
      auth_role: 'state coordinator',
      state_id: 'mo'
    },
    {
      email: 'admin',
      password: hash.hashSync('password'),
      auth_role: 'admin'
    }
  ]);
};
