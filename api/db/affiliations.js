const logger = require('../logger')('db/affiliations');
const knex = require('./knex');

const selectedColumns = [
  'auth_affiliations.id',
  'auth_affiliations.user_id as userId',
  'auth_affiliations.state_id as stateId',
  'auth_affiliations.status as status',
  'auth_affiliations.created_at as createdAt',
  'auth_affiliations.updated_at as updatedAt',
  'auth_roles.name as role',
  'okta_users.displayName as displayName',
  'okta_users.email as email'
];

const statusConverter = {
  pending: ['requested'],
  active: ['approved'],
  inactive: ['denied', 'revoked'],
  null: ['requested', 'approved', 'denied', 'revoked']
};

const getAffiliationsByStateId = ({
  stateId,
  status = null,
  isFedAdmin = false,
  db = knex
}) => {
  const query = db('auth_affiliations')
    .select(selectedColumns)
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id');

  // No one should see the Sys Admins in the Admin Panel, if isFedAdmin is null, then the user is
  // a State Admin and they shouldn't see Federal Admins
  const skipRoles = isFedAdmin
    ? ['eAPD System Admin']
    : ['eAPD System Admin', 'eAPD Federal Admin'];
  // Get the list of statuses to query
  const affiliationStatuses = statusConverter[status] || null;

  if (affiliationStatuses) {
    return query
      .whereIn('status', affiliationStatuses)
      .andWhere('state_id', stateId)
      .andWhere(builder => {
        // Where the role isn't in the skip roles or is null
        builder
          .whereNotIn('auth_roles.name', skipRoles)
          .orWhereNull('auth_roles.name');
      });
  }

  logger.error(`invalid status ${status}`);
  return [];
};

const getPopulatedAffiliationsByStateId = ({
  stateId,
  status,
  isFedAdmin,
  getAffiliationsByStateId_ = getAffiliationsByStateId
}) => {
  return getAffiliationsByStateId_({ stateId, status, isFedAdmin });
};

const getAffiliationsByUserId = (userId, { db = knex } = {}) => {
  return db('auth_affiliations')
    .select(selectedColumns)
    .where('auth_affiliations.user_id', userId)
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id');
};

const getAffiliationById = ({ stateId, affiliationId, db = knex }) => {
  return db('auth_affiliations')
    .select(selectedColumns)
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
    .where({
      'auth_affiliations.state_id': stateId,
      'auth_affiliations.id': affiliationId
    })
    .first();
};

const getPopulatedAffiliationById = ({ stateId, affiliationId, db = knex }) => {
  return getAffiliationById({ stateId, affiliationId, db });
};

const reduceAffiliations = affiliations => {
  // combine affiliations for each user.
  // many fields are omitted for clarity
  // Given:
  // [{userId:1, stateId:'ak'}, {userId:1, stateId:'md'}, {userId:2, stateId:'ak}]
  // becomes
  // [{userId:1, affiliations: [{stateId:'ak'}, {stateId:'md'}]}, {userId:2, affiliations:[{stateId:'ak'}]}]
  const reducer = (results, affiliation) => {
    const stateAffiliation = {
      role: affiliation.role,
      stateId: affiliation.stateId,
      status: affiliation.status,
      id: affiliation.id
    };
    // If this user ID is not in the object add it and create an
    // affiliations array with just this affiliation in it.
    if (!Object.prototype.hasOwnProperty.call(results, affiliation.userId)) {
      // eslint-disable-next-line no-param-reassign
      results[affiliation.userId] = {
        ...affiliation,
        affiliations: [stateAffiliation]
      };
      return results;
    }
    // add this affiliation to this user's list of affiliations
    results[affiliation.userId].affiliations.push(stateAffiliation);
    return results;
  };
  const results = {};
  affiliations.reduce(reducer, results);
  return Object.values(results);
};

const getAllAffiliations = async ({ status, db = knex } = {}) => {
  const query = db('auth_affiliations')
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
    // eslint-disable-next-line func-names
    .where(function () {
      this.whereNot('auth_roles.name', 'eAPD System Admin').orWhere(
        'auth_roles.name',
        'is',
        null
      );
    })
    .select(selectedColumns);

  if (status) {
    if (!Object.keys(statusConverter).includes(status)) {
      logger.error(`invalid status ${status}`);
      return [];
    }
    return query.whereIn('status', statusConverter[status]);
  }

  return query;
};

