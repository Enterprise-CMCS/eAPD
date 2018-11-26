exports.up = async knex => {
  await knex.schema.alterTable('activity_contractor_resources', table => {
    table
      .decimal('totalCost', 15, 2)
      .comment(
        'the total cost of the contract over its entire lifetime, which may exceed the life of the associated APD'
      );
  });

  await knex('activity_contractor_resources').update({ totalCost: 0 });
};

exports.down = async () => {};
