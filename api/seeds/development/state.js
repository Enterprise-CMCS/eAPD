const seed = async knex => {
  await knex
    .table('states')
    .where({ id: 'ak' })
    .update({
      medicaid_office: JSON.stringify({
        address1: '100 Round Sq',
        city: 'Cityville',
        zip: '12345',
        state: 'Alaska',
        director: {
          name: 'Cornelius Fudge',
          email: 'c.fudge@ministry.magic',
          phone: '5551234567'
        }
      })
    });

  await knex
    .table('states')
    .where({ id: 'md' })
    .update({
      medicaid_office: JSON.stringify({
        address1: '1 Infinite loop',
        city: 'Cupertino',
        zip: '21276',
        state: 'Maryland',
        director: {
          name: 'Bertha Jorkins',
          email: 'b.jorkins@ministry.magic',
          phone: '5558675309'
        }
      })
    });
};

export default seed;
