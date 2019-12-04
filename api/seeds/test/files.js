exports.seed = async knex => {
  // 40xx IDs refer to apds
  // 41xx IDs refer to activities
  // 42xx IDs refer to goals
  // 43xx IDs refer to objectives

  await knex('apd_files').insert([
    {
      apd_id: 4000,
      id: 'bf520e38-9b63-4e8b-82c1-da8fb58f5668',
      metadata: '{"some":"metadata","in":"here"}'
    }
  ]);
};
