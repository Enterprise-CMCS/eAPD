export const up = async knex => {
  await knex.schema.table('okta_users', table => {
    table.primary('user_id');
  });
};

export const down = async knex => {
  await knex.schema.table('okta_users', table => {
    table.dropPrimary();
  });
};
