exports.up = async knex => {
  await knex.schema.table('auth_roles', table => {
    table
      .boolean('isActive')
      .notNullable()
      .defaultTo(true);
  });

  await knex('auth_roles')
    .whereIn('name', [
      'eAPD Federal Analyst',
      'eAPD Federal Leadership',
      'eAPD Federal SME',
      'eAPD Federal',
      'eAPD State SME',
      'eAPD State'
    ])
    .update({ isActive: false });
};

exports.down = () => {};
