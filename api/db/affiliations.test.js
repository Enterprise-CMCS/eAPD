const sinon = require('sinon');
const tap = require('tap');
const dbMock = require('./dbMock.test');
const {
  selectedColumns,
  getAllAffiliations,
  getAffiliationsByStateId,
  getAffiliationById,
  getPopulatedAffiliationsByStateId,
  getAllPopulatedAffiliations,
  reduceAffiliations,
} = require('./affiliations');

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
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
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
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
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
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
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
        .returnsThis()
      db.leftJoin
        .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
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
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
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

  affiliationsTests.test(
    'get populated affiliations by state id',
    async test => {
      const status = 'irrelevant';
      const affiliations = ['foo', 'bar', 'baz'];

      const getAffiliationsByStateStub = sinon.stub();
      getAffiliationsByStateStub
        .withArgs({ stateId, status })
        .resolves(affiliations);

      const results = await getPopulatedAffiliationsByStateId({
        stateId,
        status,
        getAffiliationsByStateId_: getAffiliationsByStateStub
      });
      test.same(results, affiliations);
    }
  );

  affiliationsTests.test(
    'get populated affiliations by state id with no results',
    async test => {
      const status = 'irrelevant';

      const getAffiliationsByStateStub = sinon.stub();
      getAffiliationsByStateStub.withArgs({ stateId, status }).resolves([]);
      const results = await getPopulatedAffiliationsByStateId({
        stateId,
        status,
        getAffiliationsByStateId_: getAffiliationsByStateStub
      });
      test.same(results, []);

    }
  );

  affiliationsTests.test('get all Affiliations', async test => {
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
      .returnsThis();
    db.select.withArgs(selectedColumns).resolves(expectedUsers);

    const results = await getAllAffiliations({ db });
    test.equal(expectedUsers, results);
  });

  affiliationsTests.test('get all active Affiliations', async test => {
    const status = 'active'
    db.leftJoin
      .withArgs('auth_roles', 'auth_affiliations.role_id', 'auth_roles.id')
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
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
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
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
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
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
      .returnsThis()
    db.leftJoin
      .withArgs('okta_users', 'auth_affiliations.user_id', 'okta_users.user_id')
      .returnsThis();
    db.select.withArgs(selectedColumns).returnsThis();

    const results = await getAllAffiliations({status, db });
    test.same([], results);

  });

  affiliationsTests.test('reduces affiliations with no duplicates', async test => {
    const affiliations = []
    const expectedResults = []
    for(let i=1; i<5; i+=1){
      const user = {...defaultPopulatedAffiliation}
      user.userId = i
      affiliations.push(user)
      const stateAffiliation = {role: user.role, stateId: user.stateId, status: user.status}
      const result = {... user}
      result.affiliations = [stateAffiliation]
      expectedResults.push(result)
    }
    const results = reduceAffiliations(affiliations)
    test.same(Object.values(results), expectedResults)

  });

  affiliationsTests.test('reduces affiliations with duplicate affiliations', async test => {
    const affiliations = []
    const expectedResults = []
    for(let i=1; i<5; i+=1){
      const user = {...defaultPopulatedAffiliation}
      user.userId = i
      affiliations.push(user)
      affiliations.push(user)
      affiliations.push(user)
      const stateAffiliation = {role: user.role, stateId: user.stateId, status: user.status}
      const result = {... user}
      result.affiliations = [stateAffiliation, stateAffiliation, stateAffiliation]
      expectedResults.push(result)
    }
    const results = reduceAffiliations(affiliations)
    test.same(Object.values(results), expectedResults)

  });

  affiliationsTests.test(
    'get populated affiliations for all states',
    async test => {
      const status = 'irrelevant';
      const affiliations = ['foo', 'bar', 'baz'];

      const getAllAffiliationsStub = sinon.stub();
      getAllAffiliationsStub
        .withArgs({ status, db })
        .resolves(affiliations);

      const reduceAffiliationsStub = sinon.stub()
      reduceAffiliationsStub.withArgs(affiliations).returns(affiliations)

      const results = await getAllPopulatedAffiliations({
        status,
        db,
        getAllAffiliations_: getAllAffiliationsStub,
        reduceAffiliations_: reduceAffiliationsStub,
      });

      test.same(results, affiliations);
      test.equal(getAllAffiliationsStub.callCount, 1)
      test.equal(reduceAffiliationsStub.callCount, 1)

    }
  );

});
