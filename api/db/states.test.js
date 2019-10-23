const sinon = require('sinon');
const tap = require('tap');

const { getStateProfile, updateStateProfile } = require('./states');

tap.test('database wrappers / states', async statesTests => {
  statesTests.test('gets a state profile', async test => {
    const queryBuilder = {
      select: sinon
        .stub()
        .withArgs('medicaid_office')
        .returnsThis(),

      where: sinon
        .stub()
        .withArgs('id', 'state id')
        .returnsThis(),

      first: sinon.stub().resolves({ medicaid_office: 'this is the stuff' })
    };
    const db = sinon
      .stub()
      .withArgs('states')
      .returns(queryBuilder);

    const profile = await getStateProfile('state id', { db });

    test.equal(profile, 'this is the stuff');
  });

  statesTests.test('updates a state profile', async updateTests => {
    [
      ['using a transaction', 'transaction'],
      ['using the database directly', 'db']
    ].map(([name, prop]) =>
      updateTests.test(name, async test => {
        const queryBuilder = {
          where: sinon.stub(),
          update: sinon.stub()
        };

        queryBuilder.where.withArgs('id', 'state id').returnsThis();
        queryBuilder.update.rejects();
        queryBuilder.update
          .withArgs({ medicaid_office: 'this is the profile' })
          .resolves();

        const db = sinon.stub().returns(queryBuilder);

        test.resolves(
          updateStateProfile('state id', 'this is the profile', {
            [prop]: db
          })
        );
      })
    );
  });
});
