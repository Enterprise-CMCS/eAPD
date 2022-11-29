import deleteAll from '../shared/delete-everything.js';
import seedStates from '../shared/states.js';
import seedFiles from './files.js';
import seedRoles from '../shared/roles-and-activities.js';
import seedAdminRoles from './roles.js';
import seedTestStates from './states.js';
import seedAffiliations from './affiliations.js';
import seedCertifications from './certifications.js';
import { seed as seedApds } from '../shared/apds.js';

const seed = async knex => {
  // Don't seed this data if we're not in a test environment.
  if (process.env.NODE_ENV !== 'test') {
    return;
  }

  // Call specific seeds from here.
  await deleteAll(knex);
  await seedStates(knex);
  await seedFiles(knex);
  await seedRoles(knex);
  await seedAdminRoles(knex);
  await seedTestStates(knex);
  await seedAffiliations(knex);
  await seedCertifications(knex);

  // seed APDs in mongo
  await seedApds();
};

export default seed;
