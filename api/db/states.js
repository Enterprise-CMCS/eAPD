const knex = require('./knex');

const getStateProfile = async (stateID, { db = knex } = {}) => {
  const profile = await db('states')
    .select('medicaid_office')
    .where('id', stateID)
    .first();

  return profile.medicaid_office;
};

const updateStateProfile = async (
  stateID,
  profile,
  { db = knex, transaction = null } = {}
) => {
  await (transaction || db)('states')
    .where('id', stateID)
    .update({ medicaid_office: profile });
};

module.exports = { getStateProfile, updateStateProfile };
