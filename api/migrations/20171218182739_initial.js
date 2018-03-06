exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments();
    table.text('email'); // who knows how long an email address might be
    table.string('password', 60); // bcrypt hashes are 60 characters
  });

exports.down = (knex) => knex.schema.dropTable('users', () => {});
