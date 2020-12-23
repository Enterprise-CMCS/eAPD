const logger = require('../logger')('db/affiliations');
const { oktaClient } = require('../auth/oktaAuth');
const knex = require('./knex');

const selectedColumns = [
  'auth_affiliations.id',
  'auth_affiliations.user_id as userId',
  'auth_affiliations.state_id as stateId',
  'auth_affiliations.status',
  'auth_affiliations.created_at as createdAt',
  'auth_affiliations.updated_at as updatedAt',
  'auth_affiliations.updated_by as updatedById',
  'auth_roles.name as role'
];

const getAffiliationsByStateId = ({ stateId, status }) => {
  if (status === 'pending') {
    return knex('auth_affiliations')
      .select(selectedColumns)
      .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .where({
        state_id: stateId,
        status: 'requested'
      });
  }
  if (status === 'active') {
    return knex('auth_affiliations')
      .select(selectedColumns)
      .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .where({
        state_id: stateId,
        status: 'approved'
      });
  }
  if (status === 'inactive') {
    return knex('auth_affiliations')
      .select(selectedColumns)
      .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .whereIn(
        ['state_id', 'status'],
        [
          [stateId, 'denied'],
          [stateId, 'revoked']
        ]
      );
  }
  if (status) logger.error(`invalid status ${status}`);
  return knex('auth_affiliations')
    .select(selectedColumns)
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .where({ state_id: stateId });
};

const populateAffiliation = async affiliation => {
  const { userId, updatedById } = affiliation;
  if (userId) {
    const {
      profile: { displayName, email, secondEmail, primaryPhone, mobilePhone }
    } = await oktaClient.getUser(userId);
    const { profile: { displayName: updatedByName = null } = {} } = updatedById
      ? await oktaClient.getUser(updatedById).catch(() => {
          return { profile: { displayName: updatedById } };
        })
      : {};
    return {
      ...affiliation,
      updatedBy: updatedByName,
      displayName,
      email,
      secondEmail,
      primaryPhone,
      mobilePhone
    };
  }
  return null;
};

const getPopulatedAffiliationsByStateId = async ({ stateId, status }) => {
  const affiliations = await getAffiliationsByStateId({ stateId, status });
  if (!affiliations) return [];
  return Promise.all(
    affiliations.map(async affiliation => {
      return populateAffiliation(affiliation);
    })
  );
};

const getAffiliationById = ({ stateId, affiliationId }) => {
  return knex('auth_affiliations')
    .select(selectedColumns)
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .where({
      'auth_affiliations.state_id': stateId,
      'auth_affiliations.id': affiliationId
    })
    .first();
};

const getPopulatedAffiliationById = async ({ stateId, affiliationId }) => {
  const affiliation = await getAffiliationById({ stateId, affiliationId });
  if (!affiliation) return null;
  return populateAffiliation(affiliation);
};

module.exports = {
  getAffiliationsByStateId,
  getPopulatedAffiliationsByStateId,
  getAffiliationById,
  getPopulatedAffiliationById
};
