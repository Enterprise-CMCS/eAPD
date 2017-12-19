const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const db = sandbox.stub();
const where = sandbox.stub();
const select = sandbox.stub();

const bcrypt = {
  hashSync: sinon.stub().returns('-- hashed value --')
};

const auth = require('../../auth/authenticate.js')(db, bcrypt);

tap.test('local authentication', (authTest) => {
  const doneCallback = sandbox.spy();
  authTest.beforeEach((done) => {
    sandbox.reset();
    db.returns({ select, where });
    where.returns({ select, where });
    done();
  });

  authTest.test('with a database error', (errorTest) => {
    select.rejects();

    auth('user', 'password', doneCallback)
      .then(() => {
        errorTest.ok(db.calledOnce, 'a single table is queried');
        errorTest.ok(db.calledWith('users'), 'it is the users table');
        errorTest.ok(where.calledOnce, 'one set of WHERE clauses is added');
        errorTest.ok(where.calledWith({ email: 'user', password: sinon.match.string }), 'it is the WHERE we expect');
        errorTest.ok(select.calledOnce, 'the query is executed one time');

        errorTest.equal(doneCallback.callCount, 1, 'called done callback once');
        errorTest.ok(doneCallback.calledWith(sinon.match.truthy), 'got an error message');

        errorTest.done();
      });
  });

  authTest.test('with invalid user', (invalidTest) => {
    select.resolves([]);

    auth('user', 'password', doneCallback)
      .then(() => {
        invalidTest.ok(db.calledOnce, 'a single table is queried');
        invalidTest.ok(db.calledWith('users'), 'it is the users table');
        invalidTest.ok(where.calledOnce, 'one set of WHERE clauses is added');
        invalidTest.ok(where.calledWith({ email: 'user', password: sinon.match.string }), 'it is the WHERE we expect');
        invalidTest.ok(select.calledOnce, 'the query is executed one time');

        invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
        invalidTest.ok(doneCallback.calledWith(sinon.match.truthy), 'got an error message');

        invalidTest.done();
      });
  });

  authTest.test('with a valid user', (validTest) => {
    select.resolves([{
      email: 'hello@world',
      id: 57
    }]);

    auth('user', 'password', doneCallback)
      .then(() => {
        validTest.ok(db.calledOnce, 'a single table is queried');
        validTest.ok(db.calledWith('users'), 'it is the users table');
        validTest.ok(where.calledOnce, 'one set of WHERE clauses is added');
        validTest.ok(where.calledWith({ email: 'user', password: sinon.match.string }), 'it is the WHERE we expect');
        validTest.ok(select.calledOnce, 'the query is executed one time');

        validTest.equal(doneCallback.callCount, 1, 'called done callback once');
        validTest.ok(doneCallback.calledWith(null, { username: 'hello@world', id: 57 }), 'did not get an error message, did get a user object');

        validTest.done();
      });
  });

  authTest.done();
});
