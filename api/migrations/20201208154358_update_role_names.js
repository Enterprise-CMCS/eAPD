exports.up = async knex => {
  await knex('auth_roles')
    .where({ name: 'eAPD State Coordinator' })
    .update({ name: 'eAPD State Staff', isActive: false });
};

exports.down = async knex => {
  await knex('auth_roles')
    .where({ name: 'eAPD State Staff' })
    .update({ name: 'eAPD State Coordinator', isActive: false });
};
