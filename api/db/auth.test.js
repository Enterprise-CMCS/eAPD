const tap = require('tap');
const dbMock = require('./dbMock.test');

const {
  createAuthRole,
  deleteAuthRole,
  getAuthActivities,
  getAuthActivitiesByIDs,
  getAuthRoleByID,
  getAuthRoleByName,
  getAuthRoles,
  updateAuthRole
} = require('./auth');

tap.test('database wrappers / auth', async authTests => {
  const roles = dbMock('auth_roles');
  const mapping = dbMock('auth_role_activity_mapping');
  const activities = dbMock('auth_activities');
  const db = roles;

  authTests.beforeEach(async () => {
    dbMock.reset();
    mapping.delete.rejects();
    roles.delete.rejects();
  });

  authTests.test('create an auth role', async test => {
    roles.insert.withArgs({ name: 'role name' }).returnsThis();
    roles.returning.withArgs('id').resolves(['role 1']);
    mapping.insert.withArgs([
      { role_id: 'role 1', activity_id: 'activity 1' },
      { role_id: 'role 1', activity_id: 'activity 2' },
      { role_id: 'role 1', activity_id: 'activity 3' }
    ]);

    const roleID = await createAuthRole(
      'role name',
      ['activity 1', 'activity 2', 'activity 3'],
      {
        db
      }
    );

    test.equal(roleID, 'role 1');
  });

  authTests.test('delete an auth role', async test => {
    mapping.where.withArgs('role_id', 'role id').returnsThis();
    mapping.delete.resolves();

    roles.where.withArgs('id', 'role id').returnsThis();
    roles.delete.resolves();

    test.resolves(deleteAuthRole('role id', { db }));
  });

  authTests.test('get all auth activities', async test => {
    activities.select.resolves('activities');

    const acts = await getAuthActivities({ db });

    test.equal(acts, 'activities');
  });

  authTests.test('get auth activities from a list of IDs', async test => {
    activities.whereIn.withArgs('id', 'list of ids').returnsThis();
    activities.select.resolves('activities');

    const acts = await getAuthActivitiesByIDs('list of ids', { db });

    test.equal(acts, 'activities');
  });

  authTests.test('get auth role by ID', async test => {
    roles.where.withArgs('id', 'role id').returnsThis();
    roles.first.resolves('role');

    const role = await getAuthRoleByID('role id', { db });

    test.equal(role, 'role');
  });

  authTests.test('get auth role by name', async test => {
    roles.where.withArgs('name', 'role name').returnsThis();
    roles.first.resolves('role');

    const role = await getAuthRoleByName('role name', { db });

    test.equal(role, 'role');
  });

  authTests.test('get all roles, with activities attached', async test => {
    roles.select.resolves([{ id: 'role1' }, { id: 'role2' }]);

    mapping.where.withArgs('role_id', 'role1').returnsThis();
    mapping.where.withArgs('role_id', 'role2').returnsThis();
    mapping.select
      .withArgs('activity_id')
      .resolves([{ activity_id: 'activity1' }, { activity_id: 'activity2' }]);

    activities.whereIn.withArgs('id', ['activity1', 'activity2']).returnsThis();
    activities.select
      .withArgs('name')
      .resolves([{ name: 'activity 1' }, { name: 'activity 2' }]);

    const authRoles = await getAuthRoles({ db });

    test.same(authRoles, [
      { id: 'role1', activities: ['activity 1', 'activity 2'] },
      { id: 'role2', activities: ['activity 1', 'activity 2'] }
    ]);
  });

  authTests.test('update an auth role', async updateAuthRoleTests => {
    updateAuthRoleTests.test('where the role name is unchanged', async test => {
      mapping.where.withArgs('role_id', 'role id').returnsThis();
      mapping.delete.resolves();
      mapping.insert
        .withArgs([
          { activity_id: 'activity1', role_id: 'role id' },
          { activity_id: 'activity2', role_id: 'role id' },
          { activity_id: 'activity3', role_id: 'role id' }
        ])
        .resolves();

      test.resolves(
        updateAuthRole(
          'role id',
          null,
          ['activity1', 'activity2', 'activity3'],
          {
            db
          }
        )
      );
    });

    updateAuthRoleTests.test('where the role name is unchanged', async test => {
      roles.where.withArgs('id', 'role id').returnsThis();
      roles.update.withArgs({ name: 'role name' }).resolves();

      mapping.where.withArgs('role_id', 'role id').returnsThis();
      mapping.delete.resolves();
      mapping.insert
        .withArgs([
          { activity_id: 'activity1', role_id: 'role id' },
          { activity_id: 'activity2', role_id: 'role id' },
          { activity_id: 'activity3', role_id: 'role id' }
        ])
        .resolves();

      test.resolves(
        updateAuthRole(
          'role id',
          'role name',
          ['activity1', 'activity2', 'activity3'],
          {
            db
          }
        )
      );
    });
  });
});
