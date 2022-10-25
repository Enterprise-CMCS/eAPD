/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => {
  await knex.schema.table('okta_users', table => {
    table.dropColumn('metadata');
    table.dropColumn('secondEmail');
    table.dropColumn('primaryPhone');
    table.dropColumn('mobilePhone');
  });

  await knex.schema.table('state_admin_certifications', table => {
    table.dropColumn('phone');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = () => {};
