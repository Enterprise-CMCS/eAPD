exports.seed = async knex => {
  // 40xx IDs refer to apds
  // 41xx IDs refer to activities
  // 42xx IDs refer to goals
  // 43xx IDs refer to contractors

  await knex('apds').insert([
    {
      id: 4000,
      state_id: 'mn',
      status: 'draft'
    },
    {
      id: 4001,
      state_id: 'az',
      status: 'draft'
    },
    {
      id: 4002,
      state_id: 'mn',
      status: 'not draft'
    }
  ]);

  await knex('activities').insert([
    {
      id: 4100,
      name: 'Find Success',
      description: 'Some text goes here',
      apd_id: 4000
    },
    {
      id: 4101,
      name: 'My Second Activity',
      description: 'More gunk',
      apd_id: 4000
    },
    {
      id: 4110,
      name: 'Inaccessible Activity',
      apd_id: 4001
    }
  ]);

  await knex('activity_goals').insert([
    {
      id: 4200,
      description: 'Be a super successful artist',
      objective: 'Paint a pretty picture',
      activity_id: 4100
    },
    {
      id: 4201,
      description: 'Win a Nobel prize for physics',
      objective: 'Discover a new particle',
      activity_id: 4100
    },
    {
      id: 4202,
      description: 'Go on Ellen',
      objective: 'Learn to dance',
      activity_id: 4100
    }
  ]);

  await knex('activity_contractor_resources').insert([
    {
      id: 4300,
      activity_id: 4100
    },
    {
      id: 4301,
      activity_id: 4110
    }
  ]);
};
