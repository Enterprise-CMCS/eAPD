exports.up = async knex => {
  await knex.schema.alterTable('activities', table => {
    table.text('summary');
    table.text('alternatives');
    table.json('types');
    table.json('standards_and_conditions');
  });

  await knex.schema.alterTable('activity_goals', table => {
    table.text('objective');
  });

  // Move goal objective from the separate table into the new column
  const goalObjectives = await knex('activity_goal_objectives').select();
  await Promise.all(
    goalObjectives.map(
      async ({ activity_goal_id: id, description: objective }) => {
        await knex('activity_goals')
          .where({ id })
          .update({ objective });
      }
    )
  );

  await knex.schema.dropTable('activity_goal_objectives');
};

exports.down = async () => {};
