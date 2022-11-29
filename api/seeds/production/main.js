import seedRoles from '../shared/roles-and-activities.js';
import seedStates from '../shared/states.js';

const seed = async knex => {
  // Don't seed this data if we're not in a production environment.
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  // Call specific seeds from here.
  await seedRoles(knex);
  await seedStates(knex);
};

export default seed;
