exports.seed = async knex => {
  await knex('auth_affiliations').insert([
    {
      id: 4000,
      user_id: 2010,
      state_id: 'fl',
      status: 'requested'
    }
  ]);
};
