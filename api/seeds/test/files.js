exports.seed = async knex => {
  // 40xx IDs refer to apds
  // 41xx IDs refer to activities
  // 42xx IDs refer to goals
  // 43xx IDs refer to objectives

  await knex('files').insert([
    {
      id: 5000,
      key: 'download.txt',
      metadata: '{"some":"metadata","in":"here"}'
    },
    { id: 5001, key: 'download.txt' },
    { id: 5002, key: 'download.txt' },
    { id: 5003, key: 'download.txt' },
    { id: 5004, key: 'not real' }
  ]);
};
