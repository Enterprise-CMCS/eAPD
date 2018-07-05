exports.up = async knex =>
  knex.schema.createTable('apd_points_of_contact', table => {
    table.increments();
    table.integer('apd_id');
    table.text('name');
    table.text('position');
    table.text('email');

    table.foreign('apd_id').references('apds.id');
  });

exports.down = async () => {};
