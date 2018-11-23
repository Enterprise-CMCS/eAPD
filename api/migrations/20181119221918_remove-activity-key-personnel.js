exports.up = async knex =>
  knex.schema.alterTable('activity_state_peronnel', table => {
    table.dropColumn('key_personnel');
  });

exports.down = async () => {};
