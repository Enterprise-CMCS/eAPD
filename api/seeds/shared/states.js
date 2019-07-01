const { states } = require('../../util/states');

exports.seed = async knex => {
  await knex('states').insert(states);
};
