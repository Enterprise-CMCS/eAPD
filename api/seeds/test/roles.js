exports.seed = async knex => {
  // 10xx IDs refer to activities
  // 11xx IDs refer to roles

  // For testing, put in our hard-coded stuff so we know what IDs to expect.
  await knex('auth_activities').insert({ id: 1001, name: 'view-users' });
  await knex('auth_activities').insert({ id: 1002, name: 'view-roles' });
  await knex('auth_activities').insert({
    id: 1003,
    name: 'submit-federal-response'
  });
  await knex('auth_activities').insert({ id: 1004, name: 'submit-clearance' });
  await knex('auth_activities').insert({ id: 1005, name: 'edit-comments' });
  await knex('auth_activities').insert({ id: 1006, name: 'submit-document' });
  await knex('auth_activities').insert({
    id: 1007,
    name: 'submit-state-response'
  });
  await knex('auth_activities').insert({ id: 1008, name: 'create-draft' });
  await knex('auth_activities').insert({ id: 1009, name: 'edit-document' });
  await knex('auth_activities').insert({ id: 1010, name: 'edit-response' });
  await knex('auth_activities').insert({ id: 1011, name: 'view-document' });

  await knex('auth_roles').insert({
    id: 1101,
    name: 'eAPD Admin',
    isActive: true
  });
  await knex('auth_roles').insert({
    id: 1102,
    name: 'eAPD Federal Analyst',
    isActive: false
  });
  await knex('auth_roles').insert({
    id: 1103,
    name: 'eAPD Federal Leadership',
    isActive: false
  });
  await knex('auth_roles').insert({
    id: 1104,
    name: 'eAPD Federal SME',
    isActive: false
  });
  await knex('auth_roles').insert({
    id: 1105,
    name: 'eAPD State Coordinator',
    isActive: true
  });
  await knex('auth_roles').insert({
    id: 1106,
    name: 'eAPD State SME',
    isActive: false
  });

  // admin
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1001
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1002
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1003
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1004
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1005
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1006
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1007
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1008
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1009
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1010
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1011
  });
};