const getAllPopulatedAffiliations = async ({
  status,
  db = knex,
  getAllAffiliations_ = getAllAffiliations,
  reduceAffiliations_ = reduceAffiliations
}) => {
  const affiliations = await getAllAffiliations_({ status, db });
  if (!affiliations) return null;
  return reduceAffiliations_(affiliations);
};

const getAffiliationMatches = async ({ stateId, db = knex }) => {
  const query = db('auth_affiliations')
    .select(selectedColumns)
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id');

  return (
    query
      .where('state_id', stateId)
      .andWhere('status', 'requested')
      // eslint-disable-next-line func-names
      .orWhere(function () {
        this.where('state_id', stateId)
          .andWhere('status', 'approved')
          .andWhere('auth_roles.name', 'eAPD State Staff');
      })
  );
};

const updateAuthAffiliation = async ({
  db = knex,
  transaction = null,
  affiliationId,
  newRoleId,
  newStatus,
  changedBy, // userId of the individual updating the affiliation
  changedByStateId, // stateId of the individual updating the affiliation
  stateId,
  ffy
}) => {
  // Check that user is not editing themselves
  const {
    user_id: affiliationUserId,
    role_id: originalRoleId,
    status: originalStatus
  } = await (transaction || db)('auth_affiliations')
    .select('user_id', 'role_id', 'status')
    .where({ state_id: stateId, id: affiliationId })
    .first();

  if (changedBy === affiliationUserId) {
    throw new Error('User is editing their own affiliation');
  }

  // Lookup role id of the user making the affiliation update
  const { role_id: changedByRoleId } = await (transaction || db)(
    'auth_affiliations'
  )
    .select('role_id')
    .where({ state_id: changedByStateId, user_id: changedBy })
    .first();

  // Lookup role name of who is updating the affiliation
  const { name: changedByRoleName } = await (transaction || db)('auth_roles')
    .select('name')
    .where({ id: changedByRoleId })
    .first();

  const validAssignableRoles = {
    'eAPD Federal Admin': ['eAPD State Admin'],
    'eAPD State Admin': ['eAPD State Staff', 'eAPD State Contractor']
  };

  // Lookup role name and set expiration date accordingly
  // The front end will pass in a -1 if the role is revoked/denied
  const { name: roleName } =
    newRoleId < 0
      ? { name: null }
      : await (transaction || db)('auth_roles')
          .select('name')
          .where({ id: newRoleId })
          .first();

  // Check user is assigning a valid role
  if (
    !validAssignableRoles[`${changedByRoleName}`].includes(roleName) &&
    roleName !== null
  ) {
    throw new Error('User is attempting to assign an invalid role');
  }

  let expirationDate = null;
  if (newStatus === 'approved') {
    const today = new Date();
    if (
      roleName === 'eAPD State Staff' ||
      roleName === 'eAPD State Contractor'
    ) {
      expirationDate = new Date(
        today.getFullYear() + 1,
        today.getMonth(),
        today.getDate()
      );
    }
    if (roleName === 'eAPD State Admin') {
      expirationDate = ffy === undefined ? null : new Date(ffy, '09', '01');
    }
  }

  const authAffiliationAudit = {
    user_id: affiliationUserId,
    original_role_id: originalRoleId,
    original_status: originalStatus,
    new_role_id: newStatus !== 'approved' ? null : newRoleId,
    new_status: newStatus || null,
    changed_by: changedBy
  };

  return (transaction || db)('auth_affiliations')
    .where({ state_id: stateId, id: affiliationId })
    .update({
      role_id: newStatus !== 'approved' ? null : newRoleId,
      status: newStatus,
      expires_at: expirationDate
    })
    .then(() => {
      return (transaction || db)('auth_affiliation_audit').insert(
        authAffiliationAudit
      );
    });
};

module.exports = {
  getAffiliationsByStateId,
  getPopulatedAffiliationsByStateId,
  getAffiliationById,
  getPopulatedAffiliationById,
  getAllAffiliations,
  reduceAffiliations,
  getAllPopulatedAffiliations,
  getAffiliationsByUserId,
  getAffiliationMatches,
  updateAuthAffiliation,
  selectedColumns
};
