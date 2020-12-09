const knex = require('./knex');

const getAllActiveRoles = async ({ db = knex } = {}) => {
  console.log('in getAllActiveRoles');
  return db('auth_roles')
    .select('id', 'name')
    .where({ isActive: true });
};

module.exports = {
  getAllActiveRoles
};
