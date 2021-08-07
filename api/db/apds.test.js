const sinon = require('sinon');
const tap = require('tap');
const mongoose = require('mongoose');

const dbMock = require('./dbMock.test');
const mongo = require('./mongodb');
const { apd } = require('../seeds/development/apds');

const {
  createAPD,
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

let APD;

tap.test('database wrappers / apds', async apdsTests => {
  apdsTests.before(async () => {
    id = null;
    // Trisha Elric, Edward and Alfonse's mother, dies of complications from
    // a plague, kicking off the Elric brothers' quest for human transmutation.
    clockStub = sinon.stub(Date, 'now').returns(nowDate);
    db = dbMock('apds');
    await mongo.setup();
    APD = mongoose.model('APD');
  });
  const deleteAPD = async apdId => APD.deleteOne({ _id: apdId });

  apdsTests.beforeEach(async () => {
    dbMock.reset();
    if (id) {
      await deleteAPD(id);
    }
    id = await createAPD(
      {
        stateId: 'co',
        status: 'draft',
        ...apd
      },
      { APD }
    );
  });

  apdsTests.test('creating an APD', async test => {
    const newId = await createAPD(
      {
        stateId: 'md',
        status: 'draft',
        ...apd
      },
      { APD }
    );
    test.ok(newId, 'APD was created');
    await deleteAPD(newId);
  });

  apdsTests.test('deleting an APD', async test => {
    const result = await deleteAPDByID(id, { APD });
    test.equal(result.n, 1, 'one APD was found');
    test.equal(result.nModified, 1, 'one APD was updated');
  });

  apdsTests.test('getting all APDs for a state', async test => {
    const approvedId = await createAPD(
      {
        stateId: 'co',
        status: 'approved',
        ...apd
      },
      { APD }
    );
    const mnId = await createAPD(
      {
        stateId: 'mn',
        status: 'approved',
        ...apd
      },
      { APD }
    );

    const apds = await getAllAPDsByState('co', { APD });

    test.ok(apds.length === 1, '1 APD was found');
    test.equal(apds[0]._id.toString(), id, 'the APD was found'); // eslint-disable-line no-underscore-dangle
    await deleteAPD(approvedId);
    await deleteAPD(mnId);
  });

  apdsTests.test('getting a single APD by ID', async test => {
    const found = await getAPDByID(id, { APD });

    test.equal(found._id.toString(), id); // eslint-disable-line no-underscore-dangle
  });

  apdsTests.test('getting a single APD by ID for a state', async test => {
    const found = await getAPDByIDAndState(id, 'co', { APD });

    test.equal(found._id.toString(), id); // eslint-disable-line no-underscore-dangle
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

  apdsTests.teardown(async () => {
    if (id) {
      await deleteAPD(id);
    }
    await mongo.teardown();
    clock.restore();
    clockStub.restore();
  });
});
