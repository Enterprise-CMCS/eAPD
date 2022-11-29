import deleteAll from '../shared/delete-everything.js';
import seedRoles from '../shared/roles-and-activities.js';
import seedStates from '../shared/states.js';
import seedState from './state.js';
import seedUsers from './base-users.js';
import { seed as seedApds } from '../shared/apds.js';

const seed = async knex => {
  // Don't seed this data if we're not in a development environment.
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  // Call specific seeds from here.
  await deleteAll(knex);
  await seedRoles(knex);
  await seedStates(knex);
  await seedState(knex);
  await seedUsers(knex);

  // seed APDs in mongo
  await seedApds();
};

export default seed;
