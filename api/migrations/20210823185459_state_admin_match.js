
exports.up = async function(knex) {
  await knex.schema.createTable('state_admin_certification_match', table => {
    table.comment(
      'The state certifications matches'
    );
    table.increments('id');
    table.timestamps();
    table.string('user_id').comment('id of user from authentication service');
    table
      .integer('state_admin_certification_id')
      .comment('the id of the underlying state certification')
      .notNullable();
    table.foreign('state_admin_certification_id')
      .references('state_admin_certifications.id')
    table.string('updated_by').comment('the user who made the last update')
    table.enu('status', ['pending', 'matched', 'denied'])
      .comment('The status of the current match; pending, matched, revoked')
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('state_admin_certification_match')
};
