const { states } = require('../../util/states');

const vermontOffice = {
  address: 'Department of Vermont Health Access',
  city: 'Waterbury',
  zip: '05671-1010'
};

const vermontPocs = [
  {
    name: 'Jane Doe',
    position: 'Director',
    email: 'jane.doe@vermont.gov'
  },
  {
    name: 'Richard Roe',
    position: 'CIO',
    email: 'richard.roe@vermont.gov'
  }
];

exports.seed = async knex => {
  await knex('states').insert(states);

  await knex
    .table('states')
    .where({ id: 'vt' })
    .update({
      medicaid_office: JSON.stringify(vermontOffice),
      state_pocs: JSON.stringify(vermontPocs)
    });
};
