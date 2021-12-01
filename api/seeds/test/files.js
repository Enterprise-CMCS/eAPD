exports.seed = async knex => {
  await knex('apd_files').insert([
    {
      apd_id: 4001,
      id: 'test-123',
      metadata: '{"some":"metadata","in":"here"}'
    }
  ]);
};
