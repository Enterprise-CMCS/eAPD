import knex from './knex';

export const getStateProfile = async (stateID, { db = knex } = {}) => {
  const profile = await db('states')
    .select('medicaid_office')
    .where('id', stateID)
    .first();

  return profile.medicaid_office;
};

export const updateStateProfile = async (
  stateID,
  profile,
  { db = knex } = {}
) => {
  await db('states').where('id', stateID).update({ medicaid_office: profile });
};

export const getStateById = (id, { db = knex } = {}) => {
  return db('states').select('*').where({ id }).first();
};

export const getStateAdmins = (id, { db = knex } = {}) =>
  db('auth_affiliations')
    .join('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .join('states', 'auth_affiliations.state_id', 'states.id')
    .join('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
    .select('okta_users.user_id', 'okta_users.email')
    .where('auth_roles.name', 'eAPD State Admin')
    .andWhere('states.id', id);
