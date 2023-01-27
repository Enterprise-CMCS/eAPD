export const up = async knex =>
  knex.schema.alterTable('users', table => {
    table
      .json('failed_logons')
      .comment('information about consecutive failed logons');
    table
      .bigInteger('locked_until')
      .unsigned()
      .comment('the timestamp of when this account will be unlocked');
  });

export const down = () => {};
