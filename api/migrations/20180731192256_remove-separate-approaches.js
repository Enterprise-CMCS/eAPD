exports.up = async knex => knex.schema.dropTable('activity_approaches');

exports.down = async () => {};
