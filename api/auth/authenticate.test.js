const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const db = sandbox.stub();
const where = sandbox.stub();
const first = sandbox.stub();

const bcrypt = {
  compareSync: sandbox.stub()
};

const auth = require('./authenticate.js')(db, bcrypt);

tap.test('local authentication', authTest => {
  const doneCallback = sandbox.spy();
  authTest.beforeEach(done => {
    sandbox.reset();
    db.returns({ first, where });
    where.returns({ first, where });
    done();
  });

  authTest.test('with a database error', errorTest => {
    first.rejects();

    auth('user', 'password', doneCallback).then(() => {
      errorTest.ok(db.calledOnce, 'a single table is queried');
      errorTest.ok(db.calledWith('users'), 'it is the users table');
      errorTest.ok(where.calledOnce, 'one set of WHERE clauses is added');
      errorTest.ok(
        where.calledWith({ email: 'user' }),
        'it is the WHERE we expect'
      );
      errorTest.ok(first.calledOnce, 'the query is executed one time');

      errorTest.ok(bcrypt.compareSync.notCalled, 'does not compare passwords');

      errorTest.equal(doneCallback.callCount, 1, 'called done callback once');
      errorTest.ok(
        doneCallback.calledWith(sinon.match.truthy),
        'got an error message'
      );

      errorTest.done();
    });
  });

  authTest.test('with no valid users', noUserTest => {
    first.resolves();

    auth('user', 'password', doneCallback).then(() => {
      noUserTest.ok(db.calledOnce, 'a single table is queried');
      noUserTest.ok(db.calledWith('users'), 'it is the users table');
      noUserTest.ok(where.calledOnce, 'one set of WHERE clauses is added');
      noUserTest.ok(
        where.calledWith({ email: 'user' }),
        'it is the WHERE we expect'
      );
      noUserTest.ok(first.calledOnce, 'the query is executed one time');

      noUserTest.ok(bcrypt.compareSync.notCalled, 'does not compare password');

      noUserTest.equal(doneCallback.callCount, 1, 'called done callback once');
      noUserTest.ok(doneCallback.calledWith(null, false), 'got a false user');

      noUserTest.done();
    });
  });

  authTest.test('with invalid password', invalidTest => {
    first.resolves({
      email: 'hello@world',
      password: 'test-password',
      id: 57
    });
    bcrypt.compareSync.returns(false);

    auth('user', 'password', doneCallback).then(() => {
      invalidTest.ok(db.calledOnce, 'a single table is queried');
      invalidTest.ok(db.calledWith('users'), 'it is the users table');
      invalidTest.ok(where.calledOnce, 'one set of WHERE clauses is added');
      invalidTest.ok(
        where.calledWith({ email: 'user' }),
        'it is the WHERE we expect'
      );
      invalidTest.ok(first.calledOnce, 'the query is executed one time');

      invalidTest.ok(
        bcrypt.compareSync.calledOnce,
        'password is compared one time'
      );
      invalidTest.ok(
        bcrypt.compareSync.calledWith('password', 'test-password'),
        'password is compared to database value'
      );

      invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
      invalidTest.ok(doneCallback.calledWith(null, false), 'got a false user');

      invalidTest.done();
    });
  });

  authTest.test('with a valid user', validTest => {
    first.resolves({
      email: 'hello@world',
      password: 'test-password',
      id: 57
    });
    bcrypt.compareSync.returns(true);

    auth('user', 'password', doneCallback).then(() => {
      validTest.ok(db.calledOnce, 'a single table is queried');
      validTest.ok(db.calledWith('users'), 'it is the users table');
      validTest.ok(where.calledOnce, 'one set of WHERE clauses is added');
      validTest.ok(
        where.calledWith({ email: 'user' }),
        'it is the WHERE we expect'
      );
      validTest.ok(first.calledOnce, 'the query is executed one time');

      validTest.ok(
        bcrypt.compareSync.calledOnce,
        'password is compared one time'
      );
      validTest.ok(
        bcrypt.compareSync.calledWith('password', 'test-password'),
        'password is compared to database value'
      );

      validTest.equal(doneCallback.callCount, 1, 'called done callback once');
      validTest.ok(
        doneCallback.calledWith(null, { username: 'hello@world', id: 57 }),
        'did not get an error message, did get a user object'
      );

      validTest.done();
    });
  });

  authTest.done();
});
