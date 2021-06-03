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

const statusConverter = {
  'pending': ['requested'],
  'active': ['approved'],
  'inactive': ['denied', 'revoked']
}

const getAffiliationsByStateId = ({ stateId, status, db = knex }) => {
  const query = db('auth_affiliations')
                .select(selectedColumns)
                .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')

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

const populateAffiliation = async (affiliation, { client = oktaClient } = {}) => {
  const { userId, updatedById } = affiliation;
  if (userId) {
    const {
      profile: { displayName, email, secondEmail, primaryPhone, mobilePhone }
    } = await client.getUser(userId);
    const { profile: { displayName: updatedByName = null } = {} } = updatedById
      ? await client.getUser(updatedById).catch(() => {
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

const getPopulatedAffiliationsByStateId = async ({
  stateId,
  status,
  getAffiliationsByStateId_ = getAffiliationsByStateId,
  populateAffiliation_ = populateAffiliation
}) => {
  const affiliations = await getAffiliationsByStateId_({ stateId, status });
  if (!affiliations) return [];
  return Promise.all(
    affiliations.map(async affiliation => {
      return populateAffiliation_(affiliation);
    })
  );
};

const getAffiliationById = ({ stateId, affiliationId, db = knex }) => {
  return db('auth_affiliations')
    .select(selectedColumns)
    .leftJoin('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
    .where({
      'auth_affiliations.state_id': stateId,
      'auth_affiliations.id': affiliationId
    })
    .first();
};

const getPopulatedAffiliationById = async ({
  stateId,
  affiliationId,
  db = knex,
  client = oktaClient
}) => {
  const affiliation = await getAffiliationById({ stateId, affiliationId, db });
  if (!affiliation) return null;
  return populateAffiliation(affiliation, { client });
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
    populateAffiliation_ = populateAffiliation,
    reduceAffiliations_ = reduceAffiliations,
    client = oktaClient
  }) => {
  const affiliations = await getAllAffiliations_({ status, db });
  if (!affiliations) return null;
  const reducedAffiliations = reduceAffiliations_(affiliations)
  return Promise.all(
    reducedAffiliations.map(async affiliation => {
      return populateAffiliation_(affiliation, {client});
    })
  );
};


module.exports = {
  getAffiliationsByStateId,
  getPopulatedAffiliationsByStateId,
  getAffiliationById,
  getPopulatedAffiliationById,
  getAllAffiliations,
  populateAffiliation,
  reduceAffiliations,
  getAllPopulatedAffiliations,
  selectedColumns
};
