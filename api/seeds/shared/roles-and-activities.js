import chalk from 'chalk'; // eslint-disable-line import/no-unresolved
import loggerFactory from '../../logger';
import {
  activities,
  roles,
  roleToActivityMappings,
  activeRoles
} from '../../util/roles';

const logger = loggerFactory('roles seeder');

// Take the knex object and the table name as arguments, instead of just
// the knex table object.  The reason is that if you have an insert on
// the knex table object and then try to do an insert, under the hood it
// attempts the insert again, which is bad of course, but it also causes
// a key constraint error.
const insertAndGetIDs = async (knex, tableName, values) => {
  // Get a list of existing names
  const alreadyExisting = (await knex(tableName).select('name')).map(e => {
    logger.verbose(
      `${chalk.cyan(e.name)} already in the ${chalk.cyan(tableName)}`
    );
    return e.name;
  });

  // Map the list of names into objects to be inserted,
  // but filter out names that already exist.
  const insert = Object.keys(values)
    .filter(name => !alreadyExisting.includes(name))
    .map(name => {
      logger.verbose(
        `adding ${chalk.cyan(name)} into the ${chalk.cyan(tableName)} table`
      );
      return { name };
    });

  if (insert && insert.length) {
    await knex(tableName).insert(insert);
    logger.verbose(`Completed seeding the ${chalk.cyan(tableName)} table`);
  } else {
    logger.verbose(`Nothing to seed for the ${chalk.cyan(tableName)} table`);
  }

  const asInserted = await knex(tableName).select('*');

  const idMapping = {};
  asInserted.forEach(as => {
    idMapping[as.name] = as.id;
  });
  return idMapping;
};

const setupMappings = async (
  knex,
  tableName,
  roleIDs,
  activityIDs,
  mappings
) => {
  const table = knex(tableName);

  // create mappings
  const inserts = [];
  Object.keys(mappings).forEach(role => {
    const roleID = roleIDs[role];
    mappings[role].forEach(activity => {
      const activityID = activityIDs[activity];
      inserts.push({ role_id: roleID, activity_id: activityID });
      logger.verbose(
        `adding ${chalk.cyan(role)} <--> ${chalk.cyan(
          activity
        )} mapping into the ${chalk.cyan(tableName)} table`
      );
    });
  });

  // insert mappings
  await table.insert(inserts);
  logger.verbose(`Completed seeding ${chalk.cyan(tableName)} table`);
};

const seed = async knex => {
  logger.verbose('Beginning to seed the roles, activities, and mapping tables');

  // drop current mappings for mapping table, must be done before auth_activities because of foreign key constraints
  await knex('auth_role_activity_mapping').del();
  logger.verbose(
    `deleted all of the rows from the ${chalk.cyan(
      'auth_role_activity_mapping'
    )} table`
  );

  // drop current mappings for auth_activities
  await knex('auth_activities').del();
  logger.verbose(
    `deleted all of the rows from the ${chalk.cyan('auth_activities')} table`
  );

  const roleIDs = await insertAndGetIDs(knex, 'auth_roles', roles);
  const activityIDs = await insertAndGetIDs(
    knex,
    'auth_activities',
    activities
  );
  await setupMappings(
    knex,
    'auth_role_activity_mapping',
    roleIDs,
    activityIDs,
    roleToActivityMappings
  );
  await knex('auth_roles').update({ isActive: false });
  await knex('auth_roles')
    .whereIn('name', activeRoles)
    .update({ isActive: true });
  logger.verbose('Updated active status for roles');
};

export default seed;
