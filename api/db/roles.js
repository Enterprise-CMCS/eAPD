const knex = require('./knex');

const getAllActiveRoles = async (userRole, { db = knex } = {}) => {
  const roles = await db('auth_roles')
    .select('id', 'name')
    .where({ isActive: true });
  
  switch (userRole) {
    case 'eAPD System Admin':
      return roles;
    case 'eAPD Federal Admin':
      return roles.filter(
        role =>
          role.name === 'eAPD Federal Admin' || role.name === 'eAPD State Admin'
      );
    case 'eAPD State Admin':
      return roles.filter(
        role =>
          role.name === 'eAPD State Staff' || role.name === 'eAPD State Contractor'
      );
    default:
      return null;
  }
};

module.exports = {
  getAllActiveRoles
};
