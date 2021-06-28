
exports.up = async function(knex) {
  await knex.schema.table('okta_users', table => {
    table.integer('current_affiliation').comment('the last affiliation chosen by this user');
    table.foreign('current_affiliation').references('auth_affiliations.id');
  })
};

exports.down = async function(knex) {
  knex.schema.table('okta_users', table => {

    table.dropColumn('current_affiliation')

  })
};
