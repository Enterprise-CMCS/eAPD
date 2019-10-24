const tap = require('tap');
const dbMock = require('./dbMock');

const { getStateProfile, updateStateProfile } = require('./states');

tap.test('database wrappers / states', async statesTests => {
  const db = dbMock('states');

  statesTests.beforeEach(async () => {
    dbMock.reset();
  });

  statesTests.test('gets a state profile', async test => {
    db.select.withArgs('medicaid_office').returnsThis();
    db.where.withArgs('id', 'state id').returnsThis();
    db.first.resolves({ medicaid_office: 'this is the stuff' });

    const profile = await getStateProfile('state id', { db });

    test.equal(profile, 'this is the stuff');
  });

  statesTests.test('updates a state profile', async updateTests => {
    [
      ['using a transaction', 'transaction'],
      ['using the database directly', 'db']
    ].map(([name, prop]) =>
      updateTests.test(name, async test => {
        db.where.withArgs('id', 'state id').returnsThis();
        db.update.rejects();
        db.update
          .withArgs({ medicaid_office: 'this is the profile' })
          .resolves();

        test.resolves(
          updateStateProfile('state id', 'this is the profile', {
            [prop]: db
          })
        );
      })
    );
  });
});
