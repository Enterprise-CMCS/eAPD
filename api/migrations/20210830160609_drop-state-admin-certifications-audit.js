exports.up = async knex => {
  await knex.schema.dropTable('state_admin_certifications_audit');
};

exports.down = async knex => {
  await knex.schema.createTable('state_admin_certifications_audit', table => {
    table.comment(
      'changes to the state certifications list'
    );
    table.increments('id');
    table.string('username').comment('id of user that was changed');
    table.datetime('changeDate').comment("The date the change was made");
    table.string('changedBy').comment('The user that made the change');
    table.enu('changeType', ['add', 'remove']).comment('type of change to certification; either add or remove');    
  });  
};
