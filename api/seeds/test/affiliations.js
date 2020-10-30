exports.seed = async knex => {
  await knex('auth_affiliations').insert([
    {
      id: 4000,
      user_id: 2010,
      state_id: 'fl',
      status: 'requested'
    },
    {
      id: 4001,
      user_id: 2020,
      state_id: 'md',
      role_id: '1107',
      status: 'approved'
    }
  ]);
};
