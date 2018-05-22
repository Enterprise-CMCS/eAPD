exports.up = async knex =>
  knex.schema.alterTable('apds', table => {
    table.text('program_overview');
    table.text('narrative_hie');
    table.text('narrative_hit');
    table.text('narrative_mmis');
  });

exports.down = async () => {};
