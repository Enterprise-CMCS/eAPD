exports.up = async knex => {
  await knex.schema.renameTable('apd_points_of_contact', 'apd_key_personnel');
  await knex.schema.alterTable('apd_key_personnel', table => {
    table
      .decimal('percent_time', 12, 2)
      .defaultTo(0)
      .comment(
        'the percentage of FTE time this key personnel is dedicated to this APD'
      );
    table
      .boolean('is_primary')
      .defaultTo(false)
      .comment(
        'indicates whether this key personnel is the primary point of contact for the APD'
      );
  });
  await knex.schema.createTable('apd_key_personnel_yearly', table => {
    table.increments();
    table
      .integer('apd_key_personnel_id')
      .comment('the APD key personnel this cost is attached to');
    table
      .integer('year')
      .notNullable()
      .comment('the federal fiscal year this cost applies to');
    table
      .decimal('cost')
      .defaultTo(0)
      .comment(
        'the total cost of the specified key personnel for the associated federal fiscal year'
      );

    table.foreign('apd_key_personnel_id').references('apd_key_personnel.id');
  });
};

exports.down = async () => {};
