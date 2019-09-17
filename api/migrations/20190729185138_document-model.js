require('../db').setup();
const apdModel = require('../db').models.apd;

exports.up = async knex => {
  // Check if there are any APDs in the database first. If we're migrating
  // from scratch, the apds table will still be locked from the initial
  // migration and we won't be able to read APDs with bookshelf. Fortunately,
  // there also won't be any APDs, so this is a way we can avoid that problem.
  const count = await knex('apds').count();

  let apds;

  if (count > 0) {
    // If there are APDs, fetch before updating the table because knex will
    // lock the table and we won't be able to fetch with bookshelf afterwards.
    apds = (await apdModel.fetchAll({
      withRelated: apdModel.withRelated
    })).toJSON();
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
