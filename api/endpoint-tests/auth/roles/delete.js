const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const {
  db,
  request,
  getFullPath,
  login,
  unauthenticatedTest,
  unauthorizedTest
} = require('../../utils');

tap.test(
  'auth roles endpoint | DELETE /auth/roles/:roleID',
  async deleteRolesTests => {
    await db().seed.run();

    const url = roleID => getFullPath(`/auth/roles/${roleID}`);

    unauthenticatedTest('delete', url(1001), deleteRolesTests);
    unauthorizedTest('delete', url(1001), deleteRolesTests);

    deleteRolesTests.test('when authenticated', async authenticatedTests => {
      const cookies = await login();

      authenticatedTests.test('with an invalid role ID', async invalidTest => {
        const { response, body } = await request.delete(url(9001), {
          jar: cookies
        });
        invalidTest.equal(response.statusCode, 404, 'gives a 404 status code');
        invalidTest.notOk(body, 'does not send a body');
      });

      authenticatedTests.test(
        'deleting the role that the user belongs to',
        async invalidTest => {
          const { response, body } = await request.delete(url(1101), {
            jar: cookies
          });
          invalidTest.equal(
            response.statusCode,
            401,
            'gives a 401 status code'
          );
          invalidTest.notOk(body, 'does not send a body');
        }
      );

      authenticatedTests.test(
        'deleting a role that the user does not belong to',
        async validTest => {
          const { response, body } = await request.delete(url(1102), {
            jar: cookies
          });

          validTest.equal(response.statusCode, 204, 'gives a 204 status code');
          validTest.notOk(body, 'does not send a body');

          const role = await db()('auth_roles')
            .where({ id: 1102 })
            .first();
          const mappings = await db()('auth_role_activity_mapping')
            .where({ role_id: 1102 })
            .select('*');

          validTest.notOk(role, 'deletes the role from the database');

          validTest.same(
            mappings,
            [],
            'deletes mappings between the role and all activities in the database'
          );
        }
      );
    });
  }
);
