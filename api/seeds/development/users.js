const bcrypt = require('bcryptjs');

exports.seed = async knex => {
  await knex('users').insert([
    {
      email: 'em@il.com',
      password: bcrypt.hashSync('password'),
      auth_role: 'admin',
      state_id: 'mo'
    }
  ]);
};
