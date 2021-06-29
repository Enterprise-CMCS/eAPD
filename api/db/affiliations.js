const logger = require('../logger')('db/affiliations');
const knex = require('./knex');

const selectedColumns = [
  'auth_affiliations.id',
  'auth_affiliations.user_id as userId',
  'auth_affiliations.state_id as stateId',
  'auth_affiliations.status as status',
  'auth_affiliations.created_at as createdAt',
  'auth_affiliations.updated_at as updatedAt',
  'auth_affiliations.updated_by as updatedById',
  'auth_roles.name as role',
  'okta_users.displayName as displayName',
  'okta_users.secondEmail as secondEmail',
  'okta_users.primaryPhone as primaryPhone',
  'okta_users.mobilePhone as mobilePhone',
  'okta_users.email as email',

];

const statusConverter = {
  'pending': ['requested'],
  'active': ['approved'],
  'inactive': ['denied', 'revoked']
}

const getAffiliationsByStateId = ({ stateId, status, db = knex, isAdmin = false }) => {
  let query = db('auth_affiliations')
                .select(selectedColumns)
                .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
                .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')

  if (!isAdmin){
      query = query.whereNot('auth_roles.name', 'eAPD System Admin')
  }
  if (status === 'pending') {
    return query.where({
        state_id: stateId,
        status: 'requested'
      });
  }
  if (status === 'active') {
    return query.where({
        state_id: stateId,
        status: 'approved'
      });
  }
  if (status === 'inactive') {
    return query.whereIn(
        ['state_id', 'status'],
        statusConverter[status].map(thisStatus => [stateId, thisStatus])
      );
  }
  if (status) {
    logger.error(`invalid status ${status}`);
    return []
  }
  return query.where({ state_id: stateId });
};

const getPopulatedAffiliationsByStateId = ({
  stateId,
  status,
  isAdmin,
  getAffiliationsByStateId_ = getAffiliationsByStateId
}) => {
  return getAffiliationsByStateId_({ stateId, status, isAdmin });
};

const getAffiliationsByUserId = (userId, {db = knex } = {}) => {
  return db('auth_affiliations')
    .select(selectedColumns)
    .where('auth_affiliations.user_id', userId )
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')


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

const getPopulatedAffiliationById = ({
  stateId,
  affiliationId,
  db = knex
}) => {
  return getAffiliationById({ stateId, affiliationId, db });
};

const reduceAffiliations = affiliations =>{
  // combine affiliations for each user.
  // many fields are omitted for clarity
  // Given:
  // [{userId:1, stateId:'ak'}, {userId:1, stateId:'md'}, {userId:2, stateId:'ak}]
  // becomes
  // [{userId:1, affiliations: [{stateId:'ak'}, {stateId:'md'}]}, {userId:2, affiliations:[{stateId:'ak'}]}]
  const reducer = (results, affiliation) => {
    const stateAffiliation = {role: affiliation.role, stateId: affiliation.stateId, status: affiliation.status}
    // If this user ID is not in the object add it and create an
    // affiliations array with just this affiliation in it.
    if(!Object.prototype.hasOwnProperty.call(results, affiliation.userId)){

      // eslint-disable-next-line no-param-reassign
      results[affiliation.userId] = {
        ...affiliation,
        affiliations: [stateAffiliation,]
      }
      return results
    }
    // add this affiliation to this user's list of affiliations
    results[affiliation.userId].affiliations.push(stateAffiliation)
    return results
  }
  const results = {}
  affiliations.reduce(reducer, results)
  return Object.values(results)
}

const getAllAffiliations = async ({ status, db = knex } = {}) => {
  const query = db('auth_affiliations')
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .leftJoin('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
    .select(selectedColumns);

  if (status){
    if (!Object.keys(statusConverter).includes(status)){
      logger.error(`invalid status ${status}`);
      return []
    }
    return query.whereIn(
      'status',
      statusConverter[status]
    )
  }

    return query
  
};

const getAllPopulatedAffiliations = async ({
    status,
    db = knex,
    getAllAffiliations_ = getAllAffiliations,
    reduceAffiliations_ = reduceAffiliations
  }) => {
  const affiliations = await getAllAffiliations_({ status, db });
  if (!affiliations) return null;
  return reduceAffiliations_(affiliations)
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
  selectedColumns
};
