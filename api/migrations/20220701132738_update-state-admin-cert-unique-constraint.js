export const up = async knex => {
  await knex.schema.table('state_admin_certifications', table => {
    table.dropUnique(['state', 'email', 'ffy']);
  });
  await knex.schema.raw(
    `CREATE UNIQUE INDEX "state_email_ffy_unique_if_active" ON "state_admin_certifications"("state","email","ffy") WHERE state_admin_certifications.status = 'active'`
  );
};

export const down = () => {
  // Can't reverse this since postgres will fail if there are already unique certifications
};
