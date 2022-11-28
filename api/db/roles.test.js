import tap from 'tap';
import dbMock from './dbMock.test';
import { getAllActiveRoles } from './roles';

const allRoles = [
  {
    id: 22,
    name: 'eAPD System Admin'
  },
  {
    id: 23,
    name: 'eAPD Federal Admin'
  },
  {
    id: 27,
    name: 'eAPD State Admin'
  },
  {
    id: 28,
    name: 'eAPD State Staff'
  },
  {
    id: 29,
    name: 'eAPD State Contractor'
  }
];

const requestedRoles = ['eAPD Federal Admin', 'eAPD State Admin'];

const requestedRolesExpected = [
  {
    id: 23,
    name: 'eAPD Federal Admin'
  },
  {
    id: 27,
    name: 'eAPD State Admin'
  }
];

tap.test('database wrappers / roles', async rolesTests => {
  const db = dbMock('auth_roles');

  rolesTests.beforeEach(async () => {
    dbMock.reset();
  });

  rolesTests.test(
    'gets all roles when no specific roles requested',
    async test => {
      db.select.withArgs('id', 'name').returnsThis();
      db.where.withArgs({ isActive: true }).resolves(allRoles);
      const response = await getAllActiveRoles(null, { db });
      test.same(response, allRoles);
    }
  );

  rolesTests.test('returns specific roles if requested', async test => {
    db.select.withArgs('id', 'name').returnsThis();
    db.where.withArgs({ isActive: true }).returnsThis();
    db.whereIn
      .withArgs('name', requestedRoles)
      .resolves(requestedRolesExpected);

    const response = await getAllActiveRoles(requestedRoles, { db });
    test.same(response, requestedRolesExpected);
  });
});
