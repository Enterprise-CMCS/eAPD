exports.up = async knex => {
  await knex('states')
    .insert({ id: 'fd', name: 'Federal', medicaid_office: null });
};

exports.down = async knex => {
  await knex('states')
    .where({ id: 'fd' })
    .del();
};
