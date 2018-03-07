exports.up = async knex => {
  await knex.schema.createTable('activities', activitiesTable => {
    activitiesTable.increments('id');
    activitiesTable.string('name', 128);
    activitiesTable.text('description');

    activitiesTable.integer('apd_id');
    activitiesTable.foreign('apd_id').references('apds.id');
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('activities');
};
