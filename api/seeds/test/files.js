import { akAPDId } from './apds.js';

const seed = async knex => {
  await knex('apd_files').insert([
    {
      apd_id: akAPDId,
      id: '74aa0d06-ae6f-472f-8999-6ca0487c494f',
      metadata: '{"some":"metadata","in":"here"}'
    }
  ]);
};

export default seed;
