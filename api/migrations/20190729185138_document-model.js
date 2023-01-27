export const up = async knex =>
  // We don't need to worry about transforming old APDs from the relational
  // model into the document model. This migration will only be used when
  // creating new databases for the first time, so there will not be existing
  // APDs. The staging and production databases were migrated by an earlier
  // version of this migration and were transformed then.
  knex.schema.alterTable('apds', table => {
    table.json('document').comment('APD as a single document object');
  });

export const down = async () => {};
