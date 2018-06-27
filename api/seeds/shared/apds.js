const { states } = require('../../util/states');

const apdEntries = states.map(state => ({
  status: 'draft',
  state_id: state.id
}));

exports.seed = async knex => {
  // await knex('apds').insert(apdEntries);
};
