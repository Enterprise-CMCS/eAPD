const sinon = require('sinon');
const tap = require('tap');
const dbMock = require('./dbMock.test');

const {
  createOktaUser,
  updateOktaUser,
  createOrUpdateOktaUser,
  sanitizeProfile,
  createOrUpdateOktaUserFromOkta
} = require('./oktaUsers');

tap.test('database wrappers / oktaUsers', async oktaUsersTests => {
  //
  // Life is like a hurricane
  // Here in Duckburg
  // Race cars, lasers, aeroplanes
  // It's a duck-blur!
  // Might solve a mystery
  // Or rewrite history!
  //
  sinon.useFakeTimers(Date.UTC(1904, 9, 3, 0, 0, 0, 0));
  const db = dbMock('okta_users');

  const toSanitize = {
    displayName: 'displayName',
    email: 'email',
    secondEmail: 'secondEmail',
    primaryPhone: 'primaryPhone',
    mobilePhone: 'mobilePhone',
    login: 'login'
  };

  oktaUsersTests.beforeEach(async () => {
    dbMock.reset();
  });

  oktaUsersTests.test('creating an Okta User', async test => {
    db.insert
      .withArgs({ user_id: 'oktaUser', email: 'email', metadata: 'metadata' })
      .resolves('oktaUser id');

    const newUser = await createOktaUser(
      'oktaUser',
      { email: 'email', metadata: 'metadata' },
      { db }
    );

    test.equal(newUser, 'oktaUser id');
  });

  oktaUsersTests.test('updating an Okta User', async test => {
    db.where.withArgs({ user_id: 'oktaUser' }).returnsThis();
    db.update
      .withArgs({ email: 'email', metadata: 'metadata' })
      .resolves('updated okta_user');

    const updatedUser = await updateOktaUser(
      'oktaUser',
      { email: 'email', metadata: 'metadata' },
      { db }
    );

    test.equal(updatedUser, 'updated okta_user');
  });

  oktaUsersTests.test('createOrUpdate creating an Okta User', async test => {
    db.where.withArgs({ user_id: 'oktaUser' }).returnsThis();
    db.first.resolves(false);

    db.insert
      .withArgs({ user_id: 'oktaUser', email: 'email', metadata: 'metadata' })
      .resolves('oktaUser id');

    const updatedUser = await createOrUpdateOktaUser(
      'oktaUser',
      { email: 'email', metadata: 'metadata' },
      { db }
    );

    test.equal(updatedUser, 'oktaUser id');
  });

  oktaUsersTests.test('createOrUpdate updating an Okta User', async test => {
    db.where.withArgs({ user_id: 'oktaUser' }).returnsThis();
    db.first.resolves(true);

    db.where.withArgs({ user_id: 'oktaUser' }).returnsThis();
    db.update
      .withArgs({ email: 'email', metadata: 'metadata' })
      .resolves('updated okta_user');

    const updatedUser = await createOrUpdateOktaUser(
      'oktaUser',
      { email: 'email', metadata: 'metadata' },
      { db }
    );

    test.equal(updatedUser, 'updated okta_user');
  });

  oktaUsersTests.test('sanitize clean Profile', async test => {
    const sanitized = sanitizeProfile(toSanitize);
    test.same(sanitized, toSanitize);
  });

  oktaUsersTests.test('sanitize Profile with additional fields', async test => {
    const sanitizeMe = { ...toSanitize };
    sanitizeMe.foo = 'foo';
    sanitizeMe.bar = 'bar';
    sanitizeMe.qux = 'qux';
    const sanitized = sanitizeProfile(sanitizeMe);
    test.same(sanitized, toSanitize);
  });

  oktaUsersTests.test('sanitize Profile with missing fields', async test => {
    const sanitizeMe = { ...toSanitize };
    delete sanitizeMe.mobilePhone;
    delete sanitizeMe.secondEmail;
    const sanitized = sanitizeProfile(sanitizeMe);
    // same keys, but not same values
    test.same(Object.keys(sanitized), Object.keys(toSanitize));
    test.equal(sanitized.mobilePhone, undefined);
    test.equal(sanitized.secondEmail, undefined);
  });

  oktaUsersTests.test(
    'createOrUpdateOktaUserFromOkta creating oktaUser',
    async test => {
      const okta = sinon.stub();
      okta.getUser = () => {
        return { profile: toSanitize };
      };

      db.where.withArgs({ user_id: 'oktaUser' }).returnsThis();
      db.first.resolves(false);

      const expectedProfile = { ...toSanitize };
      expectedProfile.user_id = 'oktaUser';
      db.insert.withArgs(expectedProfile).resolves('oktaUser id');

      const createdUser = await createOrUpdateOktaUserFromOkta('oktaUser', {
        okta,
        db
      });

      test.equal(true, db.insert.calledWith(expectedProfile));
      test.same(createdUser, 'oktaUser id');
    }
  );

  oktaUsersTests.test(
    'createOrUpdateOktaUserFromOkta updating oktaUser',
    async test => {
      const okta = sinon.stub();
      okta.getUser = () => {
        return { profile: toSanitize };
      };

      db.where.withArgs({ user_id: 'oktaUser' }).returnsThis();
      db.first.resolves(true);

      const expectedProfile = { ...toSanitize };
      expectedProfile.user_id = 'oktaUser';
      db.update.withArgs(expectedProfile).resolves('Updated oktaUser id');

      const updatedUser = await createOrUpdateOktaUserFromOkta('oktaUser', {
        okta,
        db
      });

      test.equal(true, db.update.calledWith(expectedProfile));
      test.same(updatedUser, 'Updated oktaUser id');
    }
  );
});
