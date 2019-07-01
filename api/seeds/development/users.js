const hash = require('../../auth/passwordHash');

exports.seed = async knex => {
  await knex('users').insert([
    {
      email: 'em@il.com',
      name: 'Regular User',
      password: hash.hashSync('password'),
      position: 'sticky',
      auth_role: 'state coordinator',
      state_id: 'mo'
    },
    {
      email: 'admin',
      name: 'Admin McAdminersen',
      password: hash.hashSync('password'),
      position: 'eAPD Administrator',
      auth_role: 'admin'
    }
  ]);
};
