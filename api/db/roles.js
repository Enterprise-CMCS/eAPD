import knex from './knex';

export const getAllActiveRoles = (requestedRoles, { db = knex } = {}) => {
  const query = db('auth_roles').select('id', 'name').where({ isActive: true });
  if (requestedRoles) {
    return query.whereIn('name', requestedRoles);
  }
  return query;
};

export const getAllActivities = ({ db = knex } = {}) => {
  return db('auth_activities').select();
};
