exports.seed = async knex => {
  // 40xx IDs refer to apds
  // 41xx IDs refer to activities
  // 42xx IDs refer to goals
  // 43xx IDs refer to objectives

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
      activity_id: 4100
    },
    {
      id: 4201,
      description: 'Win a Nobel prize for physics',
      activity_id: 4100
    },
    {
      id: 4202,
      description: 'Go on Ellen',
      activity_id: 4100
    }
  ]);

  await knex('activity_goal_objectives').insert([
    {
      id: 4300,
      description: 'Paint a pretty picture',
      activity_goal_id: 4200
    },
    {
      id: 4301,
      description: 'Paint a confusing picture',
      activity_goal_id: 4200
    },
    {
      id: 4302,
      description: 'Paint an offensive picture',
      activity_goal_id: 4200
    },
    {
      id: 4303,
      description: '...Profit',
      activity_goal_id: 4200
    },
    {
      id: 4304,
      description: 'Discover a new particle',
      activity_goal_id: 4201
    },
    {
      id: 4305,
      description: 'Lie about the Moonmen',
      activity_goal_id: 4201
    },
    {
      id: 4306,
      description: 'Learn to dance',
      activity_goal_id: 4202
    },
    {
      id: 4307,
      description: 'Bring audience gifts',
      activity_goal_id: 4202
    }
  ]);
};
