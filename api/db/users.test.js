const sinon = require('sinon');
const tap = require('tap');
const dbMock = require('./dbMock.test');
const oktaAuthMock = require('../auth/oktaAuthMock.test');
const knex = require('./knex');

const {
  getAllUsers,
  getUserByID,
  populateUserRole,
  sanitizeUser,
  userLoggedIntoState
} = require('./users');

tap.test('database wrappers / users', async usersTests => {
  const sandbox = sinon.createSandbox();
  const db = dbMock('okta_users');
  const { oktaClient: client } = oktaAuthMock;

  const populate = sinon.stub();

  const sanitizedUser = {
    activities: 'auth activities',
    affiliation: 'user affiliation',
    id: 'user id',
    name: 'real name',
    permissions: 'permissions',
    role: 'role',
    state: 'user state',
    states: [],
    username: 'email address'
  };

  const unsanitizedUser = {
    activities: 'auth activities',
    affiliation: 'user affiliation',
    id: 'user id',
    displayName: 'real name',
    permissions: 'permissions',
    login: 'email address',
    other: 'junk',
    password: 'oh no password',
    position: 'user position',
    role: 'role',
    state: 'user state',
    states: []
  };

  const newPermissions = [
    'new-draft',
    'new-document',
    'new-document',
    'new-roles'
  ];

  let getUserAffiliatedStates;
  let getAffiliationByState;
  let getStateById;
  let getUserPermissionsForStates;
  let getRolesAndActivities;
  let updateAuthAffiliation;
  let auditUserLogin;
  let getAuthRoleByName;

  usersTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
    populate.reset();
    dbMock.reset();
    oktaAuthMock.reset();

    populate.resolves({
      activities: 'auth activities',
      affiliation: 'user affiliation',
      id: 'user id',
      displayName: 'real name',
      permissions: 'permissions',
      login: 'email address',
      other: 'junk',
      password: 'oh no password',
      position: 'user position',
      role: 'role',
      state: 'user state',
      states: []
    });

    getUserAffiliatedStates = sandbox.stub();
    getAffiliationByState = sandbox.stub();
    getStateById = sandbox.stub();
    getUserPermissionsForStates = sandbox.stub();
    getRolesAndActivities = sandbox.stub();
    updateAuthAffiliation = sandbox.stub();
    auditUserLogin = sandbox.stub();
    getAuthRoleByName = sandbox.stub();

    getAffiliationByState.withArgs(unsanitizedUser.id, 'state1').resolves({
      id: 'affiliation',
      user_id: unsanitizedUser.id,
      state_id: 'state1',
      role_id: 'role id',
      status: 'approved',
      username: unsanitizedUser.login,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    });
    getAffiliationByState.withArgs(unsanitizedUser.id, 'state2').resolves({
      id: 'affiliation',
      user_id: unsanitizedUser.id,
      state_id: 'state2',
      role_id: 'role id',
      status: 'approved',
      username: unsanitizedUser.login,
      expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
    });
    getAffiliationByState.withArgs(unsanitizedUser.id, 'exp').resolves({
      id: 'affiliation',
      user_id: unsanitizedUser.id,
      state_id: 'exp',
      role_id: '123',
      status: 'approved',
      username: unsanitizedUser.login,
      expires_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)
    });
    getAuthRoleByName.resolves({ id: '123', name: 'role' });
    getStateById.withArgs('state1').resolves({
      id: 'state1',
      address1: 'New Address 1',
      director: {
        name: 'Director Name 1'
      }
    });
    getStateById.withArgs('state2').resolves({
      id: 'state2',
      address1: 'New Address 2',
      director: {
        name: 'Director Name 2'
      }
    });
    getUserPermissionsForStates.resolves(newPermissions);
    getRolesAndActivities.resolves([
      {
        id: 'role id',
        name: 'role name',
        activities: newPermissions
      }
    ]);
  });

  usersTests.test('userLoggedIntoState', async userLoggedIntoStateTest => {
    userLoggedIntoStateTest.test('no affiliation', async test => {
      auditUserLogin.resolves({});
      const user = { ...sanitizedUser, affiliation: null };
      await userLoggedIntoState(user, 'state1', { auditUserLogin });

      test.ok(auditUserLogin.notCalled);
    });

    userLoggedIntoStateTest.test('no stateId and no states', async test => {
      auditUserLogin.resolves({});
      const user = { ...sanitizedUser };
      await userLoggedIntoState(user, null, { auditUserLogin });

      test.ok(auditUserLogin.notCalled);
    });

    userLoggedIntoStateTest.test('1 state', async test => {
      auditUserLogin.resolves({});
      const user = { ...sanitizedUser, states: { state1: { role: 'Admin' } } };
      await userLoggedIntoState(user, null, { auditUserLogin });

      test.ok(auditUserLogin.calledOnce);
    });

    userLoggedIntoStateTest.test('state id and multiple states', async test => {
      auditUserLogin.resolves({});
      const user = {
        ...sanitizedUser,
        states: { state1: { role: 'Admin' }, state2: { role: 'Staff' } }
      };
      await userLoggedIntoState(user, 'state1', { auditUserLogin });

      test.ok(auditUserLogin.calledOnce);
    });

    userLoggedIntoStateTest.test(
      'no state id and multiple states',
      async test => {
        auditUserLogin.resolves({});
        const user = {
          ...sanitizedUser,
          states: { state1: { role: 'Admin' }, state2: { role: 'Staff' } }
        };
        await userLoggedIntoState(user, null, { auditUserLogin });

        test.ok(auditUserLogin.notCalled);
      }
    );
  });

  usersTests.test('populate user role', async populateUserRoleTests => {
    populateUserRoleTests.test('no user', async test => {
      const user = await populateUserRole(null, null, {
        getUserAffiliatedStates,
        getAffiliationByState,
        getStateById,
        getUserPermissionsForStates,
        getRolesAndActivities,
        updateAuthAffiliation,
        getAuthRoleByName
      });

      test.equal(user, null);
    });

    populateUserRoleTests.test('no affiliations', async test => {
      getUserAffiliatedStates.resolves({});
      const user = await populateUserRole(unsanitizedUser, null, {
        getUserAffiliatedStates,
        getAffiliationByState,
        getStateById,
        getUserPermissionsForStates,
        getRolesAndActivities,
        updateAuthAffiliation,
        getAuthRoleByName
      });
      test.same(user, {
        ...unsanitizedUser,
        state: {},
        states: {},
        role: '',
        affiliation: {},
        activities: [],
        permissions: []
      });
    });

    populateUserRoleTests.test('no affiliations with state id', async test => {
      getUserAffiliatedStates.resolves({});
      const user = await populateUserRole(unsanitizedUser, 'state1', {
        getUserAffiliatedStates,
        getAffiliationByState,
        getStateById,
        getUserPermissionsForStates,
        getRolesAndActivities,
        updateAuthAffiliation,
        getAuthRoleByName
      });
      test.same(user, {
        ...unsanitizedUser,
        state: {},
        states: {},
        role: '',
        affiliation: {},
        activities: [],
        permissions: []
      });
    });

    // expires_at: new Date('2020-12-16T00:00:00.000Z')
    populateUserRoleTests.test('1 affiliation, no stateId', async test => {
      getUserAffiliatedStates.resolves({ state1: 'approved' });
      await populateUserRole(unsanitizedUser, null, {
        getUserAffiliatedStates,
        getAffiliationByState,
        getStateById,
        getUserPermissionsForStates,
        getRolesAndActivities,
        updateAuthAffiliation,
        getAuthRoleByName
      });
      test.ok(
        getAffiliationByState.calledOnceWith(unsanitizedUser.id, 'state1')
      );
      test.ok(updateAuthAffiliation.notCalled);
    });

    populateUserRoleTests.test('2 affiliation2, no stateId', async test => {
      getUserAffiliatedStates.resolves({
        state1: 'approved',
        state2: 'approved'
      });
      await populateUserRole(unsanitizedUser, null, {
        getUserAffiliatedStates,
        getAffiliationByState,
        getStateById,
        getUserPermissionsForStates,
        getRolesAndActivities,
        updateAuthAffiliation,
        getAuthRoleByName
      });
      test.ok(
        getAffiliationByState.calledOnceWith(unsanitizedUser.id, 'state1')
      );
      test.ok(updateAuthAffiliation.notCalled);
    });

    populateUserRoleTests.test('2 affiliation2 with state id', async test => {
      getUserAffiliatedStates.resolves({
        state1: 'approved',
        state2: 'approved'
      });
      await populateUserRole(unsanitizedUser, 'state2', {
        getUserAffiliatedStates,
        getAffiliationByState,
        getStateById,
        getUserPermissionsForStates,
        getRolesAndActivities,
        updateAuthAffiliation,
        getAuthRoleByName
      });
      test.ok(
        getAffiliationByState.calledOnceWith(unsanitizedUser.id, 'state2')
      );
      test.ok(updateAuthAffiliation.notCalled);
    });

    populateUserRoleTests.test('expired affiliation', async test => {
      getUserAffiliatedStates.resolves({
        state1: 'approved',
        state2: 'approved',
        exp: 'approved'
      });
      await populateUserRole(unsanitizedUser, 'exp', {
        getUserAffiliatedStates,
        getAffiliationByState,
        getStateById,
        getUserPermissionsForStates,
        getRolesAndActivities,
        updateAuthAffiliation,
        getAuthRoleByName
      });
      test.ok(getAffiliationByState.calledOnceWith(unsanitizedUser.id, 'exp'));
      test.ok(updateAuthAffiliation.calledOnce);
    });
  });

  usersTests.test('getting all users', async getAllUsersTests => {
    getAllUsersTests.beforeEach(async () => {
      client.listUsers.resolves([1, 2, 3]);
    });

    getAllUsersTests.test('with cleaned output', async test => {
      const users = await getAllUsers({ client, populate });

      test.ok(populate.calledWith(1));
      test.ok(populate.calledWith(2));
      test.ok(populate.calledWith(3));
      test.same(users, [sanitizedUser, sanitizedUser, sanitizedUser]);
    });

    getAllUsersTests.test('with uncleaned output', async test => {
      const users = await getAllUsers({ clean: false, client, populate });

      test.ok(populate.calledWith(1));
      test.ok(populate.calledWith(2));
      test.ok(populate.calledWith(3));
      test.same(users, [unsanitizedUser, unsanitizedUser, unsanitizedUser]);
    });
  });

  usersTests.test('getting a user by id', async getUsersByIDTests => {
    getUsersByIDTests.test('with cleaned output', async test => {
      client.getUser
        .withArgs('user id')
        .resolves({ status: 'ACTIVE', profile: { some: 'user' } });

      const user = await getUserByID('user id', true, { client, populate });

      test.ok(populate.calledWith({ id: 'user id', some: 'user' }));
      test.same(user, sanitizedUser);
    });

    getUsersByIDTests.test('without contacting Okta', async test => {
      client.getUser
        .withArgs('user id')
        .resolves({ status: 'ACTIVE', profile: { some: 'user' } });
      db.where.withArgs({ user_id: 'user id' }).returnsThis();
      db.first.resolves({
        user_id: 'user id',
        email: 'someAddress@email.com'
      });
      const user = await getUserByID('user id', false, {
        client,
        populate,
        db
      });
      test.ok(client.getUser.notCalled);
      // profile is not in scope because we didn't call OKTA
      test.ok(populate.calledWith({ id: 'user id' }));
      test.same(user, sanitizedUser);
    });

    getUsersByIDTests.test('with additional values', async test => {
      client.getUser
        .withArgs('user id')
        .resolves({ status: 'ACTIVE', profile: { some: 'user' } });

      const user = await getUserByID('user id', true, {
        client,
        populate,
        additionalValues: {}
      });

      test.ok(populate.calledWith({ id: 'user id', some: 'user' }));
      test.same(user, sanitizedUser);
    });

    getUsersByIDTests.test('with uncleaned output', async test => {
      client.getUser
        .withArgs('user id')
        .resolves({ status: 'ACTIVE', profile: { some: 'user' } });

      const user = await getUserByID('user id', true, {
        clean: false,
        client,
        populate
      });

      test.ok(populate.calledWith({ id: 'user id', some: 'user' }));
      test.same(user, unsanitizedUser);
    });

    getUsersByIDTests.test('with no user', async test => {
      client.getUser.withArgs('bad user id').resolves(null);

      const user = await getUserByID('bad user id', true, {
        clean: true,
        client,
        populate
      });

      // test.notOk(populate.calledWith({ id: 'user id', some: 'user' }));
      test.equal(populate.callCount, 0);
      test.same(user, null);
    });

    getUsersByIDTests.test('with inactive user', async test => {
      client.getUser
        .withArgs('user id')
        .resolves({ status: 'INACTIVE', profile: { some: 'user' } });

      const user = await getUserByID('user id', true, {
        clean: true,
        client,
        populate
      });

      // test.notOk(populate.calledWith({ id: 'user id', some: 'user' }));
      test.equal(populate.callCount, 0);
      test.same(user, null);
    });
  });

  usersTests.test(
    'populating a user with related data',
    async populateUserTests => {
      populateUserTests.test('without a user', async test => {
        const populatedUser = await populateUserRole();
        test.same(populatedUser, null);
      });

      // populateUserTests.test(
      //   'with a user with activities and a state',
      //   async populateUserTestsWithValues => {
      //     const roles = dbMock('auth_roles');
      //     const mapping = dbMock('auth_role_activity_mapping');
      //     const activities = dbMock('auth_activities');
      //     const states = dbMock('states');

      //     roles.whereIn.resolves([{ id: 'role id', name: 'user role' }]);

      //     mapping.whereIn.withArgs('role_id', ['role id']).returnsThis();
      //     mapping.select
      //       .withArgs('activity_id')
      //       .resolves([
      //         { activity_id: 'activity id 1' },
      //         { activity_id: 'activity id 2' },
      //         { activity_id: 'activity id 3' }
      //       ]);

      //     activities.whereIn
      //       .withArgs('id', ['activity id 1', 'activity id 2', 'activity id 3'])
      //       .returnsThis();
      //     activities.select
      //       .withArgs('name')
      //       .resolves([{ name: 'activity 1' }, { name: 'activity 2' }]);

      //     states.whereIn.withArgs('id', ['state id']).returnsThis();
      //     states.select.withArgs('id', 'name').returnsThis();
      //     states.first.resolves({ id: 'state id', name: 'this is a state!' });

      //     populateUserTestsWithValues.test(
      //       'pass in roles and state',
      //       async test => {
      //         const user = await populateUserRole(
      //           {
      //             groups: ['user role'],
      //             displayName: 'this just goes through',
      //             affiliations: ['state id'],
      //           },
      //           { db, getUserPermissionsForStates, getUserAffiliatedStates, getAffiliationsByUserId, getStateById, getRolesAndActivities }
      //         );

      //         test.same(user, {
      //           activities: ['activity 1', 'activity 2'],
      //           auth_roles: ['user role'],
      //           displayName: 'this just goes through',
      //           state: { id: 'state id', name: 'this is a state!' },
      //         });
      //       }
      //     );

      //     populateUserTestsWithValues.test(
      //       'pass in state and get roles',
      //       async test => {
      //         getGroups.withArgs('user id').resolves(['user role']);
      //         const user = await populateUserRole(
      //           {
      //             id: 'user id',
      //             activities: 'these are overwritten',
      //             displayName: 'this just goes through',
      //             affiliations: ['state id'],
      //           },
      //           { db, getGroups, getApplicationProfile }
      //         );

      //         test.same(user, {
      //           id: 'user id',
      //           activities: ['activity 1', 'activity 2'],
      //           auth_roles: ['user role'],
      //           displayName: 'this just goes through',
      //           state: { id: 'state id', name: 'this is a state!' },
      //         });
      //       }
      //     );

      //     populateUserTestsWithValues.test(
      //       'pass in state and get empty roles',
      //       async test => {
      //         getGroups.withArgs('user id').resolves([]);
      //         const user = await populateUserRole(
      //           {
      //             id: 'user id',
      //             activities: 'these are overwritten',
      //             displayName: 'this just goes through',
      //             affiliations: ['state id'],
      //           },
      //           { db, getUserPermissionsForStates, getUserAffiliatedStates, getAffiliationsByUserId, getStateById, getRolesAndActivities }
      //         );

      //         test.same(user, {
      //           id: 'user id',
      //           activities: [],
      //           auth_roles: [],
      //           displayName: 'this just goes through',
      //           state: { id: 'state id', name: 'this is a state!' },
      //         });
      //       }
      //     );

      //     populateUserTestsWithValues.test(
      //       'pass in roles and get state',
      //       async test => {
      //         getApplicationProfile
      //           .withArgs('user id')
      //           .resolves({ affiliations: ['state id'] });
      //         const user = await populateUserRole(
      //           {
      //             id: 'user id',
      //             activities: 'these are overwritten',
      //             groups: ['user role'],
      //             displayName: 'this just goes through'
      //           },
      //           { db, getUserPermissionsForStates, getUserAffiliatedStates, getAffiliationsByUserId, getStateById, getRolesAndActivities }
      //         );

      //         test.same(user, {
      //           id: 'user id',
      //           activities: ['activity 1', 'activity 2'],
      //           auth_roles: ['user role'],
      //           displayName: 'this just goes through',
      //           state: { id: 'state id', name: 'this is a state!' }
      //         });
      //       }
      //     );

      //     populateUserTestsWithValues.test(
      //       'pass in roles and get empty state',
      //       async test => {
      //         getApplicationProfile
      //           .withArgs('user id')
      //           .resolves({ affiliations: [] });
      //         const user = await populateUserRole(
      //           {
      //             id: 'user id',
      //             activities: 'these are overwritten',
      //             groups: ['user role'],
      //             displayName: 'this just goes through'
      //           },
      //           { db, getUserPermissionsForStates, getUserAffiliatedStates, getAffiliationsByUserId, getStateById, getRolesAndActivities }
      //         );

      //         test.same(user, {
      //           id: 'user id',
      //           activities: ['activity 1', 'activity 2'],
      //           auth_roles: ['user role'],
      //           displayName: 'this just goes through',
      //           state: {}
      //         });
      //       }
      //     );

      //     populateUserTestsWithValues.test(
      //       'pass in role and get state',
      //       async test => {
      //         getApplicationProfile
      //           .withArgs('user id')
      //           .resolves({ affiliations: [] });
      //         const user = await populateUserRole(
      //           {
      //             id: 'user id',
      //             activities: 'these are overwritten',
      //             groups: ['user role'],
      //             displayName: 'this just goes through'
      //           },
      //           { db, getUserPermissionsForStates, getUserAffiliatedStates, getAffiliationsByUserId, getStateById, getRolesAndActivities }
      //         );

      //         test.same(user, {
      //           id: 'user id',
      //           activities: ['activity 1', 'activity 2'],
      //           auth_roles: ['user role'],
      //           displayName: 'this just goes through',
      //           state: {}
      //         });
      //       }
      //     );

      //     populateUserTestsWithValues.test(
      //       'role id is not found in database',
      //       async test => {
      //         // Also check what happens if there role ID doesn't actually map
      //         // to a real role, which shouldn't happen but eh?

      //         roles.whereIn.resolves(null);
      //         activities.whereIn.withArgs('id', []).returnsThis();
      //         activities.select.withArgs('name').resolves([]);

      //         const user = await populateUserRole(
      //           {
      //             activities: 'these are overwritten',
      //             groups: ['user role'],
      //             displayName: 'this just goes through',
      //             affiliations: ['state id']
      //           },
      //           { db, getUserPermissionsForStates, getUserAffiliatedStates, getAffiliationsByUserId, getStateById, getRolesAndActivities }
      //         );

      //         test.same(user, {
      //           activities: [],
      //           displayName: 'this just goes through',
      //           state: { id: 'state id', name: 'this is a state!' }
      //         });
      //       }
      //     );
      //   }
      // );

      // populateUserTests.test(
      //   'with a user without activities or a state',
      //   async test => {
      //     const user = await populateUserRole(
      //       { email: 'email' },
      //       { db, getUserPermissionsForStates, getUserAffiliatedStates, getAffiliationsByUserId, getStateById, getRolesAndActivities }
      //     );

      //     test.same({
      //       activities: [],
      //       email: 'email',
      //       state: {},
      //     }, user);
      //   }
      // );
    }
  );

  usersTests.test('sanitizing a user', async test => {
    test.same(
      sanitizeUser({
        activities: 'some activities',
        affiliation: 'user affiliation',
        id: 'my user id',
        displayName: 'this is my name',
        permissions: 'permissions',
        bob: 'builds bridges',
        login: 'purple_unicorn@compuserve.net',
        password: 'OH NO I HAVE PUBLISHED MY PASSWORD',
        position: 'center square',
        groups: 'the zany one',
        state: 'this is where I live',
        states: [],
        username: 'this does not survive the transition either',
        role: 'role'
      }),
      {
        activities: 'some activities',
        affiliation: 'user affiliation',
        id: 'my user id',
        name: 'this is my name',
        permissions: 'permissions',
        role: 'role',
        state: 'this is where I live',
        states: [],
        username: 'purple_unicorn@compuserve.net'
      }
    );
  });

  usersTests.teardown(async () => {
    await knex.destroy();
  });
});
