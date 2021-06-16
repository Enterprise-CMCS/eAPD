const sinon = require('sinon');
const tap = require('tap');

const dbMock = require('./dbMock.test');
const mongo = require('./mongodb');
const {
  apd: { document }
} = require('../seeds/development/apds');

const {
  createAPD,
  deleteAPD, // temporarily delete
  deleteAPDByID,
  getAllAPDsByState,
  getAPDByID,
  getAPDByIDAndState,
  updateAPDDocument
} = require('./apds');

const nowDate = Date.UTC(1904, 9, 3, 0, 0, 0, 0);
let db;
let clock;
let clockStub;
let id;

tap.test('database wrappers / apds', async apdsTests => {
  apdsTests.before(async () => {
    id = null;
    // Trisha Elric, Edward and Alfonse's mother, dies of complications from
    // a plague, kicking off the Elric brothers' quest for human transmutation.
    clockStub = sinon.stub(Date, 'now').returns(nowDate);
    db = dbMock('apds');
    await mongo.setup();
  });

  apdsTests.beforeEach(async () => {
    dbMock.reset();
  });

  apdsTests.test('creating an APD', async test => {
    id = await createAPD({
      stateId: 'md',
      status: 'draft',
      ...document
    });
    test.ok(id, 'APD was created');
  });

  apdsTests.test('deleting an APD', async test => {
    db.where.withArgs('id', 'apd id').returnsThis();
    db.update.withArgs({ status: 'archived' }).resolves();

    test.resolves(deleteAPDByID('apd id', { db }));
  });

  apdsTests.test('getting all APDs for a state', async test => {
    db.where.withArgs('state_id', 'state id').returnsThis();
    db.select
      .withArgs(
        'created_at',
        'document',
        'id',
        'state_id',
        'status',
        'updated_at'
      )
      .resolves('some apds');

    const apds = await getAllAPDsByState('state id', { db });

    test.equal(apds, 'some apds');
  });

  apdsTests.test('getting a single APD by ID', async test => {
    db.where.withArgs('id', 'apd id').returnsThis();
    db.first
      .withArgs(
        'created_at',
        'document',
        'id',
        'state_id',
        'status',
        'updated_at'
      )
      .resolves('an apd');

    const apds = await getAPDByID('apd id', { db });

    test.equal(apds, 'an apd');
  });

  apdsTests.test('getting a single APD by ID for a state', async test => {
    db.where.withArgs('id', 'apd id').returnsThis();
    db.andWhere.withArgs('state_id', 'state id').returnsThis();
    db.first
      .withArgs(
        'created_at',
        'document',
        'id',
        'state_id',
        'status',
        'updated_at'
      )
      .resolves('an apd');

    const apds = await getAPDByIDAndState('apd id', 'state id', { db });

    test.equal(apds, 'an apd');
  });

  apdsTests.test('updating an APD', async updateAPDDocumentTests => {
    updateAPDDocumentTests.beforeEach(() => {
      clock = sinon.useFakeTimers(nowDate);
    });

    updateAPDDocumentTests.test('without a state profile', async test => {
      db.where.withArgs('id', 'apd id').returnsThis();
      db.update.rejects();
      db.update
        .withArgs({
          document: 'apd document',
          updated_at: '1904-10-03T00:00:00.000Z'
        })
        .resolves();

      const updateDate = await updateAPDDocument(
        'apd id',
        'state id',
        'apd document',
        { db }
      );

      test.equal(updateDate, '1904-10-03T00:00:00.000Z');
    });

    updateAPDDocumentTests.test('with a state profile', async test => {
      db.where.withArgs('id', 'apd id').returnsThis();
      db.update.rejects();
      db.update
        .withArgs({
          document: { bob: 'builder', stateProfile: 'state profile' },
          updated_at: '1904-10-03T00:00:00.000Z'
        })
        .resolves();

      const updateProfile = sinon.stub();
      updateProfile.withArgs('state id', 'state profile', db).resolves();

      const updateDate = await updateAPDDocument(
        'apd id',
        'state id',
        { bob: 'builder', stateProfile: 'state profile' },
        { db, updateProfile }
      );

      test.equal(updateDate, '1904-10-03T00:00:00.000Z');
    });
  });

  apdsTests.afterEach(async () => {
    if (id) {
      await deleteAPD(id);
    }
  });

  apdsTests.teardown(async () => {
    await mongo.teardown();
    clock.restore();
    clockStub.restore();
  });
});
