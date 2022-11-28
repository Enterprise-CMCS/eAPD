import tap from 'tap';
import dbMock from './dbMock.test';
import { getStateProfile, updateStateProfile } from './states';

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
    updateTests.test(async test => {
      db.where.withArgs('id', 'state id').returnsThis();
      db.update.rejects();
      db.update.withArgs({ medicaid_office: 'this is the profile' }).resolves();

      test.resolves(
        updateStateProfile('state id', 'this is the profile', {
          db
        })
      );
    });
  });
});
