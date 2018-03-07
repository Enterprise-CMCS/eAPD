exports.up = async knex => {
  await knex.schema.createTable('apds', apdsTable => {
    apdsTable.increments('id');
    apdsTable.string('status', 64);
    apdsTable.string('period', 64);
    apdsTable.timestamps(true, true); // adds created_at & updated_at columns
    apdsTable.timestamp('approved_at');

    apdsTable.string('state_id', 2);
    apdsTable.foreign('state_id').references('states.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('apds');
};
