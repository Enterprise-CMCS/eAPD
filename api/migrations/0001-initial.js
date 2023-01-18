export const up = async knex => {
  await knex.schema.createTable('auth_roles', table => {
    table.comment(
      'authorization roles - users belong to a role, and a role encapuslates a list of activities'
    );
    table.increments('id');
    table.string('name', 64).comment('the name of this authorization role'); // I reckon a 64-character role name is enough...
    table.index('name');
    table.unique('name');
  });

  await knex.schema.createTable('auth_activities', table => {
    table.comment(
      'authorization activities - activities define specific actions that the system understands and are grouped into roles'
    );
    table.increments('id');
    table
      .string('name', 64)
      .comment(
        'the name of this authorization activity; these cannot be added/changed arbitrarily - the code expects specific values; the initial set of values are set in the seed data'
      ); // I reckon the same for activity names
    table.unique('name');
  });

  await knex.schema.createTable('auth_role_activity_mapping', table => {
    table.comment('maps authorization activities into roles');
    table.integer('role_id');
    table.integer('activity_id');

    table.index(['role_id', 'activity_id']);

    table.foreign('role_id').references('auth_roles.id');
    table.foreign('activity_id').references('auth_activities.id');
  });

  await knex.schema.createTable('files', table => {
    table.comment('list of external files known to the system');
    table.increments();
    table
      .text('key')
      .comment(
        'unique identifier shared with the storage system; this value could be a foreign key, depending on the storage mechanism being used'
      );
    table.integer('size').comment('size of the file, in bytes');
    table.json('metadata').comment('any user-provided metadata about the file');
  });

  await knex.schema.createTable('states', table => {
    table.comment(
      'list of states, territories, districts, or other jurisdictions known to the system'
    );
    table
      .string('id', 2)
      .comment('two-letter code for the jurisdiction')
      .primary();
    table.string('name', 64).comment('full name');
    table
      .json('medicaid_office')
      .comment(
        'metadata describing the jurisdictions Medicaid office, such as its director and address'
      );
    table
      .json('state_pocs')
      .comment('metadata describing the jurisdictions points of contact');
  });

  await knex.schema.createTable('users', table => {
    table.comment('list of users');
    table.increments();
    table.text('email'); // who knows how long an email address might be
    table.string('password', 60).comment('hashed password'); // hashed passwords are 60 characters
    table.string('auth_role', 64).comment('the name of the role this user has');
    table.foreign('auth_role').references('auth_roles.name');
    table.text('name').comment('the users name');
    table.text('position');
    table.string('phone', 10);
    table
      .string('state_id', 2)
      .comment(
        'the jurisdiction code representing which jurisdiction (if any) this user is working for'
      );

    table.unique('email');
    table.foreign('state_id').references('states.id');
  });

  await knex.schema.createTable('apds', table => {
    table.comment('list of all APDs');
    table.increments('id');
    table.timestamps(true, true); // adds created_at & updated_at columns
    table
      .json('federal_citations')
      .comment(
        'attestation of adherance to a set of federal regulations and CMS policies; stored as JSON because the citations may change over time and it would be silly to constantly update this table'
      );
    table
      .text('medicaid_director_name')
      .comment(
        'state Medicaid directors name for this APD; this may not match the states info if this APD is in the past and the state Medicaid director has changed'
      );
    table
      .text('medicaid_director_email')
      .comment(
        'state Medicaid directors email for this APD; this may not match the states info if this APD is in the past and the state Medicaid director has changed'
      );
    table
      .text('medicaid_director_phone')
      .comment(
        'state Medicaid directors phone number for this APD; this may not match the states info if this APD is in the past and the state Medicaid director has changed'
      );
    table
      .text('medicaid_office_address1')
      .comment(
        'state Medicaid office address for this APD; this may not match the states info if this APD is in the past and the state Medicaid office has changed'
      );
    table
      .text('medicaid_office_address2')
      .comment(
        'state Medicaid office address for this APD; this may not match the states info if this APD is in the past and the state Medicaid office has changed'
      );
    table
      .text('medicaid_office_city')
      .comment(
        'state Medicaid office city for this APD; this may not match the states info if this APD is in the past and the state Medicaid office has changed'
      );
    table
      .text('medicaid_office_state')
      .comment(
        'state Medicaid office state for this APD; this may not match the states info if this APD is in the past and the state Medicaid office has changed'
      );
    table
      .text('medicaid_office_zip')
      .comment(
        'state Medicaid office ZIP code for this APD; this may not match the states info if this APD is in the past and the state Medicaid office has changed'
      );
    table
      .text('narrative_hie')
      .comment('overview of HIE activities for this APD');
    table
      .text('narrative_hit')
      .comment('overview of HIT activities for this APD');
    table
      .text('narrative_mmis')
      .comment('overview of MMIS activities for this APD');
    table
      .text('previous_activity_summary')
      .comment('a description of the activities approved in a previous APD');
    table
      .text('program_overview')
      .comment('an overview of the state Medicaid program');
    table
      .string('status', 64)
      .comment('APD status (e.g., "draft", "approved", etc.)');
    table
      .json('years')
      .comment(
        'array of years that this APD covers; the years are stored as strings'
      );

    table.string('state_id', 2);
    table.foreign('state_id').references('states.id');
  });

  await knex.schema.createTable('apd_incentive_payments', table => {
    table.increments();
    table.integer('apd_id');
    table.integer('year');
    table.integer('q1_eh_payment');
    table.integer('q2_eh_payment');
    table.integer('q3_eh_payment');
    table.integer('q4_eh_payment');
    table.integer('q1_eh_count');
    table.integer('q2_eh_count');
    table.integer('q3_eh_count');
    table.integer('q4_eh_count');
    table.integer('q1_ep_payment');
    table.integer('q2_ep_payment');
    table.integer('q3_ep_payment');
    table.integer('q4_ep_payment');
    table.integer('q1_ep_count');
    table.integer('q2_ep_count');
    table.integer('q3_ep_count');
    table.integer('q4_ep_count');

    table.foreign('apd_id').references('apds.id');
  });

  await knex.schema.createTable('apd_key_personnel', table => {
    table.comment('key personnel for the associated APD');
    table.increments();
    table.integer('apd_id');
    table.text('email').comment('the persons email address');
    table
      .boolean('is_primary')
      .defaultTo(false)
      .comment(
        'indicates whether this key personnel is the primary point of contact for the APD'
      );
    table.text('name').comment('the persons name');
    table
      .decimal('percent_time', 12, 2)
      .defaultTo(0)
      .comment(
        'the percentage of FTE time this key personnel is dedicated to this APD'
      );
    table.text('position').comment('the persons position with the state');

    table.foreign('apd_id').references('apds.id');
  });

  await knex.schema.createTable('apd_key_personnel_yearly', table => {
    table.comment('yearly costs for the associated key personnel');
    table.increments();
    table
      .integer('apd_key_personnel_id')
      .comment('the APD key personnel this cost is attached to');
    table
      .integer('year')
      .notNullable()
      .comment('the federal fiscal year this cost applies to');
    table
      .integer('cost')
      .defaultTo(0)
      .comment(
        'the total cost of the specified key personnel for the associated federal fiscal year'
      );

    table.foreign('apd_key_personnel_id').references('apd_key_personnel.id');
  });

  await knex.schema.createTable('apd_previous_activity_expenses', table => {
    table.comment(
      'approved and actual expenses for activities approved in previous APDs'
    );
    table.increments();
    table.integer('apd_id');
    table
      .integer('hithie_total_approved')
      .comment(
        'the total funding approved for HIT+HIE in the given fiscal year'
      );
    table
      .integer('hithie_federal_actual')
      .comment(
        'the amount of federal funding actually used for HIT+HIE in the given fiscal year'
      );

    table
      .integer('mmis90_total_approved')
      .comment(
        'the total MMIS funding at 90% federal match approved for the given fiscal year'
      );
    table
      .integer('mmis90_federal_actual')
      .comment(
        'the amount of federal funding actually used for MMIS at the 90% match in the given fiscal year'
      );

    table
      .integer('mmis75_total_approved')
      .comment(
        'the total MMIS funding at 75% federal match approved for the given fiscal year'
      );
    table
      .integer('mmis75_federal_actual')
      .comment(
        'the amount of federal funding actually used for MMIS at the 75% match in the given fiscal year'
      );

    table
      .integer('mmis50_total_approved')
      .comment(
        'the total MMIS funding at 50% federal match approved for the given fiscal year'
      );
    table
      .integer('mmis50_federal_actual')
      .comment(
        'the amount of federal funding actually used for MMIS at the 50% match in the given fiscal year'
      );
    table
      .integer('year')
      .comment('the federal fiscal year this data applies to');

    table.foreign('apd_id').references('apds.id');
  });

  await knex.schema.createTable('apd_versions', table => {
    table.comment(
      'submitted versions of APDs (essentially archival, but not records)'
    );
    table.increments();
    table.integer('apd_id').comment('the id of the original, non-archived APD');
    table
      .json('content')
      .comment(
        'the full content of the original APD at time of submission, along with any extra budget tables appended at submission'
      );
    table
      .timestamp('created')
      .defaultsTo(knex.fn.now())
      .comment('timestamp of when the APD was submitted');
    table.integer('user_id').comment('id of the user that submitted the APD');

    table.foreign('apd_id').references('apds.id');
    table.foreign('user_id').references('users.id');
  });

  await knex.schema.createTable('activities', table => {
    table.comment('activities that are part of an APD');
    table.increments('id');
    table
      .string('name', 128)
      .comment('activity name; must be unique within an APD');
    table
      .text('alternatives')
      .comment(
        'description of alternatives to this activity that were considered'
      );
    table
      .text('cost_allocation_methodology')
      .comment(
        'description of the cost allocation methodology that the state is using for this activity'
      );
    table.text('description').comment('a description of the activity');
    table
      .string('funding_source', 32)
      .comment(
        'the CMS funding source for this activity: "hie", "hit", or "mmis"'
      );
    table
      .text('other_funding_sources_description')
      .comment(
        'a description of any other funding sources applied to this activity'
      );
    table
      .date('planned_end_date')
      .comment('the date this activity is planned to begin');
    table
      .date('planned_start_date')
      .comment('the date this activity is planned to be complete');
    table
      .json('standards_and_conditions')
      .comment(
        'a list of explanations for how the state intends to comply with the Medicaid standards and conditions'
      );
    table.text('summary').comment('a brief summary of the activity');

    table.integer('apd_id');
    table.foreign('apd_id').references('apds.id');
  });

  await knex.schema.createTable('activity_contractor_resources', table => {
    table.comment('a list of contractor resources attached to activities');
    table.increments('id');
    table
      .text('description')
      .comment('a description of the contractor resource');
    table.date('end').comment('when the contract is expected to end');
    table.text('name').comment('the name of the contractor');
    table.date('start').comment('when the contract is expected to begin');
    table
      .integer('totalCost')
      .comment(
        'the total cost of the contract over its entire lifetime, which may exceed the life of the associated APD'
      );
    table
      .boolean('useHourly')
      .defaultTo(false)
      .comment(
        'whether this contractor is expensed on an hourly basis rather than an annual basis'
      );

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable(
    'activity_contractor_resources_hourly',
    table => {
      table.comment('hourly cost information for a contractor');
      table.increments();
      table.integer('contractor_resource_id');
      table
        .decimal('hours', 15, 2)
        .comment(
          'the number of hours the contractor is expected to work in the year'
        );
      table
        .decimal('rate', 15, 2)
        .comment('the hourly rate charged by the contractor for the year');
      table
        .integer('year')
        .comment('the federal fiscal year this rate applies to');

      table
        .foreign('contractor_resource_id')
        .references('activity_contractor_resources.id');
    }
  );

  await knex.schema.createTable(
    'activity_contractor_resources_yearly',
    table => {
      table.comment('annual cost information for a contractor');
      table.increments('id');
      table
        .integer('cost')
        .comment('the total cost of the contractor for the year');
      table
        .integer('year')
        .comment('the federal fiscal year this cost applies to');

      table.integer('contractor_resource_id');
      table
        .foreign('contractor_resource_id')
        .references('activity_contractor_resources.id');
    }
  );

  await knex.schema.createTable('activity_contractor_files', table => {
    table.comment(
      'files associated with a contractor, such as RFP, executed contract, etc.'
    );
    table.integer('file_id').comment('id from files table');
    table
      .integer('activity_contractor_resource_id')
      .comment('id from activity_contractor_resources table');

    table.foreign('file_id').references('files.id');
    table
      .foreign('activity_contractor_resource_id')
      .references('activity_contractor_resources.id');
  });

  await knex.schema.createTable('activity_cost_allocation', table => {
    table.comment('cost allocation for an activity');
    table.increments('id');
    table
      .decimal('federal_percent', 12, 2)
      .comment(
        'percent of the Medicaid share of the activity cost that the federal government will pay, as a 0-1 percentage'
      );
    table
      .integer('other_amount')
      .comment(
        'amount of funding from other sources applied to this activity; this is deducted from the activity total cost to find the Medicaid share'
      );
    table
      .decimal('state_percent', 12, 2)
      .comment(
        'percent of the Medicaid share of the activity cost that the state will pay, as a 0-1 percentage'
      );
    table
      .integer('year', 4)
      .comment('the federal fiscal year this cost allocation applies to');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_goals', table => {
    table.comment('goals and objectives for an activity');
    table.increments('id');
    table.text('description').comment('goal');
    table
      .text('objective')
      .comment('objectives/benchmarks indicating progress towards the goal');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_expenses', table => {
    table.comment('non-personnel expenses for an activity');
    table.increments('id');
    table
      .text('category')
      .comment(
        'the expense category - the list of possible values is not defined'
      );
    table.text('description').comment('a d escription of the cost');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_expense_entries', table => {
    table.comment(
      'the costs for a year for the associated non-personnel expense'
    );
    table.increments('id');
    table.integer('amount').comment('the cost');
    table
      .string('year', 4)
      .comment('the federal fiscal year the cost applies to');

    table.integer('expense_id');
    table.foreign('expense_id').references('activity_expenses.id');
  });

  await knex.schema.createTable('activity_files', table => {
    table.comment('list of files associated with an activity');
    table.integer('file_id').comment('id on files table');
    table.integer('activity_id').comment('id on activities table');

    table.foreign('file_id').references('files.id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_schedule', table => {
    table.comment('activity milestone schedule');
    table.increments('id');
    table.integer('activity_id');
    table
      .date('end_date')
      .comment('the date this milestone is planned to be met');
    table.text('milestone').comment('description of the milestone');
    table.text('status').comment('TODO: maybe not used?');

    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_state_personnel', table => {
    table.comment('state personnel costs for an activity');
    table.increments('id');
    table.text('title').comment('the job title this cost references');
    table.text('description').comment('a description of the cost');

    table.integer('activity_id');
    table.foreign('activity_id').references('activities.id');
  });

  await knex.schema.createTable('activity_state_personnel_yearly', table => {
    table.comment('costs for an associated state personnel, by year');
    table.increments('id');
    table.integer('cost').comment('the cost of one person');
    table.decimal('fte', 3, 2).comment('how many FTEs there will be');
    table
      .integer('year')
      .comment('the federal fiscal year this cost applies to');

    table.integer('personnel_id');
    table.foreign('personnel_id').references('activity_state_personnel.id');
  });

  await knex.schema.createTable('activity_quarterly_ffp', table => {
    table.comment(
      'percent of the federal share of the activity cost, broken down by quarter per federal fiscal year'
    );
    table.increments();
    table.integer('activity_id');
    table.decimal('q1_combined', 12, 2).comment('TODO: not used?');
    table
      .decimal('q1_contractors', 12, 2)
      .comment(
        'percent of federal share of contractor costs to be paid in Q1 of the FFY'
      );
    table
      .decimal('q1_state', 12, 2)
      .comment(
        'percent of federal share of state costs to be paid in Q1 of the FFY'
      );
    table.decimal('q2_combined', 12, 2).comment('TODO: not used?');
    table
      .decimal('q2_contractors', 12, 2)
      .comment(
        'percent of federal share of contractor costs to be paid in Q2 of the FFY'
      );
    table
      .decimal('q2_state', 12, 2)
      .comment(
        'percent of federal share of state costs to be paid in Q2 of the FFY'
      );
    table.decimal('q3_combined', 12, 2).comment('TODO: not used?');
    table
      .decimal('q3_contractors', 12, 2)
      .comment(
        'percent of federal share of contractor costs to be paid in Q3 of the FFY'
      );
    table
      .decimal('q3_state', 12, 2)
      .comment(
        'percent of federal share of state costs to be paid in Q33 of the FFY'
      );
    table.decimal('q4_combined', 12, 2).comment('TODO: not used?');
    table
      .decimal('q4_contractors', 12, 2)
      .comment(
        'percent of federal share of contractor costs to be paid in Q4 of the FFY'
      );
    table
      .decimal('q4_state', 12, 2)
      .comment(
        'percent of federal share of state costs to be paid in Q4 of the FFY'
      );
    table
      .integer('year')
      .comment('the federal fiscal year this quarterly breakdown applies to');

    table.foreign('activity_id').references('activities.id');
  });
};

export const down = async () => {};
