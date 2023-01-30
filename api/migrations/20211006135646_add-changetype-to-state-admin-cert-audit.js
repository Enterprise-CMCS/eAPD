const formatAlterTableEnumSql = (tableName, columnName, enums) => {
  const constraintName = `"${tableName}_${columnName}_check"`;
  return [
    `ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS ${constraintName};`,
    `ALTER TABLE ${tableName} ADD CONSTRAINT ${constraintName} CHECK ("${columnName}" = ANY (ARRAY['${enums.join(
      "'::text, '"
    )}'::text]));`
  ].join('\n');
};

export const up = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.dropColumn('certifiedByName');
    table.dropColumn('certifiedByTitle');
    table.dropColumn('certifiedByEmail');
    table.dropColumn('certifiedBySignature');
  });

  await knex.raw(
    formatAlterTableEnumSql('state_admin_certifications_audit', 'changeType', [
      'add',
      'remove',
      'match'
    ])
  );
};

export const down = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
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
  });

  await knex.raw(
    formatAlterTableEnumSql('state_admin_certifications_audit', 'changeType', [
      'add',
      'remove'
    ])
  );
};
