exports.up = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table
      .enu('status', ['active', 'archived'])
      .comment('provides a soft delete of the certification');
  });

  knex('state_admin_certifications').then(certifications =>
    Promise.all(
      certifications.map(() => {
        return knex('state_admin_certifications')
          .where('status', null)
          .update({ status: 'active' });
      })
    )
  );
};

exports.down = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.dropColumn('status');
  });
};
