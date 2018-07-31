exports.up = async knex =>
  knex.schema.alterTable('activity_state_peronnel', table => {
    table.boolean('key_personnel');
  });

exports.down = async () => {};
