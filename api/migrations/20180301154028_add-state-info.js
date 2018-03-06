exports.up = async (knex) => {
  await knex.schema.alterTable('states', (statesTable) => {
    statesTable.json('medicaid_office');
    statesTable.json('state_pocs');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('states', (statesTable) => {
    statesTable.dropColumn('medicaid_office');
    statesTable.dropColumn('state_pocs');
  });
};
