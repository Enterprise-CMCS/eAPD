const sinon = require('sinon');
const tap = require('tap');
const dbMock = require('./dbMock.test');
const { removeAffiliationsForUser } = require('./cypressUtils');

let db;

tap.test('database wrappers / cypress utils', async utilTests => {
  utilTests.test('affiliations', async affiliationsTests => {
    db = dbMock('auth_affiliations');
    affiliationsTests.beforeEach(async () => {
      dbMock.reset();
    });

    affiliationsTests.test('delete affiliations for a user', async test => {
      db.where.withArgs('user_id', '12345').returnsThis();
      db.delete.resolves(1);

      const getUserFromOkta = sinon.stub().resolves({ id: '12345' });

      const results = await removeAffiliationsForUser({
        username: 'someuser',
        db,
        getUserFromOkta
      });
      test.equal(results, 1);
    });

    affiliationsTests.test(
      'handles error with getting user id to delete affiliation',
      async test => {
        db.where.withArgs('user_id', '12345').returnsThis();
        db.delete.resolves(1);
        const err = { error: 'err0r' };

        const getUserFromOkta = sinon.stub().rejects(err);

        try {
          await removeAffiliationsForUser({
            username: 'someuser',
            db,
            getUserFromOkta
          });
        } catch (e) {
          test.equal(e, err);
        }
      }
    );
  });
});
