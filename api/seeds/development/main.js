import deleteAll from '../shared/delete-everything';
import seedRoles from '../shared/roles-and-activities';
import seedStates from '../shared/states';
import seedState from './state';
import seedUsers from './base-users';
import { seed as seedApds } from '../shared/apds';

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
