exports.up = async knex => {
  await knex.schema.createTable('apd_key_personnel', table => {
    table.increments('id');
    table.text('title');
    table.text('description');

    table.integer('apd_id');
    table.foreign('apd_id').references('apds.id');
  });

  await knex.schema.createTable('apd_key_personnel_years', table => {
    table.increments('id');
    table.decimal('cost', 15, 2);
    table.decimal('fte', 3, 2);
    table.integer('year');

    table.integer('apd_key_personnel_id');
    table.foreign('apd_key_personnel_id').references('apd_key_personnel.id');
  });
};

exports.down = async () => {};
