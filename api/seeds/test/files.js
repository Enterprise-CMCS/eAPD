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

  await knex('activity_files').insert([
    {
      file_id: 5000,
      activity_id: 4100
    },
    {
      file_id: 5004,
      activity_id: 4100
    },
    {
      file_id: 5001,
      activity_id: 4110
    }
  ]);

  await knex('activity_contractor_files').insert([
    {
      file_id: 5002,
      activity_contractor_resource_id: 4300
    },
    {
      file_id: 5003,
      activity_contractor_resource_id: 4301
    }
  ]);
};
