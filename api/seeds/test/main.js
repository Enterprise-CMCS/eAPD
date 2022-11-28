import deleteAll from '../shared/delete-everything';
import seedStates from '../shared/states';
import seedFiles from './files';
import seedRoles from '../shared/roles-and-activities';
import seedAdminRoles from './roles';
import seedTestStates from './states';
import seedAffiliations from './affiliations';
import seedCertifications from './certifications';
import { seed as seedApds } from '../shared/apds';

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
