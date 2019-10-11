const { fork } = require('child_process');

if (process.argv[2] === 'fork') {
  // Bookshelf creates another instance of knex. That instance of knex creates
  // an open connection that lasts until the process closes. As a result, if
  // this Bookshelf query is run in the same process as the mgiration, the
  // migration will never finish and subsequent migrations will block. To
  // handle that, we'll have this migration fork itself; in the fork process,
  // that's where we'll use the Bookshelf query. Then we'll send the data
  // back to the parent process and have the fork kill itself.

  /* eslint-disable global-require */
  require('../db').setup();
  const apdModel = require('../db').models.apd;

  const fetch = async () => {
    const apds = await apdModel.fetchAll({
      withRelated: apdModel.withRelated
    });
    return apds;
  };

  fetch().then(apds => {
    process.send(apds.toJSON());
    process.exit(0);
  });
}

exports.up = async knex => {
  // Check if there are any APDs in the database first. If we're migrating
  // from scratch, the apds table will still be locked from the initial
  // migration and we won't be able to read APDs with bookshelf. Fortunately,
  // there also won't be any APDs, so this is a way we can avoid that problem.
  const count = await knex('apds').count();

  let apds;

  if (count[0].count > 0) {
    // If there are APDs, fetch before updating the table because knex will
    // lock the table and we won't be able to fetch with bookshelf afterwards.
    apds = await new Promise(resolve => {
      const child = fork(__filename, ['fork']);
      child.on('message', msg => {
        resolve(msg);
      });
    });
  }

  await knex.schema.alterTable('apds', table => {
    table.json('document').comment('APD as a single document object');
  });

  if (apds) {
    // If there are APDs, add their JSON values into the new column
    await Promise.all(
      apds.map(apd =>
        knex('apds')
          .where({ id: apd.id })
          .update('document', JSON.stringify(apd))
      )
    );
  }
};

exports.down = async () => {};
