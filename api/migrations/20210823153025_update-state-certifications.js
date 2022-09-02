exports.up = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.dropColumn('certifiedBy'); // replaced by the ones below
    table.dropColumn('username'); // replaced by uploadedBy
    table.dropColumn('certificationDate'); // replaced by uploadedDate
    table.dropColumn('certificationExpiration'); // this expiration date will be managed in auth_affiliations based on the ffy

    table
      .integer('ffy')
      .notNullable()
      .comment('FFY that the letter is valid for');
    table
      .string('name')
      .notNullable()
      .comment('full name of the individual being certified');
    table
      .string('email')
      .notNullable()
      .comment('email of the individual being certified');
    table
      .string('phone')
      .notNullable()
      .comment('phone number of the individual being certified');
    table
      .string('certifiedByName')
      .comment('name of person who completed the designation letter');
    table
      .string('certifiedByTitle')
      .comment('title of person who completed the designation letter');
    table
      .string('certifiedByEmail')
      .comment('email of person who completed the designation letter');
    table
      .string('certifiedBySignature')
      .comment('printed name of person who signed the designation letter');
    table
      .string('fileUrl')
      .notNullable()
      .comment('address of the file previously uploaded');
    table
      .string('uploadedBy')
      .notNullable()
      .comment('user_id of the person who submitted the certification form');
    table
      .date('uploadedOn')
      .notNullable()
      .comment('date certification letter was initiall added');

    table
      .integer('affiliationId')
      .comment('id of the auth_affiliation this certification is tied to');
    table.foreign('affiliationId').references('auth_affiliations.id');

    table.unique(['state', 'email', 'ffy']);
  });

  await knex.schema.alterTable('state_admin_certifications', table => {
    table.string('state').notNullable().alter();
  });

  await knex.schema.table('state_admin_certifications_audit', table => {
    table.dropColumn('username');

    table
      .integer('certificationId')
      .comment('id of the state_admin_certifications record');
    table
      .foreign('certificationId')
      .references('state_admin_certifications.id');
  });
};

exports.down = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table
      .string('certifiedBy')
      .comment('name of person who completed the designation letter');
    table.string('username').comment('id of person from auth service');
    table
      .date('certificationDate')
      .comment('The date the certification was made');
    table
      .date('certificationExpiration')
      .comment('The date the certification expires');

    table.dropColumn('ffy');
    table.dropColumn('email');
    table.dropColumn('name');
    table.dropColumn('phone');
    table.dropColumn('certifiedByName');
    table.dropColumn('certifiedByTitle');
    table.dropColumn('certifiedByEmail');
    table.dropColumn('certifiedBySignature');
    table.dropColumn('fileUrl');
    table.dropColumn('uploadedBy');
    table.dropColumn('uploadedOn');
    table.dropColumn('affiliationId');
  });

  await knex.schema.table('state_admin_certifications_audit', table => {
    table.string('username');
  });
};
