exports.up = async knex => {
  await knex('auth_roles')
    .where({ name: 'admin' })
    .update({ name: 'eAPD Admin' });

  await knex('auth_roles')
    .where({ name: 'federal analyst' })
    .update({ name: 'eAPD Federal Analyst' });

  await knex('auth_roles')
    .where({ name: 'federal leadership' })
    .update({ name: 'eAPD Federal Leadership' });

  await knex('auth_roles')
    .where({ name: 'federal' })
    .update({ name: 'eAPD Federal' });

  await knex('auth_roles')
    .where({ name: 'state coordinator' })
    .update({ name: 'eAPD State Coordinator' });

  await knex('auth_roles')
    .where({ name: 'state' })
    .update({ name: 'eAPD State' });
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
};
