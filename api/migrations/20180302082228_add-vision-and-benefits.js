exports.up = async (knex) => {
  await knex.schema.alterTable('states', (statesTable) => {
    statesTable.text('program_vision');
    statesTable.text('program_benefits');
  });
};

exports.down = async (knex) => {
  await knex.schema.alterTable('states', (statesTable) => {
    statesTable.dropColumn('program_vision');
    statesTable.dropColumn('program_benefits');
  });
};
