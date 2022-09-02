exports.up = async knex => {
  await knex.schema.table('auth_roles', table => {
    table.boolean('isActive').notNullable().defaultTo(true);
  });

  await knex('auth_roles')
    .whereIn('name', [
      'federal analyst',
      'federal leadership',
      'federal SME',
      'state SME'
    ])
    .update({ isActive: false });
};

exports.down = () => {};
