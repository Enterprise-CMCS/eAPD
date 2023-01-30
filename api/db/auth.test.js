import tap from 'tap';
import dbMock from './dbMock.test.js';

import {
  getAuthActivities,
  getAuthActivitiesByIDs,
  getAuthRoleByID,
  getAuthRoleByName,
  getActiveAuthRoles
} from './auth.js';

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
    roles.where.withArgs('isActive', true).returnsThis();
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

    const authRoles = await getActiveAuthRoles({ db });

    test.same(authRoles, [
      { id: 'role1', activities: ['activity 1', 'activity 2'] },
      { id: 'role2', activities: ['activity 1', 'activity 2'] }
    ]);
  });
});
