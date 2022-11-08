const tap = require('tap');
const { calculateBudget, APD_TYPE } = require('@cms-eapd/common');

const { setup, teardown } = require('../db/mongodb');
const { HITECH, HITECHBudget } = require('./index');
const { hitech, hitechNoActivities } = require('../seeds/development/apds');

let apdId;
let budgetId;

tap.test('Budget model test', async t => {
  t.before(async () => {
    await setup();
  });

  t.beforeEach(async () => {
    const budget = await HITECHBudget.create(calculateBudget(hitech));
    // eslint-disable-next-line no-underscore-dangle
    budgetId = budget._id.toString();
    const { _id: apdObjId } = await HITECH.create({
      status: 'draft',
      stateId: 'md',
      ...hitech,
      budget
    });
    apdId = apdObjId.toString();
  });

  t.test('get Budget from HITECH', async test => {
    const found = await HITECH.findOne({ _id: apdId });
    test.ok(!!found.budget, 'Found the Budget that was just added to the APD');
    test.ok(found.__t === APD_TYPE.HITECH, 'Budget is HITECH'); // eslint-disable-line no-underscore-dangle
    test.equal(found.budget.toString(), budgetId, 'Budget Id was retrieved');
  });

  t.test('get populated Budget from HITECH', async test => {
    const found = await HITECH.findOne({ _id: apdId }).populate('budget');

    test.ok(!!found.budget, 'Found the Budget that was just added to the APD');
    // eslint-disable-next-line no-underscore-dangle
    test.equal(found.budget._id.toString(), budgetId, 'Budget was retrieved');
  });

  t.test('recalculate budget', async test => {
    const newBudget = calculateBudget(hitechNoActivities);

    await HITECHBudget.replaceOne({ _id: budgetId }, newBudget, {
      multipleCastError: true,
      runValidators: true
    });
    const updatedBudget = await HITECHBudget.findOne({ _id: budgetId }).lean();
    delete updatedBudget._id; // eslint-disable-line no-underscore-dangle
    delete updatedBudget.__t; // eslint-disable-line no-underscore-dangle

    test.same(updatedBudget, newBudget, 'Budget was patched');
  });

  t.afterEach(async () => {
    await HITECH.deleteOne({ _id: apdId });
    await HITECHBudget.deleteOne({ _id: budgetId });
  });

  t.teardown(async () => {
    await teardown();
  });
});
