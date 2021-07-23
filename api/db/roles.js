const knex = require('./knex');

const getAllActiveRoles = async (requestedRoles, { db = knex } = {}) => {
  const query = await db('auth_roles')
    .select('id', 'name')
    .where({ isActive: true })
  if(requestedRoles) {
    return query.whereIn('name', requestedRoles);
  }
  return query;
};

module.exports = {
  getAllActiveRoles
};
