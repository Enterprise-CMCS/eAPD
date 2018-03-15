exports.seed = async knex => {
  await knex('apds').insert([
    {
      id: 1000,
      state_id: 'mn',
      status: 'draft'
    },
    {
      id: 1001,
      state_id: 'az',
      status: 'draft'
    }
  ]);

  await knex('activities').insert([
    {
      id: 1000,
      name: 'Find Success',
      description: 'Some text goes here',
      apd_id: 1000
    },
    {
      id: 1001,
      name: 'My Second Activity',
      description: 'More gunk',
      apd_id: 1000
    },
    {
      id: 2000,
      name: 'Inaccessible Activity',
      apd_id: 1001
    }
  ]);

  await knex('activity_goals').insert([
    {
      id: 1000,
      description: 'Be a super successful artist',
      activity_id: 1000
    },
    {
      id: 1001,
      description: 'Win a Nobel prize for physics',
      activity_id: 1000
    },
    {
      id: 1002,
      description: 'Go on Ellen',
      activity_id: 1000
    }
  ]);

  await knex('activity_goal_objectives').insert([
    {
      id: 1000,
      description: 'Paint a pretty picture',
      activity_goal_id: 1000
    },
    {
      id: 1001,
      description: 'Paint a confusing picture',
      activity_goal_id: 1000
    },
    {
      id: 1002,
      description: 'Paint an offensive picture',
      activity_goal_id: 1000
    },
    {
      id: 1003,
      description: '...Profit',
      activity_goal_id: 1000
    },
    {
      id: 1004,
      description: 'Discover a new particle',
      activity_goal_id: 1001
    },
    {
      id: 1005,
      description: 'Lie about the Moonmen',
      activity_goal_id: 1001
    },
    {
      id: 1006,
      description: 'Learn to dance',
      activity_goal_id: 1002
    },
    {
      id: 1007,
      description: 'Bring audience gifts',
      activity_goal_id: 1002
    }
  ]);
};
