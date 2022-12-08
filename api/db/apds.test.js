const sinon = require('sinon');
const tap = require('tap');
const { APD_TYPE } = require('@cms-eapd/common');
const ObjectId = require('mongoose').Types.ObjectId;
const knex = require('./knex');

const {
  createAPD,
  deleteAPDByID,
  getAllAPDsByState,
  getAllSubmittedAPDs,
  updateAPDReviewStatus,
  getAPDByID,
  getAPDByIDAndState,
  updateAPDDocument,
  adminCheckAPDDocument
} = require('./apds');
const { setup, teardown } = require('./mongodb');
const {
  APD,
  HITECH,
  MMIS,
  Budget,
  HITECHBudget,
  MMISBudget
} = require('../models/index');
const { hitech, mmis } = require('../seeds/development/apds');

const nowDate = Date.UTC(1904, 9, 3, 0, 0, 0, 0);
let clockStub;
let hitechId;
let mmisId;

const deleteAPD = async apdId => {
  const { budget = null } =
    (await APD.findOne({ _id: apdId }, 'budget').lean()) || {};
  await APD.findOneAndDelete({ _id: apdId });
  if (budget) {
    await Budget.findOneAndDelete({ _id: budget });
  }
};

tap.test('database wrappers / apds', { timeout: 900000 }, async apdsTests => {
  apdsTests.before(async () => {
    // Trisha Elric, Edward and Alfonse's mother, dies of complications from
    // a plague, kicking off the Elric brothers' quest for human transmutation.
    clockStub = sinon.stub(Date, 'now').returns(nowDate);
    await setup();

    await Budget.deleteMany();
    await APD.deleteMany();
    await knex('apd_review_status').delete();
  });

  apdsTests.beforeEach(async () => {
    if (hitechId) {
      await deleteAPD(hitechId);
      hitechId = null;
    }
    if (mmisId) {
      await deleteAPD(mmisId);
      mmisId = null;
    }
    hitechId = await createAPD({
      stateId: 'co',
      status: 'draft',
      ...hitech
    });
    mmisId = await createAPD({
      stateId: 'ak',
      status: 'draft',
      ...mmis
    });
  });

  apdsTests.afterEach(async () => {
    await deleteAPD(hitechId);
    await deleteAPD(mmisId);
    apdsTests.end();
  });

  apdsTests.test('creating a HITECH APD', async test => {
    const newId = await createAPD({
      stateId: 'md',
      status: 'draft',
      ...hitech
    });

    test.ok(newId, 'APD was created');
    const apd = await APD.findOne({ _id: newId }, 'apdType budget');
    // eslint-disable-next-line no-underscore-dangle
    test.ok(apd.apdType === APD_TYPE.HITECH, 'APD was found');
    const budget = await Budget.findOne(
      { _id: apd.budget },
      'federalShareByFFYQuarter'
    );
    test.ok(budget?.federalShareByFFYQuarter, 'Budget was found');

    const hitechApd = await HITECH.findOne({ _id: newId }, 'apdType budget');
    // eslint-disable-next-line no-underscore-dangle
    test.ok(hitechApd.apdType === APD_TYPE.HITECH, 'HITECH APD found');
    const hitechBudget = await HITECHBudget.findOne(
      { _id: hitechApd.budget },
      'federalShareByFFYQuarter'
    );
    test.ok(
      hitechBudget?.federalShareByFFYQuarter?.hitAndHie &&
        hitechBudget?.federalShareByFFYQuarter.hitAndHie !== {},
      'HITECH Budget was found'
    );

    const mmisApd = await MMIS.findOne({ _id: newId }, 'apdType budget');
    test.ok(!mmisApd, 'APD is not an MMIS');

    await deleteAPD(newId);
  });

  apdsTests.test('creating a MMIS APD', async test => {
    const newId = await createAPD({
      stateId: 'md',
      status: 'draft',
      ...mmis
    });

    test.ok(newId, 'APD was created');
    const apd = await APD.findOne({ _id: newId }, 'apdType budget');
    // eslint-disable-next-line no-underscore-dangle
    test.ok(apd.apdType === APD_TYPE.MMIS, 'APD was found');
    const budget = await Budget.findOne(
      { _id: apd.budget },
      'federalShareByFFYQuarter'
    );
    test.ok(budget?.federalShareByFFYQuarter, 'Budget was found');

    const mmisApd = await MMIS.findOne({ _id: newId }, 'apdType budget');
    // eslint-disable-next-line no-underscore-dangle
    test.ok(mmisApd.apdType === APD_TYPE.MMIS, 'MMIS APD found');
    const mmisBudget = await MMISBudget.findOne(
      { _id: mmisApd.budget },
      'federalShareByFFYQuarter'
    );
    test.ok(
      !mmisBudget?.federalShareByFFYQuarter?.hitAndHie,
      'MMIS Budget was found'
    );

    const hitechApd = await HITECH.findOne({ _id: newId }, 'apdType budget');
    test.ok(!hitechApd, 'APD is not an HITECH');

    await deleteAPD(newId);
  });

  apdsTests.test('getting all submitted APDs for a state', async test => {
    const coSubmittedId = await createAPD({
      stateId: 'co',
      status: 'submitted',
      ...hitech
    });
    const mnSubmittedId = await createAPD({
      stateId: 'mn',
      status: 'submitted',
      ...mmis
    });
    const mnDraftId = await createAPD({
      stateId: 'mn',
      status: 'draft',
      ...hitech
    });

    const apds = await getAllSubmittedAPDs();

    test.ok(apds.length === 2, '2 APDs were found');
    test.ok(
      // eslint-disable-next-line no-underscore-dangle
      apds.findIndex(item => item._id.toString() === coSubmittedId) > -1,
      'the APD was found'
    );
    test.ok(
      // eslint-disable-next-line no-underscore-dangle
      apds.findIndex(item => item._id.toString() === mnSubmittedId) > -1,
      'the APD was found'
    );
    await deleteAPD(coSubmittedId);
    await deleteAPD(mnSubmittedId);
    await deleteAPD(mnDraftId);
  });

  apdsTests.test(
    'updating APD status',
    { timeout: 300000 },
    async updateApdStatus => {
      updateApdStatus.test('empty status update', async test => {
        const status = await updateAPDReviewStatus();
        test.equal(status.length, 0, 'the empty update was handled');
      });

      updateApdStatus.test(
        'successfully updating the status of an APD',
        async test => {
          const status = await updateAPDReviewStatus({
            updates: [{ apdId: hitechId, newStatus: 'approved' }]
          });

          test.equal(status[0].apdId, hitechId, 'apd Ids match');
          test.equal(status[0].updatedStatus, 'approved');
          test.ok(status[0].success, 'the APD update was successful');
        }
      );

      updateApdStatus.test(
        'successfully updating the status of two APDs',
        async test => {
          const status = await updateAPDReviewStatus({
            updates: [
              { apdId: hitechId, newStatus: 'approved' },
              { apdId: mmisId, newStatus: 'approved' }
            ]
          });
          test.equal(status.length, 2, '2 APDs were updated');
          test.equal(status[0].updatedStatus, 'approved');
          test.equal(status[1].updatedStatus, 'approved');
        }
      );

      updateApdStatus.test('bad apd id error', async test => {
        const status = await updateAPDReviewStatus({
          updates: [{ apdId: 'bad id', newStatus: 'approved' }]
        });
        test.equal(status[0].error, 'APD Id is invalid');
        test.ok(status[0].updatedStatus === undefined);
        test.ok(!status[0].success);
      });

      updateApdStatus.test('apd not found error', async test => {
        const status = await updateAPDReviewStatus({
          updates: [{ apdId: new ObjectId(), newStatus: 'approved' }]
        });
        test.equal(status[0].error, 'No APD found for APD Id');
        test.ok(status[0].updatedStatus === undefined);
        test.ok(!status[0].success);
      });

      updateApdStatus.test('newStatus missing error', async test => {
        const status = await updateAPDReviewStatus({
          updates: [{ apdId: mmisId }]
        });
        test.equal(status[0].error, 'newStatus missing');
        test.ok(status[0].updatedStatus === undefined);
        test.ok(!status[0].success);
      });

      updateApdStatus.test(
        'all error types and successful update',
        async test => {
          const status = await updateAPDReviewStatus({
            updates: [
              { apdId: 'badId', newStatus: 'approved' },
              { apdId: new ObjectId(), newStatus: 'approved' },
              { apdId: hitechId },
              { apdId: mmisId, newStatus: 'approved' }
            ]
          });

          test.equal(status[0].error, 'APD Id is invalid');
          test.ok(status[0].updatedStatus === undefined);
          test.ok(!status[0].success);

          test.equal(status[1].error, 'No APD found for APD Id');
          test.ok(status[1].updatedStatus === undefined);
          test.ok(!status[1].success);

          test.equal(status[2].error, 'newStatus missing');
          test.ok(status[2].updatedStatus === undefined);
          test.ok(!status[2].success);

          test.equal(status[3].apdId, mmisId, 'apd Ids match');
          test.equal(status[3].updatedStatus, 'approved');
          test.ok(status[3].success, 'the APD update was successful');
        }
      );
    }
  );

  apdsTests.test('deleting an APD', async test => {
    const result = await deleteAPDByID(hitechId);
    test.equal(result.n, 1, 'one APD was found');
    test.equal(result.nModified, 1, 'one APD was updated');
    const deleted = await APD.findOne({ _id: hitechId }, 'status');
    test.ok(deleted.status === 'archived', 'APD was deleted');
  });

  apdsTests.test('getting all APDs for a state', async test => {
    const approvedId = await createAPD({
      stateId: 'co',
      status: 'approved',
      ...hitech
    });
    const mnId = await createAPD({
      stateId: 'mn',
      status: 'approved',
      ...mmis
    });

    const apds = await getAllAPDsByState('co');

    test.ok(apds.length === 1, '1 APD was found');
    test.equal(apds[0]._id.toString(), hitechId, 'the APD was found'); // eslint-disable-line no-underscore-dangle
    await deleteAPD(approvedId);
    await deleteAPD(mnId);
  });

  apdsTests.test('getting a single APD by ID', async test => {
    const found = await getAPDByID(mmisId);

    /* eslint-disable no-underscore-dangle */
    test.equal(found._id.toString(), mmisId);
    test.ok(found.apdType === APD_TYPE.MMIS, 'found the right APD type');
    test.ok(!!found.budget, 'Budget was populated');
    test.ok(
      found.budget.__t === `${APD_TYPE.MMIS}Budget`,
      'found the right Budget Type'
    );
  });

  apdsTests.test('getting a single APD by ID for a state', async test => {
    const found = await getAPDByIDAndState(hitechId, 'co');

    /* eslint-disable no-underscore-dangle */
    test.equal(found._id.toString(), hitechId);
    test.ok(found.apdType === APD_TYPE.HITECH, 'found the right APD type');
    test.ok(!!found.budget, 'Budget was populated');
    test.ok(
      found.budget.__t === `${APD_TYPE.HITECH}Budget`,
      'found the right Budget Type'
    );
  });

  apdsTests.test(
    'updating an APD',
    { timeout: 300000 },
    async updateAPDDocumentTests => {
      updateAPDDocumentTests.beforeEach(() => {
        clockStub = sinon.useFakeTimers(nowDate);
      });

      updateAPDDocumentTests.afterEach(async () => {
        clockStub.restore();
      });

      updateAPDDocumentTests.test('with only patch errors', async test => {
        const {
          errors,
          apd: { updatedAt, activities }
        } = await updateAPDDocument({
          id: mmisId,
          stateId: 'ak',
          patch: [
            {
              op: 'replace',
              path: '/activities/0/milestones/0/endDate',
              value: '2021-01-36'
            },
            {
              op: 'replace',
              path: '/activities/0/milestones/1/endDate',
              value: '2022-15-31'
            }
          ]
        });

        test.ok(
          errors['/activities/0/milestones/0/endDate'],
          'found endDate validation error'
        );
        test.ok(
          errors['/activities/0/milestones/1/endDate'],
          'found endDate validation error'
        );
        test.equal(
          activities[0].milestones[0].endDate,
          null,
          'Error in Activity 1, Milestone 1, endDate; it has been set to null'
        );
        test.equal(
          activities[0].milestones[1].endDate,
          null,
          'Error in Activity 1 Milestone 2 endDate; it has been set to null'
        );
        test.equal(
          updatedAt.toJSON(),
          '1904-10-03T00:00:00.000Z',
          'updatedAt was updated'
        );
      });

      updateAPDDocumentTests.test(
        'with patch error and valid patch',
        async test => {
          const {
            errors,
            apd: { updatedAt, activities }
          } = await updateAPDDocument({
            id: mmisId,
            stateId: 'ak',
            patch: [
              {
                op: 'replace',
                path: '/activities/0/milestones/0/endDate',
                value: '2021-01-36'
              },
              {
                op: 'replace',
                path: '/activities/0/milestones/0/milestone',
                value: 'Updated milestone'
              }
            ]
          });

          test.ok(
            errors['/activities/0/milestones/0/endDate'],
            'found endDate validation error'
          );
          test.equal(
            activities[0].milestones[0].endDate,
            null,
            'Error in Activity 1, Milestone 1, endDate; it has been set to null'
          );
          test.equal(
            activities[0].milestones[0].milestone,
            'Updated milestone',
            'Activity 1, Milestone 1, milestone was updated'
          );
          test.equal(
            updatedAt.toJSON(),
            '1904-10-03T00:00:00.000Z',
            'updatedAt was updated'
          );
        }
      );

      updateAPDDocumentTests.test('with a valid patch', async test => {
        const {
          errors,
          apd: {
            updatedAt,
            apdOverview: { programOverview }
          }
        } = await updateAPDDocument({
          id: hitechId,
          stateId: 'co',
          patch: [
            {
              op: 'replace',
              path: `/apdOverview/programOverview`,
              value: 'This is the test of a <a>program overview</a>'
            }
          ]
        });

        test.equal(Object.keys(errors).length, 0, 'no errors');
        test.equal(updatedAt.toJSON(), '1904-10-03T00:00:00.000Z');
        test.equal(
          programOverview,
          'This is the test of a <a>program overview</a>',
          'programOverview was updated'
        );
      });

      updateAPDDocumentTests.test('without a state profile', async test => {
        const {
          errors,
          apd: { updatedAt },
          stateUpdated
        } = await updateAPDDocument({
          id: mmisId,
          stateId: 'ak',
          patch: [
            {
              op: 'replace',
              path: '/activities/0/milestones/1/endDate',
              value: '2022-12-31'
            }
          ]
        });

        test.equal(Object.keys(errors).length, 0, 'no errors');
        test.equal(updatedAt.toJSON(), '1904-10-03T00:00:00.000Z');
        test.notOk(stateUpdated, 'state was not updated');
      });

      updateAPDDocumentTests.test('with a state profile', async test => {
        const updateProfile = sinon.stub();
        updateProfile
          .withArgs('ak', {
            medicaidDirector: {
              name: 'Cornelius Fudge',
              email: 'c.fudge@ministry.magic',
              phone: '5551234567'
            },
            medicaidOffice: {
              address1: '132 Green St',
              address2: '',
              city: 'Cityville',
              state: 'AK',
              zip: '12345'
            },
            years: ['2021', '2022']
          })
          .resolves();

        const {
          errors,
          apd: { updatedAt },
          stateUpdated
        } = await updateAPDDocument(
          {
            id: mmisId,
            stateId: 'ak',
            patch: [
              {
                op: 'replace',
                path: '/keyStatePersonnel/medicaidOffice/address1',
                value: '132 Green St'
              }
            ]
          },
          { updateProfile }
        );

        test.equal(Object.keys(errors).length, 0, 'no errors');
        test.equal(updatedAt.toJSON(), '1904-10-03T00:00:00.000Z');
        test.ok(stateUpdated, 'state was updated');
      });

      updateAPDDocumentTests.test(
        'HITECH with a valid patch that triggers budget update',
        async test => {
          const {
            errors,
            apd: { updatedAt, activities }
          } = await updateAPDDocument({
            id: hitechId,
            stateId: 'co',
            patch: [
              {
                op: 'replace',
                path: '/activities/0/expenses/0/years/2022',
                value: 50000
              }
            ]
          });

          test.equal(Object.keys(errors).length, 0, 'no errors');
          test.equal(updatedAt.toJSON(), '1904-10-03T00:00:00.000Z');
          test.equal(
            activities[0].expenses[0].years['2022'],
            50000,
            'expense coast was updated'
          );
        }
      );

      updateAPDDocumentTests.test(
        'MMIS with a valid patch that triggers budget update',
        async test => {
          const {
            errors,
            apd: { updatedAt, activities }
          } = await updateAPDDocument({
            id: mmisId,
            stateId: 'ak',
            patch: [
              {
                op: 'replace',
                path: '/activities/0/expenses/0/years/2022',
                value: 50000
              }
            ]
          });

          test.equal(Object.keys(errors).length, 0, 'no errors');
          test.equal(updatedAt.toJSON(), '1904-10-03T00:00:00.000Z');
          test.equal(
            activities[0].expenses[0].years['2022'],
            50000,
            'expense coast was updated'
          );
        }
      );
    }
  );

  apdsTests.test(
    'validating an APD for admin check',
    async adminCheckAPDTest => {
      adminCheckAPDTest.test('when no errors are expected', async test => {
        const errors = await adminCheckAPDDocument(hitechId);
        test.same(errors, []);
      });
    }
  );

  apdsTests.teardown(async () => {
    await Budget.deleteMany();
    await APD.deleteMany();
    await knex('apd_review_status').delete();

    await teardown();
    await knex.destroy();
    clockStub.restore();
  });
});
