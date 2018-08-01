exports.up = async knex => {
  await knex.schema.alterTable('activity_state_peronnel', table => {
    table.boolean('key_personnel');
  });

  await knex.schema.dropTable('apd_key_personnel_years');
  await knex.schema.dropTable('apd_key_personnel');
};

exports.down = async () => {};
