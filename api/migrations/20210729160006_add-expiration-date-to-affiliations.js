/* eslint-disable camelcase */
exports.up = async knex => {
  await knex.schema.table('auth_affiliations', table => {
    table
      .date('expires_at')
      .comment('expiration date');
  });

  const rolesQuery = await knex('auth_roles').where({isActive: true});

  const today = new Date();

  const roles = Object.fromEntries(
    rolesQuery.map(item => [item.name, item.id])
  )

  knex('auth_affiliations')
    .then(affiliations =>
      Promise.all(
        affiliations.map(({ id, role_id, created_at }) => {
          if(role_id === roles['eAPD State Contractor'] 
          || role_id === roles['eAPD State Staff']) {
            return knex('auth_affiliations')
              .where('status', 'approved')
              .where('id', id)
              .update({
                expires_at: created_at.setFullYear(created_at.getFullYear + 1)
              })
            }
          if(role_id === roles['eAPD State Admin']) {
            return knex('auth_affiliations')
              .where('status', 'approved')
              .where('id', id)
              .update({
                expires_at: new Date(today.getFullYear() + 1, '06', '30')
              })
          }
          return null;
        })
      )
    )

};

exports.down = knex => {
  return knex.schema.table('auth_affiliations', table => {
    table.dropColumn('expires_at');
  })
};