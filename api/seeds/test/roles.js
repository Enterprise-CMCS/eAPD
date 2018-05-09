exports.seed = async knex => {
  // 10xx IDs refer to activities
  // 11xx IDs refer to roles

  // For testing, put in our hard-coded stuff so we know what IDs to expect.
  await knex('auth_activities').insert({ id: 1001, name: 'view-users' });
  await knex('auth_activities').insert({ id: 1002, name: 'add-users' });
  await knex('auth_activities').insert({ id: 1003, name: 'view-roles' });
  await knex('auth_activities').insert({ id: 1004, name: 'create-roles' });
  await knex('auth_activities').insert({ id: 1005, name: 'edit-roles' });
  await knex('auth_activities').insert({
    id: 1006,
    name: 'submit-federal-response'
  });
  await knex('auth_activities').insert({ id: 1007, name: 'submit-clearance' });
  await knex('auth_activities').insert({ id: 1008, name: 'edit-comments' });
  await knex('auth_activities').insert({ id: 1009, name: 'submit-document' });
  await knex('auth_activities').insert({
    id: 1010,
    name: 'submit-state-response'
  });
  await knex('auth_activities').insert({ id: 1011, name: 'create-draft' });
  await knex('auth_activities').insert({ id: 1012, name: 'edit-document' });
  await knex('auth_activities').insert({ id: 1013, name: 'edit-response' });
  await knex('auth_activities').insert({ id: 1014, name: 'delete-users' });
  await knex('auth_activities').insert({ id: 1015, name: 'view-document' });

  await knex('auth_roles').insert({ id: 1101, name: 'admin' });
  await knex('auth_roles').insert({ id: 1102, name: 'federal analyst' });
  await knex('auth_roles').insert({ id: 1103, name: 'federal leadership' });
  await knex('auth_roles').insert({ id: 1104, name: 'federal SME' });
  await knex('auth_roles').insert({ id: 1105, name: 'state coordinator' });
  await knex('auth_roles').insert({ id: 1106, name: 'state SME' });

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
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1012
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1013
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1014
  });
  await knex('auth_role_activity_mapping').insert({
    role_id: 1101,
    activity_id: 1015
  });

  await knex('auth_role_activity_mapping').insert({
    role_id: 1102,
    activity_id: 1005
  });
};
