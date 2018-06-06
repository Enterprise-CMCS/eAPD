exports.up = async knex => {
  await knex.schema.createTable('apd_versions', table => {
    table.increments();
    table.integer('apd_id');
    table.integer('user_id');
    table.timestamp('created').defaultsTo(knex.fn.now());
    table.json('content');

    table.foreign('apd_id').references('apds.id');
    table.foreign('user_id').references('users.id');
  });
};

exports.down = async () => {};
