/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async knex =>
  knex.schema.createTable('apd_review_status', table => {
    table.comment('Changes to APD status in the Federal Review');
    table.increments('id').unique();
    table
      .string('apd_id')
      .notNullable()
      .comment('id of the apd with an update from sharepoint');
    table.string('status').notNullable().comment('the new status of the apd');
    table.string('comment').comment('comments about the status change');
    table
      .timestamp('updated_at')
      .notNullable()
      .comment('the date the status was updated');
  });

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async knex => knex.schema.dropTable('apd_review_status');
