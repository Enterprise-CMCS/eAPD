exports.up = knex => {
  return knex.schema.table('auth_affiliations', table => {
    table.date('expires_at').comment('expiration date');
  })
};

exports.down = knex => {
  return knex.schema.table('auth_affiliations', table => {
    table.dropColumn('expires_at');
  })
};