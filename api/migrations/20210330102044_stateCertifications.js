export const up = async knex => {
  await knex.schema.createTable('state_admin_certifications', table => {
    table.comment('The state certifications list');
    table.increments('id');
    table.string('username').comment('id of user from authentication service');
    table.string('state', 2).comment('the state this user is certified for');

    table
      .date('certificationDate')
      .comment('The date the certification was made');
    table
      .date('certificationExpiration')
      .comment('The date the certification expires');
    table
      .string('certifiedBy')
      .comment('The State Medicare Director that certified this user');
  });
  await knex.schema.createTable('state_admin_certifications_audit', table => {
    table.comment('changes to the state certifications list');
    table.increments('id');
    table.string('username').comment('id of user that was changed');
    table.datetime('changeDate').comment('The date the change was made');
    table.string('changedBy').comment('The user that made the change');
  });
};

export const down = async knex => {
  await knex.schema.dropTable('state_admin_certifications');
  await knex.schema.dropTable('state_admin_certifications_audit');
};
