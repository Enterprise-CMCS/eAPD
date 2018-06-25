exports.up = async knex =>
  knex.schema.alterTable('apds', table => {
    table.text('medicaid_director_name');
    table.text('medicaid_director_email');
    table.text('medicaid_director_phone');
    table.text('medicaid_office_address1');
    table.text('medicaid_office_address2');
    table.text('medicaid_office_city');
    table.text('medicaid_office_state');
    table.text('medicaid_office_zip');
  });
exports.down = async () => {};
