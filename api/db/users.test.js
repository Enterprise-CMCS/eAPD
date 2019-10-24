const sinon = require('sinon');
const tap = require('tap');

const dbMock = require('./dbMock.test');

const {
  createUser,
  deleteUserByID,
  getAllUsers,
  getUserByEmail,
  getUserByID,
  populateUser,
  sanitizeUser,
  updateUser,
  validateUser
} = require('./users');

tap.test('database wrappers / users', async usersTests => {
  const sandbox = sinon.createSandbox();
  const db = dbMock('users');

  const populate = sinon.stub();

  const sanitizedUser = {
    activities: 'auth activities',
    id: 'user id',
    name: 'real name',
    phone: 'phone number',
    position: 'user position',
    role: 'user auth role',
    state: 'user state',
    username: 'email address'
  };

  const unsanitizedUser = {
    activities: 'auth activities',
    auth_role: 'user auth role',
    email: 'email address',
    id: 'user id',
    name: 'real name',
    other: 'junk',
    password: 'oh no password',
    phone: 'phone number',
    position: 'user position',
    state: 'user state'
  };

  usersTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    dbMock.reset();

    populate.resolves({
      activities: 'auth activities',
      auth_role: 'user auth role',
      email: 'email address',
      id: 'user id',
      name: 'real name',
      other: 'junk',
      password: 'oh no password',
      phone: 'phone number',
      position: 'user position',
      state: 'user state'
    });
  });

  usersTests.test('creating a new user', async createUserTests => {
    createUserTests.test('rejects if validation fails', async test => {
      const validate = sinon.stub().rejects();
      test.rejects(createUser({}, { validate }));
    });

    createUserTests.test('saves a new user if valid', async test => {
      const validate = sinon.stub().resolves();
      const hash = { hash: sinon.stub().resolves('hashed password') };

      db.insert
        .withArgs({ password: 'hashed password', phone: '1234567890' })
        .returnsThis();
      db.returning.withArgs('id').resolves(['new user id']);

      const id = await createUser(
        { password: 'unhashed', phone: '123-456-7890' },
        { db, hash, validate }
      );

      test.equal(id, 'new user id');
    });
  });

  usersTests.test('deleting a user', async test => {
    db.where.withArgs('id', 'user id').returnsThis();

    test.resolves(deleteUserByID('user id', { db }));
  });

  usersTests.test('getting all users', async getAllUsersTests => {
    getAllUsersTests.beforeEach(async () => {
      db.select.resolves([1, 2, 3]);
    });

    getAllUsersTests.test('with cleaned output', async test => {
      const users = await getAllUsers({ db, populate });

      test.ok(populate.calledWith(1));
      test.ok(populate.calledWith(2));
      test.ok(populate.calledWith(3));
      test.same(users, [sanitizedUser, sanitizedUser, sanitizedUser]);
    });

    getAllUsersTests.test('with uncleaned output', async test => {
      const users = await getAllUsers({ clean: false, db, populate });

      test.ok(populate.calledWith(1));
      test.ok(populate.calledWith(2));
      test.ok(populate.calledWith(3));
      test.same(users, [unsanitizedUser, unsanitizedUser, unsanitizedUser]);
    });
  });

  usersTests.test(
    'getting a user by email address',
    async getUsersByEmailTests => {
      getUsersByEmailTests.test('with cleaned output', async test => {
        db.whereRaw.withArgs('LOWER(email) = ?', ['email']).returnsThis();
        db.first.resolves({ some: 'user' });

        const user = await getUserByEmail('eMAiL', { db, populate });

        test.ok(populate.calledWith({ some: 'user' }));
        test.same(user, sanitizedUser);
      });

      getUsersByEmailTests.test('with uncleaned output', async test => {
        db.whereRaw.withArgs('LOWER(email) = ?', ['email']).returnsThis();
        db.first.resolves({ some: 'user' });

        const user = await getUserByEmail('eMAiL', {
          clean: false,
          db,
          populate
        });

        test.ok(populate.calledWith({ some: 'user' }));
        test.same(user, unsanitizedUser);
      });
    }
  );

  usersTests.test('getting a user by id', async getUsersByIDTests => {
    getUsersByIDTests.test('with cleaned output', async test => {
      db.where.withArgs('id', 'user id').returnsThis();
      db.first.resolves({ some: 'user' });

      const user = await getUserByID('user id', { db, populate });

      test.ok(populate.calledWith({ some: 'user' }));
      test.same(user, sanitizedUser);
    });

    getUsersByIDTests.test('with uncleaned output', async test => {
      db.where.withArgs('id', 'user id').returnsThis();
      db.first.resolves({ some: 'user' });

      const user = await getUserByID('user id', { clean: false, db, populate });

      test.ok(populate.calledWith({ some: 'user' }));
      test.same(user, unsanitizedUser);
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
        async test => {
          const roles = dbMock('auth_roles');
          const mapping = dbMock('auth_role_activity_mapping');
          const activities = dbMock('auth_activities');
          const states = dbMock('states');

          roles.where.withArgs('name', 'user role').returnsThis();
          roles.select.withArgs('id').returnsThis();
          roles.first.resolves({ id: 'role id' });

          mapping.where.withArgs('role_id', 'role id').returnsThis();
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

          states.where.withArgs('id', 'state id').returnsThis();
          states.select.withArgs('id', 'name').returnsThis();
          states.first.resolves('this is a state!');

          const user = await populateUser(
            {
              activities: 'these are overwritten',
              auth_role: 'user role',
              name: 'this just goes through',
              state: 'this too',
              state_id: 'state id'
            },
            { db }
          );

          test.same(user, {
            activities: ['activity 1', 'activity 2'],
            auth_role: 'user role',
            name: 'this just goes through',
            state: 'this is a state!'
          });

          // Also check what happens if there role ID doesn't actually map
          // to a real role, which shouldn't happen but eh?

          roles.first.resolves(null);
          activities.whereIn.withArgs('id', []).returnsThis();
          activities.select.withArgs('name').resolves([]);

          const user2 = await populateUser(
            {
              activities: 'these are overwritten',
              auth_role: 'user role',
              name: 'this just goes through',
              state: 'this too',
              state_id: 'state id'
            },
            { db }
          );

          test.same(user2, {
            activities: [],
            auth_role: 'user role',
            name: 'this just goes through',
            state: 'this is a state!'
          });
        }
      );

      populateUserTests.test(
        'with a user without activities or a state',
        async test => {
          const user = await populateUser({ email: 'email' }, { db });

          test.same(user, { activities: [], email: 'email', state: {} });
        }
      );
    }
  );

  usersTests.test('sanitizing a user', async test => {
    test.same(
      sanitizeUser({
        activities: 'some activities',
        auth_role: 'my permissions',
        bob: 'builds bridges',
        email: 'purple_unicorn@compuserve.net',
        id: 'my user id',
        name: 'this is my name',
        password: 'OH NO I HAVE PUBLISHED MY PASSWORD',
        phone: 'call me maybe',
        position: 'center square',
        role: 'the zany one',
        state: 'this is where I live',
        username: 'this does not survive the transition either'
      }),
      {
        activities: 'some activities',
        id: 'my user id',
        name: 'this is my name',
        phone: 'call me maybe',
        position: 'center square',
        role: 'my permissions',
        state: 'this is where I live',
        username: 'purple_unicorn@compuserve.net'
      }
    );
  });

  usersTests.test('updating a user', async updateUserTests => {
    const hash = { hash: sandbox.stub() };
    const validate = sandbox.stub();

    updateUserTests.test('with an invalid user', async test => {
      validate.rejects();

      test.rejects(updateUser('user id', {}, { db, hash, validate }));
    });

    updateUserTests.test('with no updates', async test => {
      validate.resolves();

      test.resolves(updateUser('user id', {}, { db, hash, validate }));
    });

    updateUserTests.test('with updates', async test => {
      validate.resolves();
      hash.hash.resolves('hashed password');
      db.where.withArgs('id', 'user id').returnsThis();
      db.update.rejects();
      db.update
        .withArgs({
          name: 'user name',
          password: 'hashed password',
          phone: '1234567890'
        })
        .resolves();

      test.resolves(
        updateUser(
          'user id',
          {
            name: 'user name',
            password: 'plain password',
            phone: '123-456-7890'
          },
          { db, hash, validate }
        )
      );
    });
  });

  usersTests.test('validating a user', async validateUserTests => {
    const user = {
      id: 'user id',
      email: 'email',
      password: 'password',
      auth_role: 'role',
      phone: '123-456-7890',
      state_id: 'state'
    };
    const getUser = sandbox.stub();
    const zxcvbn = sandbox.stub();

    validateUserTests.test(
      'with an existing email on another user',
      async test => {
        getUser.resolves({ id: 'other user id' });

        try {
          await validateUser(user, { db, getUser, zxcvbn });
        } catch (e) {
          test.pass('rejects');
          test.equal(e.message, 'email-exists');
        }
      }
    );

    validateUserTests.test(
      'with an insufficently-complex password',
      async test => {
        getUser.resolves();
        zxcvbn.withArgs('password', []).returns({ score: 2 });

        try {
          await validateUser(
            { ...user, id: undefined },
            { db, getUser, zxcvbn }
          );
        } catch (e) {
          test.pass('rejects');
          test.equal(e.message, 'weak-password');
        }
      }
    );

    validateUserTests.test(
      'with an password over 10 characters',
      async test => {
        getUser.resolves();
        zxcvbn.withArgs('password', []).returns({ score: 5 });

        try {
          await validateUser(
            { ...user, id: undefined, phone: '12345678901' },
            { db, getUser, zxcvbn }
          );
        } catch (e) {
          test.pass('rejects');
          test.equal(e.message, 'invalid-phone');
        }
      }
    );

    validateUserTests.test('with an invalid auth role', async test => {
      getUser.resolves();
      zxcvbn.withArgs('password', []).returns({ score: 5 });

      const auth = dbMock('auth_roles');
      auth.where.withArgs('name', 'role').returnsThis();
      auth.first.resolves();

      try {
        await validateUser({ ...user, id: undefined }, { db, getUser, zxcvbn });
      } catch (e) {
        test.pass('rejects');
        test.equal(e.message, 'invalid-role');
      }
    });

    validateUserTests.test('with an invalid state ID', async test => {
      getUser.resolves();
      zxcvbn.withArgs('password', []).returns({ score: 5 });

      const states = dbMock('states');
      states.where.withArgs('id', 'state').returnsThis();
      states.first.resolves();

      try {
        await validateUser(
          { ...user, id: undefined, auth_role: undefined },
          { db, getUser, zxcvbn }
        );
      } catch (e) {
        test.pass('rejects');
        test.equal(e.message, 'invalid-state');
      }
    });

    validateUserTests.test('with a complete, valid user object', async test => {
      getUser.resolves({ id: 'user id' });
      // make sure zxcvbn includes the user's new email and their name when
      // checking the password strength
      zxcvbn.withArgs('password', ['email', 'name name']).returns({ score: 5 });

      db.where.withArgs('id', 'user id').returnsThis();
      db.select.withArgs('email', 'name').returnsThis();
      db.first.resolves({ email: 'mail mail', name: 'name name' });

      const auth = dbMock('auth_roles');
      auth.where.withArgs('name', 'role').returnsThis();
      auth.first.resolves({});

      const states = dbMock('states');
      states.where.withArgs('id', 'state').returnsThis();
      states.first.resolves({});

      test.resolves(validateUser(user, { db, getUser, zxcvbn }));
    });

    validateUserTests.test(
      'with a valid user object but no new email',
      async test => {
        getUser.resolves({ id: 'user id' });
        // since there is no new email, use the one from the database
        zxcvbn
          .withArgs('password', ['mail mail', 'name name'])
          .returns({ score: 5 });

        db.where.withArgs('id', 'user id').returnsThis();
        db.select.withArgs('email', 'name').returnsThis();
        db.first.resolves({ email: 'mail mail', name: 'name name' });

        const auth = dbMock('auth_roles');
        auth.where.withArgs('name', 'role').returnsThis();
        auth.first.resolves({});

        const states = dbMock('states');
        states.where.withArgs('id', 'state').returnsThis();
        states.first.resolves({});

        test.resolves(
          validateUser({ ...user, email: undefined }, { db, getUser, zxcvbn })
        );
      }
    );
  });
});
