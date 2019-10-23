const sinon = require('sinon');
const tap = require('tap');

const {
  createUser,
  deleteUserByID,
  getAllUsers,
  getUserByEmail,
  getUserByID,
  sanitizeUser,
  populateUser,
  updateUser,
  validateUser
} = require('./users');

tap.test('database wrappers / users', async usersTests => {
  const sandbox = sinon.createSandbox();
  const db = sandbox.stub();

  const queryBuilder = {
    delete: sandbox.stub(),
    first: sandbox.stub(),
    insert: sandbox.stub(),
    returning: sandbox.stub(),
    select: sandbox.stub(),
    where: sandbox.stub(),
    whereRaw: sandbox.stub()
  };

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

    db.withArgs('users').returns(queryBuilder);

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

      queryBuilder.insert
        .withArgs({ password: 'hashed password', phone: '1234567890' })
        .returnsThis();
      queryBuilder.returning.withArgs('id').resolves(['new user id']);

      const id = await createUser(
        { password: 'unhashed', phone: '123-456-7890' },
        { db, hash, validate }
      );

      test.equal(id, 'new user id');
    });
  });

  usersTests.test('deleting a user', async test => {
    queryBuilder.where.withArgs('id', 'user id').returnsThis();

    test.resolves(deleteUserByID('user id', { db }));
  });

  usersTests.test('getting all users', async getAllUsersTests => {
    getAllUsersTests.beforeEach(async () => {
      queryBuilder.select.resolves([1, 2, 3]);
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
        queryBuilder.whereRaw
          .withArgs('LOWER(email) = ?', ['email'])
          .returnsThis();
        queryBuilder.first.resolves({ some: 'user' });

        const user = await getUserByEmail('eMAiL', { db, populate });

        test.ok(populate.calledWith({ some: 'user' }));
        test.same(user, sanitizedUser);
      });

      getUsersByEmailTests.test('with uncleaned output', async test => {
        queryBuilder.whereRaw
          .withArgs('LOWER(email) = ?', ['email'])
          .returnsThis();
        queryBuilder.first.resolves({ some: 'user' });

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
      queryBuilder.where.withArgs('id', 'user id').returnsThis();
      queryBuilder.first.resolves({ some: 'user' });

      const user = await getUserByID('user id', { db, populate });

      test.ok(populate.calledWith({ some: 'user' }));
      test.same(user, sanitizedUser);
    });

    getUsersByIDTests.test('with uncleaned output', async test => {
      queryBuilder.where.withArgs('id', 'user id').returnsThis();
      queryBuilder.first.resolves({ some: 'user' });

      const user = await getUserByID('user id', { clean: false, db, populate });

      test.ok(populate.calledWith({ some: 'user' }));
      test.same(user, unsanitizedUser);
    });
  });

  usersTests.test(
    'populating a user with related data',
    async populateUserTests => {}
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
});
