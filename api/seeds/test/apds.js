const document4000 = require('./4000.json');
const document4001 = require('./4001.json');
const document4002 = require('./4002.json');

exports.seed = async knex => {
  // 40xx IDs refer to apds
  // 41xx IDs refer to activities
  // 42xx IDs refer to goals
  // 43xx IDs refer to contractors

  await knex('apds').insert([
    {
      id: 4000,
      // William Howard Taft becomes the only person to serve as both
      // President and Chief Justice of the Supreme Court
      created_at: '1921-07-11T07:00:00Z',
      document: document4000,
      state_id: 'mn',
      status: 'draft',
      // Teddy Roosevelt returns to New York after travels through Europe
      // and Africa
      updated_at: '1910-06-18T09:00:00Z'
    },
    {
      id: 4001,
      // The 13th Amendment to the US Constitution is officially ratified,
      // formally outlawing slavery
      created_at: '1865-12-6T00:00:00Z',
      document: document4001,
      state_id: 'az',
      status: 'draft',
      // The 19th Amendment to the US Constitution is officially ratified,
      // extending the right to vote to women
      updated_at: '1919-06-04T16:30:00Z'
    },
    {
      id: 4002,
      // Jesse Owens wins his first gold medal of the Berlin Olympics
      created_at: '1936-08-03T00:00:00Z',
      document: document4002,
      state_id: 'mn',
      status: 'not draft',
      // Jackie Robinson joins the Brooklyn Dodgers
      updated_at: '1947-04-10T00:00:00Z'
    }
  ]);
};
