exports.seed = async knex => {
  // 40xx IDs refer to apds
  // 41xx IDs refer to activities
  // 42xx IDs refer to goals
  // 43xx IDs refer to objectives

  await knex('apd_files').insert([
    {
      apd_id: 4000,
      id: '74aa0d06-ae6f-472f-8999-6ca0487c494f',
      metadata: '{"some":"metadata","in":"here"}'
    }
  ]);
};
