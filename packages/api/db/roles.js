const knex = require('./knex');

const getAllActiveRoles = (requestedRoles, { db = knex } = {}) => {
  const query = db('auth_roles').select('id', 'name').where({ isActive: true });
  if (requestedRoles) {
    return query.whereIn('name', requestedRoles);
  }
  return query;
};

const getAllActivities = ({ db = knex } = {}) => {
  return db('auth_activities').select();
};

module.exports = {
  getAllActiveRoles,
  getAllActivities
};
