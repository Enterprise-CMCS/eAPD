const db = require('./knex');

const getStateProfile = async stateID => {
  const profile = db('states')
    .select('medicaid_office')
    .where('id', stateID)
    .first();
  return profile.medicaid_office;
};

const updateStateProfile = async (
  stateID,
  profile,
  { transaction = null } = {}
) => {
  await (transaction || db)('states')
    .where('id', stateID)
    .update({ medicaid_office: profile });
};

module.exports = { getStateProfile, updateStateProfile };
