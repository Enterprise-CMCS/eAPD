const tap = require('tap')
const knex = require('./knex')

tap.test('database wrappers / oktaUsers', async dbTest => {
  // This test will NOT succeed unless there is a valid DB in scope.
  dbTest.skip('db select alaska from the database', async t =>{
    const dbResponse = await knex('states')
      .select('*')
      .where({ id:'ak' })
      .first();

    t.same(dbResponse.id, 'ak')

  })

  dbTest.teardown(() =>{
    knex.destroy()
  })
})
