exports.up = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.dropColumn('certifiedBy'); // replaced by the ones below
    table.dropColumn('username'); // replaced by uploadedBy
    
    table.string('fileUrl').comment('address of the file previously uploaded');
    table.string('email').comment('email of the user being certified');
    table.string('name').comment('name of the user being certified');
    table.string('phone').comment('phone number of the user being certified');
    table.string('certifiedByName').comment('name of person who completed the designation letter');
    table.string('certifiedByTitle').comment('title of person who completed the designation letter');
    table.string('certifiedByEmail').comment('email of person who completed the designation letter');
    table.string('certifiedBySignature').comment('printed name of person who signed the designation letter');
    table.string('uploadedBy').comment('user_id of the person who submitted the certification form');
    
    table.unique(['state', 'email']);
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
