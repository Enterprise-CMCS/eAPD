const entries = [{ name: 'Paperclips' }, { name: 'Misc' }];

exports.seed = async knex => {
  await knex('expenses').insert(entries);
};
