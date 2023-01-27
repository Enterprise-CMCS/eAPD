export const up = async knex =>
  knex.schema.createTable('apd_events', table => {
    table.comment('events performed on the APD');
    table
      .string('event_id', 64)
      .unique()
      .comment('randomly-generated event ID')
      .notNullable();
    table
      .string('user_id', 64)
      .comment('the Okta ID of the user')
      .notNullable();
    table.integer('apd_id').comment('the ID of the APD').notNullable();
    table.string('event_type', 128).comment('the type of event').notNullable();
    table
      .timestamp('event_at')
      .comment('when the event happened')
      .defaultTo(knex.fn.now());
    table.json('metadata').comment('additional information about the event');

    table.foreign('apd_id').references('apds.id');
    table.primary(['event_id']);
  });

export const down = async () => {};
