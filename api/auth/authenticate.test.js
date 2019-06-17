const jwt = require('jsonwebtoken');
const tap = require('tap');
const sinon = require('sinon');
const lib = require('./authenticate.js');

const sandbox = sinon.createSandbox();

const userModel = {
  query: sandbox.stub(),
  fetch: sandbox.stub()
};
const get = sandbox.stub();
const save = sandbox.stub();
const set = sandbox.spy();

const hash = {
  compare: sandbox.stub()
};

const auth = lib(userModel, hash);

tap.test('local authentication', async authTest => {
  const doneCallback = sandbox.spy();
  authTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
    userModel.query.returns({ query: userModel.query, fetch: userModel.fetch });
    done();
  });

  authTest.test('gets a nonce', async test => {
    const nonce = lib.getNonce('Alf');

    test.ok(
      /[^.]+\.[^.]+\.[^.]+/i.test(nonce),
      'nonce has header, payload, and signature'
    );

    const decoded = jwt.decode(nonce, { complete: true });
    test.same(
      decoded.header,
      { alg: 'HS256', typ: 'JWT' },
      'decoded token header is correct'
    );

    test.equal(decoded.payload.username, 'Alf', 'payload is the username');
    test.equal(
      typeof decoded.payload.iat,
      'number',
      'creation time is a number'
    );
    // JWT times are in seconds, not milliseconds.  Because reasons. 🤷🏼‍♂️
    test.equal(
      decoded.payload.exp,
      decoded.payload.iat + 3,
      'expiration is 3 seconds after the creation time'
    );

    test.equal(typeof decoded.signature, 'string', 'signature is a string');
  });

  authTest.test('with an invalid nonce', async nonceTests => {
    nonceTests.test('invalid jwt', async test => {
      await auth('', '', doneCallback);

      test.ok(
        userModel.fetch.notCalled,
        'never get as far as querying the database'
      );
      test.ok(doneCallback.calledWith(null, false), 'got a false user');
    });

    nonceTests.test('invalid algorithm', async test => {
      const nonce = lib.getNonce('username');
      const token = jwt.decode(nonce, { complete: true });

      const badNonce = jwt.sign(token.payload, 'secret', { algorithm: 'none' });

      await auth(badNonce, '', doneCallback);

      test.ok(
        userModel.fetch.notCalled,
        'never get as far as querying the database'
      );
      test.ok(doneCallback.calledWith(null, false), 'got a false user');
    });

    nonceTests.test('invalid signature', async test => {
      const nonce = lib.getNonce('username');
      const last = nonce[nonce.length - 1];

      await auth(
        `${nonce.substr(0, nonce.length - 1)}${last === 'x' ? 'y' : 'x'}`,
        '',
        doneCallback
      );

      test.ok(
        userModel.fetch.notCalled,
        'never get as far as querying the database'
      );
      test.ok(doneCallback.calledWith(null, false), 'got a false user');
    });

    nonceTests.test('expired nonce', async test => {
      const clock = sinon.useFakeTimers();
      const nonce = lib.getNonce('username');
      clock.tick(3001);

      await auth(nonce, '', doneCallback);

      test.ok(
        userModel.fetch.notCalled,
        'never get as far as querying the database'
      );
      test.ok(doneCallback.calledWith(null, false), 'got a false user');

      clock.restore();
    });
  });

  authTest.test('with a database error', async errorTest => {
    userModel.fetch.rejects();

    await auth(lib.getNonce('user'), 'password', doneCallback);

    errorTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    errorTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    errorTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    errorTest.ok(hash.compare.notCalled, 'does not compare passwords');

    errorTest.equal(doneCallback.callCount, 1, 'called done callback once');
    errorTest.ok(
      doneCallback.calledWith(sinon.match.truthy),
      'got an error message'
    );
  });

  authTest.test('with no valid user', async noUserTest => {
    userModel.fetch.resolves();

    await auth(lib.getNonce('user'), 'password', doneCallback);

    noUserTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    noUserTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    noUserTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    noUserTest.ok(hash.compare.notCalled, 'does not compare password');

    noUserTest.equal(doneCallback.callCount, 1, 'called done callback once');
    noUserTest.ok(doneCallback.calledWith(null, false), 'got a false user');
  });

  authTest.test('with locked account', async invalidTest => {
    get.withArgs('locked_until').returns(Date.now() + 5000);
    userModel.fetch.resolves({ get, save, set });

    await auth(lib.getNonce('user'), 'password', doneCallback);

    invalidTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    invalidTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    invalidTest.ok(
      userModel.fetch.calledOnce,
      'the query is executed one time'
    );

    invalidTest.ok(set.notCalled, 'user data model is not updated');
    invalidTest.ok(hash.compare.notCalled, 'password is never checked');
    invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
    invalidTest.ok(doneCallback.calledWith(null, false), 'got a false user');
  });

  authTest.test('with locked account', async invalidTest => {
    get.withArgs('email').returns('hello@world');
    get.withArgs('password').returns('test-password');
    get.withArgs('id').returns(57);
    get.withArgs('locked_until').returns(500);
    userModel.fetch.resolves({ get, save, set });

    await auth(lib.getNonce('user'), 'password', doneCallback);

    invalidTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    invalidTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    invalidTest.ok(
      userModel.fetch.calledOnce,
      'the query is executed one time'
    );

    invalidTest.ok(
      set.calledWith('failed_logons', null),
      'failed logon data is reset'
    );
    invalidTest.ok(
      set.calledWith('locked_until', null),
      'account lock is reset'
    );
    invalidTest.ok(save.calledAfter(set), 'data model changes are saved');
    invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
    invalidTest.ok(doneCallback.calledWith(null, false), 'got a false user');
  });

  authTest.test('with invalid password', async invalidTest => {
    get.withArgs('email').returns('hello@world');
    get.withArgs('password').returns('test-password');
    get.withArgs('id').returns(57);
    get.withArgs('locked_until').returns(0);
    userModel.fetch.resolves({ get, save, set });
    hash.compare.resolves(false);

    const clock = sinon.useFakeTimers();
    clock.tick(54321012345);

    await auth(lib.getNonce('user'), 'password', doneCallback);

    clock.restore();

    invalidTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    invalidTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    invalidTest.ok(
      userModel.fetch.calledOnce,
      'the query is executed one time'
    );

    invalidTest.ok(hash.compare.calledOnce, 'password is compared one time');
    invalidTest.ok(
      hash.compare.calledWith('password', 'test-password'),
      'password is compared to database value'
    );

    invalidTest.ok(
      set.calledWith('failed_logons', [54321012345]),
      'saves the failed logon'
    );
    invalidTest.ok(save.calledAfter(set), 'data model changes are saved');

    invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
    invalidTest.ok(doneCallback.calledWith(null, false), 'got a false user');
  });

  authTest.test(
    'with invalid password and several previous failed attempts',
    async invalidTest => {
      get.withArgs('email').returns('hello@world');
      get.withArgs('password').returns('test-password');
      get.withArgs('id').returns(57);
      get
        .withArgs('failed_logons')
        .returns([54321012341, 54321012342, 54321012343, 54321012344]);
      get.withArgs('locked_until').returns(0);
      userModel.fetch.resolves({ get, save, set });
      hash.compare.resolves(false);

      process.env.AUTH_LOCK_FAILED_ATTEMPTS_COUNT = 5;
      process.env.AUTH_LOCK_FAILED_ATTEMPTS_DURATION_MINUTES = 30;
      process.env.AUTH_LOCK_FAILED_ATTEMPTS_WINDOW_TIME_MINUTES = 1;
      const clock = sinon.useFakeTimers();
      clock.tick(54321012345);

      await auth(lib.getNonce('user'), 'password', doneCallback);

      clock.restore();

      invalidTest.ok(
        userModel.query.calledOnce,
        'one set of QUERY clauses is added'
      );
      invalidTest.ok(
        userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
        'it is the QUERY we expect'
      );
      invalidTest.ok(
        userModel.fetch.calledOnce,
        'the query is executed one time'
      );

      invalidTest.ok(hash.compare.calledOnce, 'password is compared one time');
      invalidTest.ok(
        hash.compare.calledWith('password', 'test-password'),
        'password is compared to database value'
      );

      invalidTest.ok(
        set.calledWith('failed_logons', [
          54321012341,
          54321012342,
          54321012343,
          54321012344,
          54321012345
        ]),
        'saves the failed logon'
      );
      invalidTest.ok(
        set.calledWith('locked_until', 54321012345 + 1800000),
        'account is marked as locked'
      );
      invalidTest.ok(save.calledAfter(set), 'data model changes are saved');

      invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
      invalidTest.ok(doneCallback.calledWith(null, false), 'got a false user');
    }
  );

  authTest.test(
    'with invalid password and several outdated previous failed attempts',
    async invalidTest => {
      get.withArgs('email').returns('hello@world');
      get.withArgs('password').returns('test-password');
      get.withArgs('id').returns(57);
      get
        .withArgs('failed_logons')
        .returns([44321012341, 44321012342, 44321012343, 44321012344]);
      get.withArgs('locked_until').returns(0);
      userModel.fetch.resolves({ get, save, set });
      hash.compare.resolves(false);

      process.env.AUTH_LOCK_FAILED_ATTEMPTS_COUNT = 5;
      process.env.AUTH_LOCK_FAILED_ATTEMPTS_DURATION_MINUTES = 30;
      process.env.AUTH_LOCK_FAILED_ATTEMPTS_WINDOW_TIME_MINUTES = 1;
      const clock = sinon.useFakeTimers();
      clock.tick(54321012345);

      await auth(lib.getNonce('user'), 'password', doneCallback);

      clock.restore();

      invalidTest.ok(
        userModel.query.calledOnce,
        'one set of QUERY clauses is added'
      );
      invalidTest.ok(
        userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
        'it is the QUERY we expect'
      );
      invalidTest.ok(
        userModel.fetch.calledOnce,
        'the query is executed one time'
      );

      invalidTest.ok(hash.compare.calledOnce, 'password is compared one time');
      invalidTest.ok(
        hash.compare.calledWith('password', 'test-password'),
        'password is compared to database value'
      );

      invalidTest.ok(
        set.calledWith('failed_logons', [54321012345]),
        'saves the failed logon'
      );
      invalidTest.notOk(
        set.calledWith('locked_until'),
        'account is not marked as locked'
      );
      invalidTest.ok(save.calledAfter(set), 'data model changes are saved');

      invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
      invalidTest.ok(doneCallback.calledWith(null, false), 'got a false user');
    }
  );

  authTest.test('with a valid user', async validTest => {
    get.withArgs('email').returns('hello@world');
    get.withArgs('password').returns('test-password');
    get.withArgs('id').returns(57);
    get.withArgs('auth_role').returns('do a barrel role');
    get.withArgs('state_id').returns('liquid');

    const model = {
      activities: sinon.stub().resolves('play fetch'),
      get,
      save,
      set
    };
    userModel.fetch.resolves(model);
    hash.compare.resolves(true);

    await auth(lib.getNonce('user'), 'password', doneCallback);

    validTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    validTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    validTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    validTest.ok(hash.compare.calledOnce, 'password is compared one time');
    validTest.ok(
      hash.compare.calledWith('password', 'test-password'),
      'password is compared to database value'
    );

    validTest.ok(
      set.calledWith('failed_logons', null),
      'failed logon data is reset'
    );
    validTest.ok(set.calledWith('locked_until', null), 'account lock is reset');
    validTest.ok(save.calledAfter(set), 'data model changes are saved');

    validTest.equal(doneCallback.callCount, 1, 'called done callback once');
    validTest.ok(
      doneCallback.calledWith(null, {
        username: 'hello@world',
        id: 57,
        role: 'do a barrel role',
        state: 'liquid',
        activities: 'play fetch',
        model
      }),
      'did not get an error message, did get a user object'
    );
  });
});
