exports.up = async knex => {
  await knex.schema.table('state_admin_certifications_audit', table => {
    table
      .enu('changeType', ['add', 'remove'])
      .comment('type of change to certification; either add or remove');
  });
};

exports.down = async knex => {
  await knex.schema.table('state_admin_certifications_audit', table => {
    table.dropColumn('changeType');
  });
};
