const knex = require('./knex');

const getAllActiveRoles = async (userRole, { db = knex } = {}) => {
  const roles = await db('auth_roles')
    .select('id', 'name')
    .where({ isActive: true });
  if (userRole === 'eAPD Federal Admin') {
    return roles.filter(role => role.name !== 'eAPD Federal Admin');
  }
  return roles.filter(
    role =>
      role.name !== 'eAPD Federal Admin' && role.name !== 'eAPD State Admin'
  );
};

module.exports = {
  getAllActiveRoles
};
