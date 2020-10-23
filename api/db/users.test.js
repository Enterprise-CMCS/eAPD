const sinon = require('sinon');
const tap = require('tap');

const dbMock = require('./dbMock.test');
const oktaAuthMock = require('../auth/oktaAuthMock.test');

const {
  getAllUsers,
  getUserByID,
  populateUser,
  sanitizeUser,
  updateUserApplicationProfile,
  addUserToGroup,
  userGroups,
  userApplicationProfile
} = require('./users');

tap.test('database wrappers / users', async usersTests => {
  const sandbox = sinon.createSandbox();
  const db = dbMock('users');
  const { oktaClient: client, callOktaEndpoint: endpointClient } = oktaAuthMock;

  const populate = sinon.stub();

  const sanitizedUser = {
    activities: 'auth activities',
    id: 'user id',
    name: 'real name',
    phone: 'phone number',
    roles: 'user auth role',
    username: 'email address',
    state: 'user state',
    hasLoggedIn: 'has logged in'
  };

  const unsanitizedUser = {
    activities: 'auth activities',
    id: 'user id',
    displayName: 'real name',
    primaryPhone: 'phone number',
    auth_roles: 'user auth role',
    login: 'email address',
    other: 'junk',
    password: 'oh no password',
    position: 'user position',
    state: 'user state',
    hasLoggedIn: 'has logged in'
  };

  usersTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
    populate.reset();

    oktaAuthMock.reset();

    populate.resolves({
      activities: 'auth activities',
      id: 'user id',
      displayName: 'real name',
      primaryPhone: 'phone number',
      auth_roles: 'user auth role',
      login: 'email address',
      other: 'junk',
      password: 'oh no password',
      position: 'user position',
      state: 'user state',
      hasLoggedIn: 'has logged in'
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

      const user = await getUserByID('user id', { client, populate });

      test.ok(populate.calledWith({ id: 'user id', some: 'user' }));
      test.same(user, sanitizedUser);
    });

    getUsersByIDTests.test('with additional values', async test => {
      client.getUser
        .withArgs('user id')
        .resolves({ status: 'ACTIVE', profile: { some: 'user' } });

      const user = await getUserByID('user id', {
        client,
        populate,
        additionalValues: { hasLoggedIn: true }
      });

      test.ok(
        populate.calledWith({ id: 'user id', some: 'user', hasLoggedIn: true })
      );
      test.same(user, sanitizedUser);
    });

    getUsersByIDTests.test('with uncleaned output', async test => {
      client.getUser
        .withArgs('user id')
        .resolves({ status: 'ACTIVE', profile: { some: 'user' } });

      const user = await getUserByID('user id', {
        clean: false,
        client,
        populate
      });

      test.ok(populate.calledWith({ id: 'user id', some: 'user' }));
      test.same(user, unsanitizedUser);
    });

    getUsersByIDTests.test('with no user', async test => {
      client.getUser.withArgs('bad user id').resolves(null);

      const user = await getUserByID('bad user id', {
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

      const user = await getUserByID('user id', {
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
        test.equal(await populateUser(), undefined);
      });

      populateUserTests.test(
        'with a user with activities and a state',
        async populateUserTestsWithValues => {
          const roles = dbMock('auth_roles');
          const mapping = dbMock('auth_role_activity_mapping');
          const activities = dbMock('auth_activities');
          const states = dbMock('states');

          roles.whereIn.resolves([{ id: 'role id', name: 'user role' }]);

          mapping.whereIn.withArgs('role_id', ['role id']).returnsThis();
          mapping.select
            .withArgs('activity_id')
            .resolves([
              { activity_id: 'activity id 1' },
              { activity_id: 'activity id 2' },
              { activity_id: 'activity id 3' }
            ]);

          activities.whereIn
            .withArgs('id', ['activity id 1', 'activity id 2', 'activity id 3'])
            .returnsThis();
          activities.select
            .withArgs('name')
            .resolves([{ name: 'activity 1' }, { name: 'activity 2' }]);

          states.whereIn.withArgs('id', ['state id']).returnsThis();
          states.select.withArgs('id', 'name').returnsThis();
          states.first.resolves({ id: 'state id', name: 'this is a state!' });

          const getGroups = sandbox.stub();
          const getApplicationProfile = sandbox.stub();

          populateUserTestsWithValues.test(
            'pass in roles and state',
            async test => {
              const user = await populateUser(
                {
                  groups: ['user role'],
                  displayName: 'this just goes through',
                  affiliations: ['state id'],
                  hasLoggedIn: true
                },
                { db, getGroups, getApplicationProfile }
              );

              test.same(user, {
                activities: ['activity 1', 'activity 2'],
                auth_roles: ['user role'],
                displayName: 'this just goes through',
                state: { id: 'state id', name: 'this is a state!' },
                hasLoggedIn: true
              });
            }
          );

          populateUserTestsWithValues.test(
            'pass in state and get roles',
            async test => {
              getGroups.withArgs('user id').resolves(['user role']);
              const user = await populateUser(
                {
                  id: 'user id',
                  activities: 'these are overwritten',
                  displayName: 'this just goes through',
                  affiliations: ['state id'],
                  hasLoggedIn: true
                },
                { db, getGroups, getApplicationProfile }
              );

              test.same(user, {
                id: 'user id',
                activities: ['activity 1', 'activity 2'],
                auth_roles: ['user role'],
                displayName: 'this just goes through',
                state: { id: 'state id', name: 'this is a state!' },
                hasLoggedIn: true
              });
            }
          );

          populateUserTestsWithValues.test(
            'pass in state and get empty roles',
            async test => {
              getGroups.withArgs('user id').resolves([]);
              const user = await populateUser(
                {
                  id: 'user id',
                  activities: 'these are overwritten',
                  displayName: 'this just goes through',
                  affiliations: ['state id'],
                  hasLoggedIn: true
                },
                { db, getGroups, getApplicationProfile }
              );

              test.same(user, {
                id: 'user id',
                activities: [],
                auth_roles: [],
                displayName: 'this just goes through',
                state: { id: 'state id', name: 'this is a state!' },
                hasLoggedIn: true
              });
            }
          );

          populateUserTestsWithValues.test(
            'pass in roles and get state',
            async test => {
              getApplicationProfile
                .withArgs('user id')
                .resolves({ affiliations: ['state id'], hasLoggedIn: true });
              const user = await populateUser(
                {
                  id: 'user id',
                  activities: 'these are overwritten',
                  groups: ['user role'],
                  displayName: 'this just goes through'
                },
                { db, getGroups, getApplicationProfile }
              );

              test.same(user, {
                id: 'user id',
                activities: ['activity 1', 'activity 2'],
                auth_roles: ['user role'],
                displayName: 'this just goes through',
                state: { id: 'state id', name: 'this is a state!' },
                hasLoggedIn: true
              });
            }
          );

          populateUserTestsWithValues.test(
            'pass in roles and get empty state',
            async test => {
              getApplicationProfile
                .withArgs('user id')
                .resolves({ affiliations: [], hasLoggedIn: true });
              const user = await populateUser(
                {
                  id: 'user id',
                  activities: 'these are overwritten',
                  groups: ['user role'],
                  displayName: 'this just goes through',
                  hasLoggedIn: true
                },
                { db, getGroups, getApplicationProfile }
              );

              test.same(user, {
                id: 'user id',
                activities: ['activity 1', 'activity 2'],
                auth_roles: ['user role'],
                displayName: 'this just goes through',
                state: {},
                hasLoggedIn: true
              });
            }
          );

          populateUserTestsWithValues.test(
            'pass in role and get state and get hasLoggedIn',
            async test => {
              getApplicationProfile
                .withArgs('user id')
                .resolves({ affiliations: [], hasLoggedIn: true });
              const user = await populateUser(
                {
                  id: 'user id',
                  activities: 'these are overwritten',
                  groups: ['user role'],
                  displayName: 'this just goes through'
                },
                { db, getGroups, getApplicationProfile }
              );

              test.same(user, {
                id: 'user id',
                activities: ['activity 1', 'activity 2'],
                auth_roles: ['user role'],
                displayName: 'this just goes through',
                state: {},
                hasLoggedIn: true
              });
            }
          );

          populateUserTestsWithValues.test(
            'role id is not found in database',
            async test => {
              // Also check what happens if there role ID doesn't actually map
              // to a real role, which shouldn't happen but eh?

              roles.whereIn.resolves(null);
              activities.whereIn.withArgs('id', []).returnsThis();
              activities.select.withArgs('name').resolves([]);

              const user = await populateUser(
                {
                  activities: 'these are overwritten',
                  groups: ['user role'],
                  displayName: 'this just goes through',
                  affiliations: ['state id'],
                  hasLoggedIn: true
                },
                { db, getGroups, getApplicationProfile }
              );

              test.same(user, {
                activities: [],
                auth_roles: [],
                displayName: 'this just goes through',
                state: { id: 'state id', name: 'this is a state!' },
                hasLoggedIn: true
              });
            }
          );
        }
      );

      populateUserTests.test(
        'with a user without activities or a state',
        async test => {
          const getGroups = sandbox.stub();
          const getApplicationProfile = sandbox.stub();
          getApplicationProfile.resolves({
            hasLoggedIn: true,
            affiliations: []
          });
          const user = await populateUser(
            { email: 'email' },
            { db, getGroups, getApplicationProfile }
          );

          test.same(user, {
            activities: [],
            auth_roles: [],
            email: 'email',
            state: {},
            hasLoggedIn: true
          });
        }
      );
    }
  );

  usersTests.test('sanitizing a user', async test => {
    test.same(
      sanitizeUser({
        activities: 'some activities',
        id: 'my user id',
        displayName: 'this is my name',
        primaryPhone: 'call me maybe',
        auth_roles: 'my permissions',
        bob: 'builds bridges',
        login: 'purple_unicorn@compuserve.net',
        password: 'OH NO I HAVE PUBLISHED MY PASSWORD',
        position: 'center square',
        groups: 'the zany one',
        state: 'this is where I live',
        hasLoggedIn: 'has logged in',
        username: 'this does not survive the transition either'
      }),
      {
        activities: 'some activities',
        id: 'my user id',
        name: 'this is my name',
        phone: 'call me maybe',
        roles: 'my permissions',
        state: 'this is where I live',
        hasLoggedIn: 'has logged in',
        username: 'purple_unicorn@compuserve.net'
      }
    );
  });

  usersTests.test('updating a user', async updateUserTest => {
    const user = {
      displayName: 'Test User',
      update: sandbox.stub(),
      userprofile: {
        affiliations: ['state id'],
        hasLoggedIn: false
      }
    };

    updateUserTest.test('successfully update user', async test => {
      client.getUser.withArgs('user id').resolves(user);
      user.update.resolves(null);
      const { user: updatedUser } = await updateUserApplicationProfile(
        'user id',
        { hasLoggedIn: true },
        { client }
      );

      test.same(updatedUser, {
        displayName: user.displayName,
        update: user.update,
        userprofile: {
          affiliations: user.userprofile.affiliations,
          hasLoggedIn: true
        }
      });
    });

    updateUserTest.test(
      'successfully update user, ignore affiliation change',
      async test => {
        client.getUser.withArgs('user id').resolves(user);
        user.update.resolves(null);
        const { user: updatedUser, error } = await updateUserApplicationProfile(
          'user id',
          { affiliations: ['new state id'], hasLoggedIn: true },
          {
            client
          }
        );

        test.same(updatedUser, {
          displayName: user.displayName,
          update: user.update,
          userprofile: {
            affiliations: user.userprofile.affiliations,
            hasLoggedIn: true
          }
        });
        test.equal(error, 'Do not use this method to update affiliations');
      }
    );

    updateUserTest.test('cannot update user', async test => {
      client.getUser.withArgs('user id').resolves(user);
      user.update.rejects('User Test User could not be updated');
      const { error } = await updateUserApplicationProfile(
        'user id',
        'group id',
        {
          client
        }
      );

      test.equal(error, 'User Test User could not be updated');
    });

    updateUserTest.test('cannot find user to update', async test => {
      client.getUser.withArgs('user id').rejects('No user');
      const { error } = await updateUserApplicationProfile(
        'user id',
        'group id',
        {
          client
        }
      );

      test.equal(user.update.callCount, 0);
      test.equal(error, 'Could not find user id');
    });
  });

  usersTests.test('adding a user to a group', async addUserToGroupTest => {
    const user = {
      displayName: 'Test User',
      addToGroup: sandbox.stub()
    };

    addUserToGroupTest.test('successfully add user', async test => {
      client.getUser.withArgs('user id').resolves(user);
      user.addToGroup.withArgs('group id').resolves(null);
      const getGroups = sandbox.stub();
      getGroups.withArgs('user id').resolves(['group id']);
      const { groups } = await addUserToGroup('user id', 'group id', {
        client,
        getGroups
      });

      test.same(groups, ['group id']);
    });

    addUserToGroupTest.test('cannot add user', async test => {
      client.getUser.withArgs('user id').resolves(user);
      user.addToGroup
        .withArgs('group id')
        .rejects('User Test User could not be added to group');
      const { error } = await addUserToGroup('user id', 'group id', { client });

      test.equal(error, 'User Test User could not be added to group');
    });

    addUserToGroupTest.test('cannot find user to add', async test => {
      client.getUser.withArgs('user id').rejects('No user');
      const { error } = await addUserToGroup('user id', 'group id', { client });

      test.equal(user.addToGroup.callCount, 0);
      test.equal(error, 'Could not find user id');
    });
  });

  usersTests.test("getting a user's groups", async userGroupsTest => {
    userGroupsTest.test("successfully gets user's groups", async test => {
      endpointClient.resolves(['group id']);
      const groups = await userGroups('user id', { client: endpointClient });

      test.same(groups, ['group id']);
    });

    userGroupsTest.test("failed to get user's groups", async test => {
      endpointClient.rejects('rejection');
      const groups = await userGroups('user id', { client: endpointClient });

      test.same(groups, []);
    });
  });

  usersTests.test(
    "getting a user's application profile",
    async userApplicationProfileTest => {
      userApplicationProfileTest.test(
        "successfully gets user's application profile",
        async test => {
          endpointClient.resolves({
            affiliations: ['state id'],
            hasLoggedIn: true
          });
          const profile = await userApplicationProfile('user id', {
            client: endpointClient,
            applicationUrl: () => '/url'
          });

          test.same(profile, {
            affiliations: ['state id'],
            hasLoggedIn: true
          });
        }
      );

      userApplicationProfileTest.test(
        "fails to get user's application profile",
        async test => {
          endpointClient.rejects('cannot get profile');
          const profile = await userApplicationProfile('user id', {
            client: endpointClient,
            applicationUrl: () => '/url'
          });

          test.same(profile, {});
        }
      );
    }
  );
});
