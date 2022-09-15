import { hasBudgetUpdate } from './budget';

describe('hasBudgetUpdate', () => {
  test('no budget updates', () => {});

  test('add year', () => {
    const result = hasBudgetUpdate([
      { op: 'replace', path: '/years', value: ['2022', '2023', '2024'] },
      {
        op: 'add',
        path: '/proposedBudget/incentivePayments/ehAmt/2024',
        value: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      {
        op: 'add',
        path: '/proposedBudget/incentivePayments/ehCt/2024',
        value: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      {
        op: 'add',
        path: '/proposedBudget/incentivePayments/epAmt/2024',
        value: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      {
        op: 'add',
        path: '/proposedBudget/incentivePayments/epCt/2024',
        value: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      {
        op: 'add',
        path: '/activities/0/contractorResources/0/hourly/2024',
        value: { hours: null, rate: null }
      },
      {
        op: 'add',
        path: '/activities/0/contractorResources/0/years/2024',
        value: null
      },
      {
        op: 'add',
        path: '/activities/0/contractorResources/1/hourly/2024',
        value: { hours: null, rate: null }
      },
      {
        op: 'add',
        path: '/activities/0/contractorResources/1/years/2024',
        value: null
      },
      { op: 'add', path: '/activities/0/expenses/0/years/2024', value: null },
      { op: 'add', path: '/activities/0/expenses/1/years/2024', value: null },
      { op: 'add', path: '/activities/0/expenses/2/years/2024', value: null },
      {
        op: 'add',
        path: '/activities/0/statePersonnel/0/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/0/statePersonnel/1/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/0/statePersonnel/2/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/0/statePersonnel/3/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/0/statePersonnel/4/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/0/statePersonnel/5/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/0/statePersonnel/6/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/0/statePersonnel/7/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/0/costAllocation/2024',
        value: { other: 0, ffp: { federal: 0, state: 100 } }
      },
      {
        op: 'add',
        path: '/activities/0/costAllocationNarrative/years/2024',
        value: { otherSources: '' }
      },
      {
        op: 'add',
        path: '/activities/0/quarterlyFFP/2024',
        value: {
          1: { inHouse: 25, contractors: 25, combined: 25 },
          2: { inHouse: 25, contractors: 25, combined: 25 },
          3: { inHouse: 25, contractors: 25, combined: 25 },
          4: { inHouse: 25, contractors: 25, combined: 25 }
        }
      },
      {
        op: 'add',
        path: '/activities/1/contractorResources/0/hourly/2024',
        value: { hours: null, rate: null }
      },
      {
        op: 'add',
        path: '/activities/1/contractorResources/0/years/2024',
        value: null
      },
      {
        op: 'add',
        path: '/activities/1/contractorResources/1/hourly/2024',
        value: { hours: null, rate: null }
      },
      {
        op: 'add',
        path: '/activities/1/contractorResources/1/years/2024',
        value: null
      },
      { op: 'add', path: '/activities/1/expenses/0/years/2024', value: null },
      {
        op: 'add',
        path: '/activities/1/statePersonnel/0/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/1/statePersonnel/1/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/1/statePersonnel/2/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/1/statePersonnel/3/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/1/statePersonnel/4/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/1/statePersonnel/5/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/1/statePersonnel/6/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/1/statePersonnel/7/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/1/costAllocation/2024',
        value: { other: 0, ffp: { federal: 0, state: 100 } }
      },
      {
        op: 'add',
        path: '/activities/1/costAllocationNarrative/years/2024',
        value: { otherSources: '' }
      },
      {
        op: 'add',
        path: '/activities/1/quarterlyFFP/2024',
        value: {
          1: { inHouse: 25, contractors: 25, combined: 25 },
          2: { inHouse: 25, contractors: 25, combined: 25 },
          3: { inHouse: 25, contractors: 25, combined: 25 },
          4: { inHouse: 25, contractors: 25, combined: 25 }
        }
      },
      {
        op: 'add',
        path: '/activities/2/contractorResources/0/hourly/2024',
        value: { hours: null, rate: null }
      },
      {
        op: 'add',
        path: '/activities/2/contractorResources/0/years/2024',
        value: null
      },
      { op: 'add', path: '/activities/2/expenses/0/years/2024', value: null },
      {
        op: 'add',
        path: '/activities/2/statePersonnel/0/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/2/costAllocation/2024',
        value: { other: 0, ffp: { federal: 0, state: 100 } }
      },
      {
        op: 'add',
        path: '/activities/2/costAllocationNarrative/years/2024',
        value: { otherSources: '' }
      },
      {
        op: 'add',
        path: '/activities/2/quarterlyFFP/2024',
        value: {
          1: { inHouse: 25, contractors: 25, combined: 25 },
          2: { inHouse: 25, contractors: 25, combined: 25 },
          3: { inHouse: 25, contractors: 25, combined: 25 },
          4: { inHouse: 25, contractors: 25, combined: 25 }
        }
      },
      {
        op: 'add',
        path: '/activities/3/contractorResources/0/hourly/2024',
        value: { hours: null, rate: null }
      },
      {
        op: 'add',
        path: '/activities/3/contractorResources/0/years/2024',
        value: null
      },
      {
        op: 'add',
        path: '/activities/3/contractorResources/1/hourly/2024',
        value: { hours: null, rate: null }
      },
      {
        op: 'add',
        path: '/activities/3/contractorResources/1/years/2024',
        value: null
      },
      { op: 'add', path: '/activities/3/expenses/0/years/2024', value: null },
      {
        op: 'add',
        path: '/activities/3/statePersonnel/0/years/2024',
        value: { amt: null, perc: null }
      },
      {
        op: 'add',
        path: '/activities/3/costAllocation/2024',
        value: { other: 0, ffp: { federal: 0, state: 100 } }
      },
      {
        op: 'add',
        path: '/activities/3/costAllocationNarrative/years/2024',
        value: { otherSources: '' }
      },
      {
        op: 'add',
        path: '/activities/3/quarterlyFFP/2024',
        value: {
          1: { inHouse: 25, contractors: 25, combined: 25 },
          2: { inHouse: 25, contractors: 25, combined: 25 },
          3: { inHouse: 25, contractors: 25, combined: 25 },
          4: { inHouse: 25, contractors: 25, combined: 25 }
        }
      },
      {
        op: 'add',
        path: '/keyStatePersonnel/keyPersonnel/0/costs/2024',
        value: 0
      },
      {
        op: 'add',
        path: '/keyStatePersonnel/keyPersonnel/0/fte/2024',
        value: 0
      },
      {
        op: 'add',
        path: '/keyStatePersonnel/keyPersonnel/1/costs/2024',
        value: 0
      },
      {
        op: 'add',
        path: '/keyStatePersonnel/keyPersonnel/1/fte/2024',
        value: 0
      }
    ]);
    expect(result).toBeTruthy();
  });

  test('remove year', () => {
    const result = hasBudgetUpdate([
      { op: 'remove', path: '/years/2' },
      { op: 'remove', path: '/proposedBudget/incentivePayments/ehAmt/2024' },
      { op: 'remove', path: '/proposedBudget/incentivePayments/ehCt/2024' },
      { op: 'remove', path: '/proposedBudget/incentivePayments/epAmt/2024' },
      { op: 'remove', path: '/proposedBudget/incentivePayments/epCt/2024' },
      { op: 'remove', path: '/activities/0/contractorResources/0/hourly/2024' },
      { op: 'remove', path: '/activities/0/contractorResources/0/years/2024' },
      { op: 'remove', path: '/activities/0/contractorResources/1/hourly/2024' },
      { op: 'remove', path: '/activities/0/contractorResources/1/years/2024' },
      { op: 'remove', path: '/activities/0/expenses/0/years/2024' },
      { op: 'remove', path: '/activities/0/expenses/1/years/2024' },
      { op: 'remove', path: '/activities/0/expenses/2/years/2024' },
      { op: 'remove', path: '/activities/0/statePersonnel/0/years/2024' },
      { op: 'remove', path: '/activities/0/statePersonnel/1/years/2024' },
      { op: 'remove', path: '/activities/0/statePersonnel/2/years/2024' },
      { op: 'remove', path: '/activities/0/statePersonnel/3/years/2024' },
      { op: 'remove', path: '/activities/0/statePersonnel/4/years/2024' },
      { op: 'remove', path: '/activities/0/statePersonnel/5/years/2024' },
      { op: 'remove', path: '/activities/0/statePersonnel/6/years/2024' },
      { op: 'remove', path: '/activities/0/statePersonnel/7/years/2024' },
      { op: 'remove', path: '/activities/0/costAllocation/2024' },
      {
        op: 'remove',
        path: '/activities/0/costAllocationNarrative/years/2024'
      },
      { op: 'remove', path: '/activities/0/quarterlyFFP/2024' },
      { op: 'remove', path: '/activities/1/contractorResources/0/hourly/2024' },
      { op: 'remove', path: '/activities/1/contractorResources/0/years/2024' },
      { op: 'remove', path: '/activities/1/contractorResources/1/hourly/2024' },
      { op: 'remove', path: '/activities/1/contractorResources/1/years/2024' },
      { op: 'remove', path: '/activities/1/expenses/0/years/2024' },
      { op: 'remove', path: '/activities/1/statePersonnel/0/years/2024' },
      { op: 'remove', path: '/activities/1/statePersonnel/1/years/2024' },
      { op: 'remove', path: '/activities/1/statePersonnel/2/years/2024' },
      { op: 'remove', path: '/activities/1/statePersonnel/3/years/2024' },
      { op: 'remove', path: '/activities/1/statePersonnel/4/years/2024' },
      { op: 'remove', path: '/activities/1/statePersonnel/5/years/2024' },
      { op: 'remove', path: '/activities/1/statePersonnel/6/years/2024' },
      { op: 'remove', path: '/activities/1/statePersonnel/7/years/2024' },
      { op: 'remove', path: '/activities/1/costAllocation/2024' },
      {
        op: 'remove',
        path: '/activities/1/costAllocationNarrative/years/2024'
      },
      { op: 'remove', path: '/activities/1/quarterlyFFP/2024' },
      { op: 'remove', path: '/activities/2/contractorResources/0/hourly/2024' },
      { op: 'remove', path: '/activities/2/contractorResources/0/years/2024' },
      { op: 'remove', path: '/activities/2/expenses/0/years/2024' },
      { op: 'remove', path: '/activities/2/statePersonnel/0/years/2024' },
      { op: 'remove', path: '/activities/2/costAllocation/2024' },
      {
        op: 'remove',
        path: '/activities/2/costAllocationNarrative/years/2024'
      },
      { op: 'remove', path: '/activities/2/quarterlyFFP/2024' },
      { op: 'remove', path: '/activities/3/contractorResources/0/hourly/2024' },
      { op: 'remove', path: '/activities/3/contractorResources/0/years/2024' },
      { op: 'remove', path: '/activities/3/contractorResources/1/hourly/2024' },
      { op: 'remove', path: '/activities/3/contractorResources/1/years/2024' },
      { op: 'remove', path: '/activities/3/expenses/0/years/2024' },
      { op: 'remove', path: '/activities/3/statePersonnel/0/years/2024' },
      { op: 'remove', path: '/activities/3/costAllocation/2024' },
      {
        op: 'remove',
        path: '/activities/3/costAllocationNarrative/years/2024'
      },
      { op: 'remove', path: '/activities/3/quarterlyFFP/2024' },
      { op: 'remove', path: '/keyStatePersonnel/keyPersonnel/0/costs/2024' },
      { op: 'remove', path: '/keyStatePersonnel/keyPersonnel/0/fte/2024' },
      { op: 'remove', path: '/keyStatePersonnel/keyPersonnel/1/costs/2024' },
      { op: 'remove', path: '/keyStatePersonnel/keyPersonnel/1/fte/2024' }
    ]);
    expect(result).toBeTruthy();
  });

  test('add keyPersonnel', () => {
    const result = hasBudgetUpdate([
      {
        op: 'add',
        path: '/keyStatePersonnel/keyPersonnel/-',
        value: {
          costs: { 2022: 0, 2023: 0 },
          email: '',
          expanded: true,
          hasCosts: null,
          isPrimary: false,
          fte: { 2022: 0, 2023: 0 },
          name: '',
          position: '',
          key: 'de477374'
        }
      },
      {
        op: 'replace',
        path: '/keyStatePersonnel/keyPersonnel/2',
        value: {
          costs: { 2022: 50, 2023: 45 },
          email: 'test@email.com',
          expanded: true,
          hasCosts: true,
          isPrimary: false,
          fte: { 2022: 0.5, 2023: 1 },
          name: 'Test User',
          position: 'Tester',
          key: '1a1abbbb'
        }
      }
    ]);
    expect(result).toBeTruthy();
  });

  test('updated keyPersonnel', () => {
    const result = hasBudgetUpdate([
      {
        op: 'replace',
        path: '/keyStatePersonnel/keyPersonnel/2',
        value: {
          costs: { 2022: 50, 2023: 45 },
          email: 'test@email.com',
          expanded: true,
          hasCosts: true,
          isPrimary: false,
          fte: { 2022: 0.75, 2023: 1 },
          name: 'Test User',
          position: 'Tester',
          key: '1a1abbbb'
        }
      }
    ]);
    expect(result).toBeTruthy();
  });

  test('remove keyPersonnel', () => {
    const result = hasBudgetUpdate([
      { op: 'remove', path: '/keyStatePersonnel/keyPersonnel/2' }
    ]);
    expect(result).toBeTruthy();
  });

  test('add activity', () => {
    const result = hasBudgetUpdate([
      {
        op: 'add',
        path: '/activities/-',
        value: {
          alternatives: '',
          contractorResources: [],
          costAllocation: {
            2022: { other: 0, ffp: { federal: 0, state: 100 } },
            2023: { other: 0, ffp: { federal: 0, state: 100 } }
          },
          costAllocationNarrative: {
            methodology: '',
            years: { 2022: { otherSources: '' }, 2023: { otherSources: '' } }
          },
          description: '',
          expenses: [],
          fundingSource: null,
          key: '46857baa',
          name: '',
          plannedEndDate: '',
          plannedStartDate: '',
          outcomes: [],
          schedule: [],
          statePersonnel: [],
          summary: '',
          standardsAndConditions: { doesNotSupport: '', supports: '' },
          quarterlyFFP: {
            2022: {
              1: { inHouse: 25, contractors: 25, combined: 25 },
              2: { inHouse: 25, contractors: 25, combined: 25 },
              3: { inHouse: 25, contractors: 25, combined: 25 },
              4: { inHouse: 25, contractors: 25, combined: 25 }
            },
            2023: {
              1: { inHouse: 25, contractors: 25, combined: 25 },
              2: { inHouse: 25, contractors: 25, combined: 25 },
              3: { inHouse: 25, contractors: 25, combined: 25 },
              4: { inHouse: 25, contractors: 25, combined: 25 }
            }
          },
          years: ['2022', '2023'],
          meta: { expanded: false }
        }
      }
    ]);
    expect(result).toBeTruthy();
  });

  test('remove activity', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('set activity fundingSource', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('updated federal costAllocation', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('updated state costAllocation', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('updated other costAllocation', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('updated inHouse quarterlyFFP', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('updated contractors quarterlyFFP', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('add statePersonnel', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('update statePersonnel', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('remove statePersonnel', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('add expenses', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('update expenses', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('remove expenses', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('add contractorResources', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('update contractorResources', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });

  test('remove contractorResources', () => {
    const result = hasBudgetUpdate();
    expect(result).toBeTruthy();
  });
});
