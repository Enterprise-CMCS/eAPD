const tap = require('tap');
const { calculateBudget, APD_TYPE } = require('@cms-eapd/common');

const { setup, teardown } = require('../db/mongodb.js');
const { MMIS, MMISBudget } = require('./index.js');
const { mmis, mmisNoActivities } = require('../seeds/development/apds.js');

let apdId;
let budgetId;

tap.test('Budget model test', async t => {
  t.before(async () => {
    await setup();
  });

  t.beforeEach(async () => {
    const budget = await MMISBudget.create(calculateBudget(mmis));
    // eslint-disable-next-line no-underscore-dangle
    budgetId = budget._id.toString();
    const { _id: apdObjId } = await MMIS.create({
      status: 'draft',
      stateId: 'md',
      ...mmis,
      budget
    });
    apdId = apdObjId.toString();
  });

  t.test('get Budget from MMIS', async test => {
    const found = await MMIS.findOne({ _id: apdId });
    test.ok(!!found.budget, 'Found the Budget that was just added to the APD');
    test.ok(found.apdType === APD_TYPE.MMIS, 'Budget is MMIS'); // eslint-disable-line no-underscore-dangle
    test.equal(found.budget.toString(), budgetId, 'Budget Id was retrieved');
  });

  t.test('get populated Budget from MMIS', async test => {
    const found = await MMIS.findOne({ _id: apdId }).populate('budget');

    test.ok(!!found.budget, 'Found the Budget that was just added to the APD');
    // eslint-disable-next-line no-underscore-dangle
    test.equal(found.budget._id.toString(), budgetId, 'Budget was retrieved');
  });

  t.test('recalculate budget', async test => {
    const newBudget = calculateBudget(mmisNoActivities);

    await MMISBudget.replaceOne({ _id: budgetId }, newBudget, {
      multipleCastError: true,
      runValidators: true
    });
    const updatedBudget = await MMISBudget.findOne({ _id: budgetId }).lean();
    delete updatedBudget._id; // eslint-disable-line no-underscore-dangle
    delete updatedBudget.__t; // eslint-disable-line no-underscore-dangle

    test.same(updatedBudget, newBudget, 'Budget was patched');
  });

  t.afterEach(async () => {
    await MMIS.deleteOne({ _id: apdId });
    await MMISBudget.deleteOne({ _id: budgetId });
  });

  t.teardown(async () => {
    await teardown();
  });
});
