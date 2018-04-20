const activities = {
  'view-users': false,
  'add-users': false,
  'edit-users': false,
  'delete-users': false,
  'view-roles': false,
  'create-roles': false,
  'edit-roles': false,
  'delete-roles': false,
  'view-activities': false,
  'view-state': false,
  'edit-state': false
};

const roles = {
  admin: false,
  'cms-reviewer': false,
  'state-submitter': false
};

const roleToActivityMappings = {
  admin: [
    'view-users',
    'add-users',
    'edit-users',
    'delete-users',
    'view-roles',
    'create-roles',
    'edit-roles',
    'delete-roles',
    'view-activities',
    'view-state',
    'edit-state'
  ],
  'cms-reviewer': [],
  'state-submitter': []
};

// Take the knex object and the table name as arguments, instead of just
// the knex table object.  The reason is that if you have an insert on
// the knex table object and then try to do an insert, under the hood it
// attempts the insert again, which is bad of course, but it also causes
// a key constraint error.
const insertAndGetIDs = async (knex, tableName, values) => {
  // Get a list of existing names
  const alreadyExisting = (await knex(tableName).select('name')).map(
    e => e.name
  );

  // Map the list of names into objects to be inserted,
  // but filter out names that already exist.
  const insert = Object.keys(values)
    .filter(name => !alreadyExisting.includes(name))
    .map(name => ({ name }));

  await knex(tableName).insert(insert);
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

  // Get a list of existing mappings
  const alreadyExisting = await table.select('*');
  const match = (roleID, activityID) => role =>
    role.role_id === roleID && role.activity_id === activityID;

  const inserts = [];
  Object.keys(mappings).forEach(role => {
    const roleID = roleIDs[role];
    mappings[role].forEach(activity => {
      const activityID = activityIDs[activity];
      if (!alreadyExisting.some(match(roleID, activityID))) {
        inserts.push({ role_id: roleID, activity_id: activityID });
      }
    });
  });

  await table.insert(inserts);
};

exports.seed = async knex => {
  const activityIDs = await insertAndGetIDs(
    knex,
    'auth_activities',
    activities
  );
  const roleIDs = await insertAndGetIDs(knex, 'auth_roles', roles);
  await setupMappings(
    knex,
    'auth_role_activity_mapping',
    roleIDs,
    activityIDs,
    roleToActivityMappings
  );
};
