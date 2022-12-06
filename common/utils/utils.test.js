import {
  generateKey,
  hasBudgetUpdate,
  defaultAPDYearOptions,
  thisFFY,
  defaultAPDYears,
  forAllYears
} from './utils';

describe('utility functions', () => {
  test('generates a key', () => {
    // Letters are only 37.5% of hex digits, so running this test a lot makes
    // it statistically very unlikely that we'd just happen to only generate
    // keys that start with a letter
    for (let i = 0; i < 50000; i += 1) {
      const key = generateKey();
      expect(key).toEqual(expect.stringMatching(/^[a-f0-9]{8}$/));
      expect(key).toEqual(expect.stringMatching(/[a-f]/));
    }
  });

  describe('hasBudgetUpdate', () => {
    test('no budget updates', () => {
      const result = hasBudgetUpdate([
        {
          op: 'add',
          path: '/activities/0/outcomes/-',
          value: { key: '32a3af97', outcome: '', metrics: [] }
        },
        {
          op: 'replace',
          path: '/activities/0/outcomes/2',
          value: { key: '625edcc0', outcome: 'asdfasd', metrics: [] }
        }
      ]);
      expect(result).toBeFalsy();
    });

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
        {
          op: 'remove',
          path: '/activities/0/contractorResources/0/hourly/2024'
        },
        {
          op: 'remove',
          path: '/activities/0/contractorResources/0/years/2024'
        },
        {
          op: 'remove',
          path: '/activities/0/contractorResources/1/hourly/2024'
        },
        {
          op: 'remove',
          path: '/activities/0/contractorResources/1/years/2024'
        },
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
        {
          op: 'remove',
          path: '/activities/1/contractorResources/0/hourly/2024'
        },
        {
          op: 'remove',
          path: '/activities/1/contractorResources/0/years/2024'
        },
        {
          op: 'remove',
          path: '/activities/1/contractorResources/1/hourly/2024'
        },
        {
          op: 'remove',
          path: '/activities/1/contractorResources/1/years/2024'
        },
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
        {
          op: 'remove',
          path: '/activities/2/contractorResources/0/hourly/2024'
        },
        {
          op: 'remove',
          path: '/activities/2/contractorResources/0/years/2024'
        },
        { op: 'remove', path: '/activities/2/expenses/0/years/2024' },
        { op: 'remove', path: '/activities/2/statePersonnel/0/years/2024' },
        { op: 'remove', path: '/activities/2/costAllocation/2024' },
        {
          op: 'remove',
          path: '/activities/2/costAllocationNarrative/years/2024'
        },
        { op: 'remove', path: '/activities/2/quarterlyFFP/2024' },
        {
          op: 'remove',
          path: '/activities/3/contractorResources/0/hourly/2024'
        },
        {
          op: 'remove',
          path: '/activities/3/contractorResources/0/years/2024'
        },
        {
          op: 'remove',
          path: '/activities/3/contractorResources/1/hourly/2024'
        },
        {
          op: 'remove',
          path: '/activities/3/contractorResources/1/years/2024'
        },
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
      const result = hasBudgetUpdate([{ op: 'remove', path: '/activities/0' }]);
      expect(result).toBeTruthy();
    });

    test('set activity fundingSource', () => {
      const result = hasBudgetUpdate([
        { op: 'replace', path: '/activities/0/fundingSource', value: 'HIE' }
      ]);
      expect(result).toBeTruthy();
    });

    test('updated federal and state costAllocation', () => {
      const result = hasBudgetUpdate([
        {
          op: 'replace',
          path: '/activities/0/costAllocation/2022/ffp/federal',
          value: 75
        },
        {
          op: 'replace',
          path: '/activities/0/costAllocation/2022/ffp/state',
          value: 25
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('updated other costAllocation', () => {
      const result = hasBudgetUpdate([
        {
          op: 'replace',
          path: '/activities/0/costAllocation/2022/other',
          value: 125000
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('updated inHouse quarterlyFFP', () => {
      const result = hasBudgetUpdate([
        {
          op: 'replace',
          path: '/activities/0/quarterlyFFP/2022/4/inHouse',
          value: 15
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('updated contractors quarterlyFFP', () => {
      const result = hasBudgetUpdate([
        {
          op: 'replace',
          path: '/activities/0/quarterlyFFP/2022/3/contractors',
          value: 35
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('add statePersonnel', () => {
      const result = hasBudgetUpdate([
        {
          op: 'add',
          path: '/activities/0/statePersonnel/-',
          value: {
            key: '4f859ce1',
            title: '',
            description: '',
            years: {
              2022: { amt: null, perc: null },
              2023: { amt: null, perc: null }
            }
          }
        },
        {
          op: 'replace',
          path: '/activities/0/statePersonnel/8',
          value: {
            key: '171c31da',
            title: 'Test',
            description: 'Test',
            years: {
              2022: { amt: 1231, perc: 12 },
              2023: { amt: 12312, perc: 12 }
            }
          }
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('update statePersonnel', () => {
      const result = hasBudgetUpdate([
        {
          op: 'replace',
          path: '/activities/0/statePersonnel/8',
          value: {
            key: '171c31da',
            title: 'Test',
            description: 'Test Change',
            years: {
              2022: { amt: 1231, perc: 12 },
              2023: { amt: 12312, perc: 12 }
            }
          }
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('remove statePersonnel', () => {
      const result = hasBudgetUpdate([
        { op: 'remove', path: '/activities/0/statePersonnel/8' }
      ]);
      expect(result).toBeTruthy();
    });

    test('add expenses', () => {
      const result = hasBudgetUpdate([
        {
          op: 'add',
          path: '/activities/0/expenses/-',
          value: {
            key: 'b8eea4f7',
            category: '',
            description: '',
            years: { 2022: null, 2023: null }
          }
        },
        {
          op: 'replace',
          path: '/activities/0/expenses/3',
          value: {
            key: '52cde0d7',
            category: 'Hardware, software, and licensing',
            description: 'testing',
            years: { 2022: 31423, 2023: 24312 }
          }
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('update expenses', () => {
      const result = hasBudgetUpdate([
        {
          op: 'replace',
          path: '/activities/0/expenses/3',
          value: {
            key: '52cde0d7',
            category: 'Hardware, software, and licensing',
            description: 'testing testing',
            years: { 2022: 31423, 2023: 24312 }
          }
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('remove expenses', () => {
      const result = hasBudgetUpdate([
        { op: 'remove', path: '/activities/0/expenses/3' }
      ]);
      expect(result).toBeTruthy();
    });

    test('add contractorResources', () => {
      const result = hasBudgetUpdate([
        {
          op: 'add',
          path: '/activities/0/contractorResources/-',
          value: {
            key: '8a71cf6b',
            name: '',
            description: '',
            start: '',
            end: '',
            files: [],
            totalCost: null,
            years: { 2022: null, 2023: null },
            useHourly: null,
            hourly: {
              2022: { hours: null, rate: null },
              2023: { hours: null, rate: null }
            }
          }
        },
        {
          op: 'replace',
          path: '/activities/0/contractorResources/2',
          value: {
            key: '4f55aa39',
            name: 'Testing',
            description: '<p>testing</p>',
            start: '2020-12-12',
            end: '2022-12-12',
            files: [],
            totalCost: 1234123,
            years: { 2022: 2342, 2023: 23423 },
            useHourly: false,
            hourly: {
              2022: { hours: null, rate: null },
              2023: { hours: null, rate: null }
            }
          }
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('update contractorResources', () => {
      const result = hasBudgetUpdate([
        {
          op: 'replace',
          path: '/activities/0/contractorResources/2',
          value: {
            key: '4f55aa39',
            name: 'Testing',
            description: '<p>testing testing</p>',
            start: '2020-12-12',
            end: '2022-12-12',
            files: [],
            totalCost: 1234123,
            years: { 2022: 2342, 2023: 23423 },
            useHourly: false,
            hourly: {
              2022: { hours: null, rate: null },
              2023: { hours: null, rate: null }
            }
          }
        }
      ]);
      expect(result).toBeTruthy();
    });

    test('remove contractorResources', () => {
      const result = hasBudgetUpdate([
        { op: 'remove', path: '/activities/0/contractorResources/2' }
      ]);
      expect(result).toBeTruthy();
    });
  });

  describe('provides default years based on now', () => {
    test('before October', () => {
      jest.useFakeTimers().setSystemTime(new Date('1970-09-01').getTime());
      // tick forward 10 days, so we're not on the weird date boundary
      jest.advanceTimersByTime(864000000);

      expect(thisFFY()).toEqual(1970);
      expect(defaultAPDYearOptions()).toEqual(['1970', '1971', '1972']);
      expect(defaultAPDYears()).toEqual(['1970', '1971']);

      jest.clearAllTimers();
    });

    test('after October', () => {
      jest.useFakeTimers().setSystemTime(new Date('1970-10-01').getTime());
      // tick forward 360 days
      jest.advanceTimersByTime(31104000000);

      expect(thisFFY()).toEqual(1971);
      expect(defaultAPDYearOptions()).toEqual(['1971', '1972', '1973']);
      expect(defaultAPDYears()).toEqual(['1971', '1972']);

      jest.clearAllTimers();
    });
  });

  describe('forAllYears', () => {
    test('default years', () => {
      jest.useFakeTimers().setSystemTime(new Date('1970-10-01').getTime());
      const expected = {
        1971: {
          a: true,
          b: false
        },
        1972: {
          a: true,
          b: false
        }
      };
      expect(forAllYears({ a: true, b: false })).toEqual(expected);
      jest.clearAllTimers();
    });

    test('passed in years', () => {
      const expected = {
        2004: {
          a: true,
          b: false
        },
        2005: {
          a: true,
          b: false
        }
      };
      expect(forAllYears({ a: true, b: false }, [2004, 2005])).toEqual(
        expected
      );
    });
  });
});
