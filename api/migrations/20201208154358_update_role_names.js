export const up = async knex => {
  const stateStaff = await knex('auth_roles')
    .where({ name: 'eAPD State Staff' })
    .first();
  if (!stateStaff) {
    await knex('auth_roles')
      .where({ name: 'eAPD State Coordinator' })
      .update({ name: 'eAPD State Staff', isActive: false });
  }
};

export const down = async knex => {
  const stateContractor = await knex('auth_roles')
    .where({ name: 'eAPD State Coordinator' })
    .first();
  if (!stateContractor) {
    await knex('auth_roles')
      .where({ name: 'eAPD State Staff' })
      .update({ name: 'eAPD State Coordinator', isActive: false });
  }
};
