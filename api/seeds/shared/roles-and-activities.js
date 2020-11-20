const chalk = require('chalk');
const logger = require('../../logger')('roles seeder');

// AFAICT, the boolean values here are not used for anything, yet.
const activities = {
  'view-users': false,
  'view-roles': false,
  'submit-federal-response': false,
  'submit-clearance': false,
  'edit-comments': false,
  'submit-document': false,
  'submit-state-response': false,
  'create-draft': false,
  'edit-document': false,
  'edit-response': false,
  'view-document': true,
  'view-affiliations': true,
  'edit-affiliations': true,
  'approve-state-admin': true
};

const roles = {
  'eAPD Admin': false,
  'eAPD Federal Analyst': false,
  'eAPD Federal Leadership': false,
  'eAPD Federal SME': false,
  'eAPD State Coordinator': false,
  'eAPD State SME': false,
  'eAPD State Admin': true
};

const roleToActivityMappings = {
  'eAPD Admin': [
    'view-users',
    'view-roles',
    'approve-state-admin',
    'view-affiliations',
    'edit-affiliations'
  ],
  'eAPD Federal Analyst': [
    'view-users',
    'view-roles',
    'view-document',
    'submit-federal-response',
    'submit-clearance',
    'edit-comments'
  ],
  'eAPD Federal Leadership': ['view-users', 'view-document'],
  'eAPD Federal SME': ['edit-comments'],
  'eAPD State Coordinator': [
    'view-document',
    'submit-document',
    'submit-state-response',
    'create-draft',
    'edit-document',
    'edit-response'
  ],
  'eAPD State SME': ['view-document', 'edit-document', 'edit-response'],
  'eAPD State Admin': [
    'view-document',
    'submit-document',
    'submit-state-response',
    'create-draft',
    'edit-document',
    'edit-response',
    'view-affiliations',
    'edit-affiliations'
  ]
};

// Take the knex object and the table name as arguments, instead of just
// the knex table object.  The reason is that if you have an insert on
// the knex table object and then try to do an insert, under the hood it
// attempts the insert again, which is bad of course, but it also causes
// a key constraint error.
const insertAndGetIDs = async (
  knex,
  tableName,
  values,
  deleteFirst = false
) => {
  // Get a list of existing names
  let alreadyExisting = [];
  if (deleteFirst) {
    // drop current rows
    await knex(tableName).del();
    logger.info(
      `deleted all of the rows from the ${chalk.cyan(tableName)} table`
    );
  } else {
    alreadyExisting = (await knex(tableName).select('name')).map(e => {
      logger.info(
        `${chalk.cyan(e.name)} already in the ${chalk.cyan(tableName)}`
      );
      return e.name;
    });
  }

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

  // drop current mappings
  await table.del();
  logger.info(
    `deleted all of the rows from the ${chalk.cyan(tableName)} table`
  );

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

exports.seed = async knex => {
  logger.info('Beginning to seed the roles, activities, and mapping tables');
  const roleIDs = await insertAndGetIDs(knex, 'auth_roles', roles, false);
  const activityIDs = await insertAndGetIDs(
    knex,
    'auth_activities',
    activities,
    true
  );
  await setupMappings(
    knex,
    'auth_role_activity_mapping',
    roleIDs,
    activityIDs,
    roleToActivityMappings
  );
  await knex('auth_roles')
    .whereIn('name', [
      'eAPD Federal Analyst',
      'eAPD Federal Leadership',
      'eAPD Federal SME',
      'eAPD State SME'
    ])
    .update({ isActive: false });
  logger.info('Updated active status for roles');
};
