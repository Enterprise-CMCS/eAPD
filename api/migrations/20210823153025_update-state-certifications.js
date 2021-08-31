exports.up = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.dropColumn('certifiedBy'); // replaced by the ones below
    table.dropColumn('username'); // replaced by uploadedBy
    
    table.string('fileUrl').notNullable().comment('address of the file previously uploaded');
    table.string('email').notNullable().comment('email of the user being certified');
    table.string('name').notNullable().comment('name of the user being certified');
    table.string('phone').notNullable().comment('phone number of the user being certified');
    table.string('certifiedByName').notNullable().comment('name of person who completed the designation letter');
    table.string('certifiedByTitle').notNullable().comment('title of person who completed the designation letter');
    table.string('certifiedByEmail').notNullable().comment('email of person who completed the designation letter');
    table.string('certifiedBySignature').notNullable().comment('printed name of person who signed the designation letter');
    table.string('uploadedBy').notNullable().comment('user_id of the person who submitted the certification form');
    
    table.unique(['state', 'email']);
  });
  
  await knex.schema.alterTable('state_admin_certifications', table => {
    table.string('state').notNullable().alter();
    table.string('certificationDate').notNullable().alter();
    table.string('certificationExpiration').notNullable().alter();
  });
};

exports.down = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.string('certifiedBy').comment('name of person who completed the designation letter');
    table.string('username').comment('id of person from auth service');
    
    table.dropColumn('fileUrl');
    table.dropColumn('email');
    table.dropColumn('name');
    table.dropColumn('phone');
    table.dropColumn('certifiedByName');
    table.dropColumn('certifiedByTitle');
    table.dropColumn('certifiedByEmail');
    table.dropColumn('certifiedBySignature');
    table.dropColumn('uploadedBy');
  });
};
