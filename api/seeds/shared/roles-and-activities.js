const chalk = require('chalk');
const logger = require('../../logger')('roles seeder');

// AFAICT, the boolean values here are not used for anything, yet.
const activities = {
  'view-users': false,
  'view-roles': false,
  'submit-federal-response': false,
  'submit-clearance': false,
  'edit-comments': false,
  'export-document': false,
  'submit-document': false,
  'submit-state-response': false,
  'create-draft': false,
  'edit-document': false,
  'edit-response': false,
  'view-document': true,
  'view-affiliations': true,
  'edit-affiliations': true,
  'view-state-admins': true,
  'edit-state-admins': true
};

const roles = {
  'eAPD Admin': false,
  'eAPD Federal Admin': true,
  'eAPD Federal Leadership': false,
  'eAPD Federal Analyst': false,
  'eAPD Federal SME': false,
  'eAPD State Admin': true,
  'eAPD State Staff': true,
  'eAPD State Contractor': true,
  'eAPD State SME': false
};

const roleToActivityMappings = {
  'eAPD Federal Admin': [
    'view-roles',
    'view-state-admins',
    'edit-state-admins',
    'view-affiliations',
    'edit-affiliations'
  ],
  'eAPD State Admin': [
    'view-roles',
    'view-affiliations',
    'edit-affiliations',
    'create-draft',
    'view-document',
    'edit-document',
    'export-document'
  ],
  'eAPD State Staff': [
    'create-draft',
    'view-document',
    'edit-document',
    'export-document'
  ],
  'eAPD State Contactor': [
    'create-draft',
    'view-document',
    'edit-document',
    'export-document'
  ]
};

// Take the knex object and the table name as arguments, instead of just
// the knex table object.  The reason is that if you have an insert on
// the knex table object and then try to do an insert, under the hood it
// attempts the insert again, which is bad of course, but it also causes
// a key constraint error.
const insertAndGetIDs = async (knex, tableName, values) => {
  // Get a list of existing names
  const alreadyExisting = (await knex(tableName).select('name')).map(e => {
    logger.info(
      `${chalk.cyan(e.name)} already in the ${chalk.cyan(tableName)}`
    );
    return e.name;
  });

  // Map the list of names into objects to be inserted,
  // but filter out names that already exist.
  const insert = Object.keys(values)
    .filter(name => !alreadyExisting.includes(name))
    .map(name => {
      logger.info(
        `adding ${chalk.cyan(name)} into the ${chalk.cyan(tableName)} table`
      );
      return { name };
    });

  await knex(tableName).insert(insert);
  logger.info(`Completed seeding the ${chalk.cyan(tableName)} table`);
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
      logger.info(
        `adding ${chalk.cyan(role)} <--> ${chalk.cyan(
          activity
        )} mapping into the ${chalk.cyan(tableName)} table`
      );
    });
  });

  // insert mappings
  await table.insert(inserts);
  logger.info(`Completed seeding ${chalk.cyan(tableName)} table`);
};

const ACTIVE_ROLES = [
  'eAPD Federal Admin',
  'eAPD State Admin',
  'eAPD State Staff',
  'eAPD State Contractor'
];
exports.ACTIVE_ROLES = ACTIVE_ROLES;

exports.seed = async knex => {
  logger.info('Beginning to seed the roles, activities, and mapping tables');

  // drop current mappings for mapping table, must be done before auth_activities because of foreign key constraints
  await knex('auth_role_activity_mapping').del();
  logger.info(
    `deleted all of the rows from the ${chalk.cyan(
      'auth_role_activity_mapping'
    )} table`
  );

  // drop current mappings for auth_activities
  await knex('auth_activities').del();
  logger.info(
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
    .whereIn('name', ACTIVE_ROLES)
    .update({ isActive: true });
  logger.info('Updated active status for roles');
};
