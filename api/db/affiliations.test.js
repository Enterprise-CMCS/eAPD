const sinon = require('sinon');
const tap = require('tap');
const dbMock = require('./dbMock.test');
const {
  selectedColumns,
  getAllAffiliations,
  getAffiliationsByStateId,
  getAffiliationById,
  populateAffiliation,
  getPopulatedAffiliationsByStateId
} = require('./affiliations');

const { oktaClient } = require('../auth/oktaAuth');

const defaultProfile = {
  displayName: 'displayName',
  email: 'email',
  secondEmail: 'secondEmail',
  primaryPhone: 'primaryPhone',
  mobilePhone: 'mobilePhone'
};

const defaultPopulatedAffiliation = {
  userId: 'userId',
  updatedBy: null,
  displayName: 'displayName',
  email: 'email',
  secondEmail: 'secondEmail',
  primaryPhone: 'primaryPhone',
  mobilePhone: 'mobilePhone'
};

tap.test('database wrappers / affiliations', async affiliationsTests => {
  // Water. Earth. Fire. Air. Long ago, the four nations lived together in harmony.
  // Then, everything changed when the Fire Nation attacked.
  sinon.useFakeTimers(Date.UTC(1904, 9, 3, 0, 0, 0, 0));
  const db = dbMock('auth_affiliations');
  const expectedUsers = [{ foo: 'foo' }, { foo: 'bar' }];
  const stateId = 'BC';

  affiliationsTests.beforeEach(async () => {
    dbMock.reset();
  });

  affiliationsTests.test('get affiliations by state id', async test => {
    db.select.withArgs(selectedColumns).returnsThis();
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.where.withArgs({ state_id: stateId }).resolves(expectedUsers);

    // No specific status
    const results = await getAffiliationsByStateId({ stateId, db });
    test.equal(expectedUsers, results);
  });

  affiliationsTests.test('get pending affiliations by state id', async test => {
    const status = 'pending';
    db.select.withArgs(selectedColumns).returnsThis();
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.where
      .withArgs({ state_id: stateId, status: 'requested' })
      .resolves(expectedUsers);

    const results = await getAffiliationsByStateId({ stateId, status, db });
    test.equal(expectedUsers, results);
  });

  affiliationsTests.test('get active affiliations by state id', async test => {
    const status = 'active';
    db.select.withArgs(selectedColumns).returnsThis();
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.where
      .withArgs({ state_id: stateId, status: 'approved' })
      .resolves(expectedUsers);

    const results = await getAffiliationsByStateId({ stateId, status, db });
    test.equal(expectedUsers, results);
  });

  affiliationsTests.test(
    'get inactive affiliations by state id',
    async test => {
      const status = 'inactive';
      db.select.withArgs(selectedColumns).returnsThis();
      db.leftJoin
        .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
        .returnsThis();
      db.whereIn
        .withArgs(
          ['state_id', 'status'],
          [
            [stateId, 'denied'],
            [stateId, 'revoked']
          ]
        )
        .resolves(expectedUsers);

      const results = await getAffiliationsByStateId({ stateId, status, db });
      test.equal(expectedUsers, results);
    }
  );

  affiliationsTests.test('get affiliations by id', async test => {
    const affiliationId = 'foo';
    db.select.withArgs(selectedColumns).returnsThis();
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.where
      .withArgs({
        'auth_affiliations.state_id': stateId,
        'auth_affiliations.id': affiliationId
      })
      .returnsThis();
    db.first.resolves(expectedUsers[0]);

    const results = await getAffiliationById({ stateId, affiliationId, db });
    test.equal(expectedUsers[0], results);
  });

  affiliationsTests.test('populate affiliations', async test => {
    const affiliation = { userId: 'userId', updatedById: 'updatedById' };

    const getUserStub = sinon.stub(oktaClient, 'getUser');
    getUserStub
      .withArgs(affiliation.userId)
      .resolves({ profile: defaultProfile });
    getUserStub
      .withArgs(affiliation.updatedById)
      .resolves({ profile: { displayName: 'updatedByName' } });
    const results = await populateAffiliation(affiliation, {
      client: oktaClient
    });
    test.same(results, {
      ...defaultPopulatedAffiliation,
      updatedById: 'updatedById',
      updatedBy: 'updatedByName'
    });

    // restore the okta client for the next test
    oktaClient.getUser.restore();
  });

  affiliationsTests.test(
    'populate affiliations with no updatedBy',
    async test => {
      const affiliation = { userId: 'userId' };

      const getUserStub = sinon.stub(oktaClient, 'getUser');
      getUserStub
        .withArgs(affiliation.userId)
        .returns({ profile: defaultProfile });

      const results = await populateAffiliation(affiliation, {
        client: oktaClient
      });
      test.same(results, defaultPopulatedAffiliation);

      // restore the okta client for the next test
      oktaClient.getUser.restore();
    }
  );

  affiliationsTests.test(
    'get populated affiliations by state id',
    async test => {
      const status = 'irrelevant';
      const affiliations = ['foo', 'bar', 'baz'];
      const populatedAffiliations = [
        'populatedfoo',
        'populatedbar',
        'populatedbaz'
      ];

      const getAffiliationsByStateStub = sinon.stub();
      getAffiliationsByStateStub
        .withArgs({ stateId, status })
        .resolves(affiliations);

      const populateAffiliationStub = sinon.stub();
      affiliations.forEach(affiliation => {
        populateAffiliationStub
          .withArgs(affiliation)
          .returns(`populated${affiliation}`);
      });

      const results = await getPopulatedAffiliationsByStateId({
        stateId,
        status,
        getAffiliationsByStateId_: getAffiliationsByStateStub,
        populateAffiliation_: populateAffiliationStub
      });
      test.same(results, populatedAffiliations);
    }
  );

  affiliationsTests.test(
    'get populated affiliations by state id with no results',
    async test => {
      const status = 'irrelevant';

      const getAffiliationsByStateStub = sinon.stub();
      getAffiliationsByStateStub.withArgs({ stateId, status }).resolves([]);
      // This should not get called
      const populateAffiliationStub = sinon.stub();

      const results = await getPopulatedAffiliationsByStateId({
        stateId,
        status,
        getAffiliationsByStateId_: getAffiliationsByStateStub,
        populateAffiliation_: populateAffiliationStub
      });
      test.same(results, []);

      sinon.assert.notCalled(populateAffiliationStub);
    }
  );

  affiliationsTests.test('get all Affiliations', async test => {
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.select.withArgs(selectedColumns).resolves(expectedUsers);

    const results = await getAllAffiliations({ db });
    test.equal(expectedUsers, results);
  });

  affiliationsTests.test('get all active Affiliations', async test => {
    const status = 'active'
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.select.withArgs(selectedColumns).returnsThis();
    db.whereIn
      .withArgs(
        'status',
        ['approved']
      ).resolves(expectedUsers);

    const results = await getAllAffiliations({status, db });
    test.equal(expectedUsers, results);
  });

  affiliationsTests.test('get all pending Affiliations', async test => {
    const status = 'pending'
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.select.withArgs(selectedColumns).returnsThis();
    db.whereIn
      .withArgs(
        'status',
        ['requested']
      ).resolves(expectedUsers)

    const results = await getAllAffiliations({status, db });
    test.equal(expectedUsers, results);
  });

  affiliationsTests.test('get all inactive Affiliations', async test => {
    const status = 'inactive'
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.select.withArgs(selectedColumns).returnsThis();
    db.whereIn
      .withArgs(
        'status',
        ['denied', 'revoked']
      ).resolves(expectedUsers);

    const results = await getAllAffiliations({status, db });
    test.equal(expectedUsers, results);
  });

  affiliationsTests.test('get error with invalid Affiliations', async test => {
    const status = 'NOTVALID'
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis();
    db.select.withArgs(selectedColumns).returnsThis();

    const results = await getAllAffiliations({status, db });
    test.same([], results);

  });
});
