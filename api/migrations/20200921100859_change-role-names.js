exports.up = async knex => {
  await knex.schema.table('users', table => {
    table.dropForeign('auth_role');
  });

  await knex('auth_roles')
    .where({ name: 'admin' })
    .update({ name: 'eAPD Admin', isActive: true });

  await knex('auth_roles')
    .where({ name: 'federal analyst' })
    .update({ name: 'eAPD Federal Analyst', isActive: true });

  await knex('auth_roles')
    .where({ name: 'federal leadership' })
    .update({ name: 'eAPD Federal Leadership', isActive: false });

  await knex('auth_roles')
    .where({ name: 'federal' })
    .update({ name: 'eAPD Federal', isActive: false });

  await knex('auth_roles')
    .where({ name: 'state coordinator' })
    .update({ name: 'eAPD State Coordinator', isActive: false });

  await knex('auth_roles')
    .where({ name: 'state' })
    .update({ name: 'eAPD State', isActive: false });
};

exports.down = async knex => {
  await knex('auth_roles')
    .where({ name: 'eAPD Admin' })
    .update({ name: 'admin' });

  await knex('auth_roles')
    .where({ name: 'eAPD Federal Analyst' })
    .update({ name: 'federal analyst' });

  await knex('auth_roles')
    .where({ name: 'eAPD Federal Leadership' })
    .update({ name: 'federal leadership' });

  await knex('auth_roles')
    .where({ name: 'eAPD Federal' })
    .update({ name: 'federal' });

  await knex('auth_roles')
    .where({ name: 'eAPD State Coordinator' })
    .update({ name: 'state coordinator' });

  await knex('auth_roles')
    .where({ name: 'eAPD State' })
    .update({ name: 'state' });

  await knex.schema.able('users', table => {
    table.foreign('auth_role').references('auth_roles.name');
  });
};
