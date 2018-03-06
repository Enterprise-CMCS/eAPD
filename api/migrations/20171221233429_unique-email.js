exports.up = (knex) =>
  knex.schema.alterTable('users', (table) => {
    table.unique('email');
  });

exports.down = (knex) =>
  knex.schema.alterTable('users', (table) => {
    table.dropUnique('email');
  });
