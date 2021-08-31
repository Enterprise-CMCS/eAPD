const tap = require('tap');
const knex = require('./knex')


tap.test('state_admin_certification_match generation tests', async sacMatchGenerationTest => {


  sacMatchGenerationTest.test('match creation test', async test =>{
    const result = await knex('state_admin_certifications').insert(
      [
        {
          email: 'Wheatgreaser@email.com',
          name: 'Wheatgreaser Flynn',
          state: 'ak',
          fileUrl: '/auth/certifications/files/Wheatgreaser.pdf',
        },
        {
          email: 'Horsepicker@email.com',
          name: 'Horsepicker Mitchell',
          state: 'ak',
          fileUrl: '/auth/certifications/files/Horsepicker.pdf',
        },
      ]
    )
    test.equal(result.rowCount, 2)

  })

  sacMatchGenerationTest.teardown(() =>{
    knex.destroy()
    return null
  })
})



