exports.up = async knex => {
  await knex.schema.alterTable('apd_previous_activity_expenses', table => {
    table
      .decimal('hithie_total_approved', 12, 2)
      .comment(
        'the total funding approved for HIT+HIE in the given fiscal year'
      );
    table
      .decimal('hithie_federal_actual', 12, 2)
      .comment(
        'the amount of federal funding actually used for HIT+HIE in the given fiscal year'
      );

    table
      .decimal('mmis90_total_approved', 12, 2)
      .comment(
        'the total MMIS funding at 90% federal match approved for the given fiscal year'
      );
    table
      .decimal('mmis90_federal_actual', 12, 2)
      .comment(
        'the amount of federal funding actually used for MMIS at the 90% match in the given fiscal year'
      );

    table
      .decimal('mmis75_total_approved', 12, 2)
      .comment(
        'the total MMIS funding at 75% federal match approved for the given fiscal year'
      );
    table
      .decimal('mmis75_federal_actual', 12, 2)
      .comment(
        'the amount of federal funding actually used for MMIS at the 75% match in the given fiscal year'
      );

    table
      .decimal('mmis50_total_approved', 12, 2)
      .comment(
        'the total MMIS funding at 50% federal match approved for the given fiscal year'
      );
    table
      .decimal('mmis50_federal_actual', 12, 2)
      .comment(
        'the amount of federal funding actually used for MMIS at the 50% match in the given fiscal year'
      );
  });

  const rows = await knex('apd_previous_activity_expenses').select();
  await Promise.all(
    rows.map(async row =>
      knex('apd_previous_activity_expenses')
        .update({
          hithie_total_approved:
            +row.hie_federal_approved +
            +row.hie_state_approved +
            +row.hit_federal_approved +
            +row.hit_state_approved,
          hithie_federal_actual:
            +row.hie_federal_actual + +row.hit_federal_actual,

          mmis90_total_approved:
            +row.mmis_federal90_approved + +row.mmis_state10_approved,
          mmis90_federal_actual: +row.mmis_federal90_actual,

          mmis75_total_approved:
            +row.mmis_federal75_approved + +row.mmis_state25_approved,
          mmis75_federal_actual: +row.mmis_federal75_actual,

          mmis50_total_approved:
            +row.mmis_federal50_approved + +row.mmis_state50_approved,
          mmis50_federal_actual: +row.mmis_federal50_actual
        })
        .where('id', row.id)
    )
  );

  await knex.schema.alterTable('apd_previous_activity_expenses', table => {
    table.dropColumns(
      'hie_federal_approved',
      'hie_federal_actual',
      'hie_state_approved',
      'hie_state_actual',
      'hit_federal_approved',
      'hit_federal_actual',
      'hit_state_approved',
      'hit_state_actual',
      'mmis_federal90_approved',
      'mmis_federal90_actual',
      'mmis_federal75_approved',
      'mmis_federal75_actual',
      'mmis_federal50_approved',
      'mmis_federal50_actual',
      'mmis_state10_approved',
      'mmis_state10_actual',
      'mmis_state25_approved',
      'mmis_state25_actual',
      'mmis_state50_approved',
      'mmis_state50_actual'
    );
  });
};

exports.down = async () => {};
