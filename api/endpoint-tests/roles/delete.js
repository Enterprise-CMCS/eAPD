const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const { db, request, getFullPath, login } = require('../utils');

tap.test('roles endpoint | DELETE /roles/:roleID', async deleteRolesTests => {
  await db().seed.run();

  const url = getFullPath('/roles');

  deleteRolesTests.test('when unauthenticated', async unauthenticatedTests => {
    unauthenticatedTests.test('with invalid ID', async invalidTest => {
      const { response, body } = await request.delete(`${url}/9001`);
      invalidTest.equal(
        response.statusCode,
        403,
        'gives a 403 status code'
      );
      invalidTest.notOk(body, 'does not send a body');
    });

    unauthenticatedTests.test('with invalid ID', async invalidTest => {
      const { response, body } = await request.delete(`${url}/1`);
      invalidTest.equal(
        response.statusCode,
        403,
        'gives a 403 status code'
      );
      invalidTest.notOk(body, 'does not send a body');
    });
  });

  deleteRolesTests.test('when authenticated', async authenticatedTests => {
    const cookies = await login();

    authenticatedTests.test('with an invalid ID', async invalidTest => {
      const { response, body } = await request.delete(`${url}/9001`, { jar: cookies });
      invalidTest.equal(response.statusCode, 404, 'gives a 404 status code');
      invalidTest.notOk(body, 'does not send a body');
    });

    authenticatedTests.test('with an ID for a role that the user belongs to', async invalidTest => {
      const { response, body } = await request.delete(`${url}/1`, { jar: cookies });
      invalidTest.equal(response.statusCode, 401, 'gives a 401 status code');
      invalidTest.notOk(body, 'does not send a body');
    });

    authenticatedTests.test('with a valid role ID that the user does not belong to', async validTest => {
      const { response, body } = await request.delete(`${url}/2`, { jar: cookies });

      validTest.equal(response.statusCode, 204, 'gives a 204 status code');
      validTest.notOk(body, 'does not send a body');

      const role = await db()('auth_roles').where({ id: 2 }).first();
      const mappings = await db()('auth_role_activity_mapping')
        .where({ role_id: 2 })
        .select('*');

      validTest.notOk(role, 'deletes the role from the database');

      validTest.same(
        mappings,
        [],
        'deletes mappings between the role and all activities in the database'
      );
    });
  });
});
