exports.seed = async knex => {
  await knex
    .table('states')
    .where({ id: 'mn' })
    .update({
      medicaid_office: '{"office":"address"}',
      program_benefits: 'The program will have benefits',
      program_vision: 'The program vision is 20/20',
      state_pocs: '{"pocs":"people"}'
    });
};
