const tap = require('tap');

const index = require('./index');

tap.test('activity model index', async activityIndexTests => {
  activityIndexTests.type(index, 'function', 'exports a function');

  const out = index();

  activityIndexTests.same(
    Object.keys(out),
    [
      'apdActivity',
      'apdActivityContractorResource',
      'apdActivityContractorResourceCost',
      'apdActivityCostAllocation',
      'apdActivityExpense',
      'apdActivityExpenseEntry',
      'apdActivityGoal',
      'apdActivitySchedule',
      'apdActivityStatePersonnel',
      'apdActivityStatePersonnelCost',
      'apdActivityQuarterlyFFP'
    ],
    'exports the expected models'
  );
});
