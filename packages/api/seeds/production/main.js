const roles = require('../shared/roles-and-activities');
const states = require('../shared/states');

exports.seed = async knex => {
  // Don't seed this data if we're not in a production environment.
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  // Call specific seeds from here.
  await roles.seed(knex);
  await states.seed(knex);
};
