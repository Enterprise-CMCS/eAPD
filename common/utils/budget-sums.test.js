import {
  defaultHITECHBudgetObject,
  sumActivityTotalByCategories,
  sumActivityTotals,
  sumCostsForFundingSourceByCategory,
  sumTotalCostsByCategory,
  sumCostsByFFY,
  sumShareCostsForCombinedTotals,
  sumShareCostsForFundingCategory,
  sumShareCostsForFundingSource,
  sumMMISbyFFP,
  sumShareCosts,
  sumActivityQuarterlyFFP,
  sumQuarterlyFFP
} from './budget.js';
import {
  allocationProp,
  activityTotalsProp,
  budgetProp,
  costCategoryShareProp
} from './test-data/sumShareCostsForFundingCategory.js';

describe('budget summing methods', () => {
  describe('sumActivityTotalByCategories', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumActivityTotalByCategories();
      expect(actual).toEqual(expected);
    });

    test('with items empty array', () => {
      const expected = {};
      const actual = sumActivityTotalByCategories({
        items: []
      });
      expect(actual).toEqual(expected);
    });

    test('with items an empty object', () => {
      const expected = {};
      const actual = sumActivityTotalByCategories({
        items: {}
      });
      expect(actual).toEqual(expected);
    });

    test('with items an empty object', () => {
      const expected = { data: {} };
      const actual = sumActivityTotalByCategories({
        items: '',
        activityTotals: { data: {} }
      });
      expect(actual).toEqual(expected);
    });

    test('with item with empty years objects', () => {
      const expected = { data: {} };
      const actual = sumActivityTotalByCategories({
        items: [{ years: {} }, { years: {} }],
        activityTotals: { data: {} }
      });
      expect(actual).toEqual(expected);
    });

    test('with item with empty years arrays', () => {
      const expected = { data: {} };
      const actual = sumActivityTotalByCategories({
        items: [{ years: [] }, { years: [] }],
        activityTotals: { data: {} }
      });
      expect(actual).toEqual(expected);
    });

    test('with item and default activityTotals and category', () => {
      const expected = { data: {} };
      const actual = sumActivityTotalByCategories({
        items: [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        activityTotals: { data: {} }
      });
      expect(actual).toEqual(expected);
    });

    test('with item and default activityTotals and no category', () => {
      const expected = {
        data: {
          combined: { 2017: 1500, 2018: 1700, 2019: 1600, total: 4800 },
          contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          otherFunding: {
            2017: {
              contractors: 0,
              expenses: 0,
              statePersonnel: 0,
              total: 0
            },
            2018: {
              contractors: 0,
              expenses: 0,
              statePersonnel: 0,
              total: 0
            },
            2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
          },
          statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
        }
      };
      const actual = sumActivityTotalByCategories({
        items: [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        activityTotals: {
          data: {
            combined: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            otherFunding: {
              2017: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              2018: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
            },
            statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
          }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('with item and activityTotals with values and no category', () => {
      const expected = {
        data: {
          combined: { 2017: 1800, 2018: 1950, 2019: 2350, total: 6100 },
          contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          otherFunding: {
            2017: {
              contractors: 0,
              expenses: 0,
              statePersonnel: 0,
              total: 0
            },
            2018: {
              contractors: 0,
              expenses: 0,
              statePersonnel: 0,
              total: 0
            },
            2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
          },
          statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
        }
      };
      const actual = sumActivityTotalByCategories({
        items: [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        activityTotals: {
          data: {
            combined: { 2017: 300, 2018: 250, 2019: 750, total: 1300 },
            contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            otherFunding: {
              2017: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              2018: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
            },
            statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
          }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('with item and default activityTotals and category expenses', () => {
      const expected = {
        data: {
          combined: { 2017: 1500, 2018: 1700, 2019: 1600, total: 4800 },
          contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          expenses: { 2017: 1500, 2018: 1700, 2019: 1600, total: 4800 },
          otherFunding: {
            2017: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2018: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
          },
          statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
        }
      };
      const actual = sumActivityTotalByCategories({
        items: [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        activityTotals: {
          data: {
            combined: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            otherFunding: {
              2017: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              2018: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
            },
            statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
          }
        },
        category: 'expenses'
      });
      expect(actual).toEqual(expected);
    });

    test('with item and activityTotals with values and category contractors', () => {
      const expected = {
        data: {
          combined: { 2017: 1800, 2018: 1950, 2019: 2350, total: 6100 },
          contractors: { 2017: 1800, 2018: 1950, 2019: 2350, total: 6100 },
          expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          otherFunding: {
            2017: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2018: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
          },
          statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
        }
      };
      const actual = sumActivityTotalByCategories({
        items: [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        activityTotals: {
          data: {
            combined: { 2017: 300, 2018: 250, 2019: 750, total: 1300 },
            contractors: { 2017: 300, 2018: 250, 2019: 750, total: 1300 },
            expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
            otherFunding: {
              2017: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              2018: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
            },
            statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
          }
        },
        category: 'contractors'
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumActivityTotals', () => {
    test('with default values', () => {
      const expected = {
        id: '',
        name: '',
        fundingSource: null,
        data: {
          combined: { total: 0 },
          contractors: { total: 0 },
          expenses: { total: 0 },
          statePersonnel: { total: 0 },
          otherFunding: {}
        }
      };
      const actual = sumActivityTotals();
      expect(actual).toEqual(expected);
    });

    test('with activity identification but no categories and default years', () => {
      const expected = {
        id: '123456',
        name: 'Program Administration',
        fundingSource: 'MMIS',
        data: {
          combined: { total: 0 },
          contractors: { total: 0 },
          expenses: { total: 0 },
          statePersonnel: { total: 0 },
          otherFunding: {}
        }
      };
      const actual = sumActivityTotals({
        activity: {
          activityId: '123456',
          name: 'Program Administration',
          fundingSource: 'MMIS'
        }
      });
      expect(actual).toEqual(expected);
    });

    test('with activity identification, categories, and 1 year', () => {
      const expected = {
        id: '123456',
        name: 'Program Administration',
        fundingSource: 'MMIS',
        data: {
          combined: { 2017: 5400, 2018: 5200, 2019: 4700, total: 15300 },
          contractors: { 2017: 2000, 2018: 2000, 2019: 2000, total: 6000 },
          expenses: { 2017: 2000, 2018: 2000, 2019: 2000, total: 6000 },
          otherFunding: {
            2017: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2018: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
          },
          statePersonnel: { 2017: 1400, 2018: 1200, 2019: 700, total: 3300 }
        }
      };
      const actual = sumActivityTotals({
        activity: {
          activityId: '123456',
          name: 'Program Administration',
          fundingSource: 'MMIS',
          contractorResources: [
            { years: { 2017: 1000, 2018: 1000, 2019: 1000 } },
            { years: { 2017: 1000, 2018: 1000, 2019: 1000 } }
          ],
          expenses: [
            { years: { 2017: 1000, 2018: 1000, 2019: 1000 } },
            { years: { 2017: 1000, 2018: 1000, 2019: 1000 } }
          ],
          statePersonnel: [
            {
              years: {
                2017: { amt: 1000, perc: 1 },
                2018: { amt: 1000, perc: 0.7 },
                2019: { amt: 1000, perc: 0.4 }
              }
            },
            {
              years: {
                2017: { amt: 1000, perc: 0.4 },
                2018: { amt: 1000, perc: 0.5 },
                2019: { amt: 1000, perc: 0.3 }
              }
            }
          ]
        },
        years: [2017, 2018, 2019]
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumCostsForFundingSourceByCategory', () => {
    test('default values', () => {
      const expected = {};
      const actual = sumCostsForFundingSourceByCategory();
      expect(actual).toEqual(expected);
    });

    test('default values', () => {
      const expected = {};
      const actual = sumCostsForFundingSourceByCategory();
      expect(actual).toEqual(expected);
    });

    test('MMIS with contractors no previous values', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        combined: {
          2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
          2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
          total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: [2017, 2018, 2019]
      };
      const actual = sumCostsForFundingSourceByCategory({
        budget: {
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          hie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hit: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmis: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hitAndHie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          activityTotals: [],
          activities: {},
          years: [2017, 2018, 2019]
        },
        fundingSource: 'mmis',
        category: 'contractors',
        items: [
          {
            years: { 2017: 750, 2018: 800, 2019: 1100 }
          },
          {
            years: { 2017: 500, 2018: 900, 2019: 1000 }
          }
        ]
      });
      expect(actual).toEqual(expected);
    });

    test('HIT with expenses with previous MMIS values', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        combined: {
          2017: { total: 2725, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 3400, federal: 0, medicaid: 0, state: 0 },
          2019: { total: 4300, federal: 0, medicaid: 0, state: 0 },
          total: { total: 10425, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: [2017, 2018, 2019]
      };
      const actual = sumCostsForFundingSourceByCategory({
        budget: {
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          hie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hit: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmis: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hitAndHie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          activityTotals: [],
          activities: {},
          years: [2017, 2018, 2019]
        },
        fundingSource: 'hit',
        category: 'expenses',
        items: [
          {
            years: { 2017: 625, 2018: 975, 2019: 1000 }
          },
          {
            years: { 2017: 850, 2018: 725, 2019: 1200 }
          }
        ]
      });
      expect(actual).toEqual(expected);
    });

    test('HIE with state personnel with previous MMIS and HIT values', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 2875, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 2900, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2900, federal: 0, medicaid: 0, state: 0 },
            total: { total: 8675, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        combined: {
          2017: { total: 4125, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 4600, federal: 0, medicaid: 0, state: 0 },
          2019: { total: 5000, federal: 0, medicaid: 0, state: 0 },
          total: { total: 13725, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: [2017, 2018, 2019]
      };
      const actual = sumCostsForFundingSourceByCategory({
        budget: {
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          hie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hit: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmis: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hitAndHie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          combined: {
            2017: { total: 2725, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 3400, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 4300, federal: 0, medicaid: 0, state: 0 },
            total: { total: 10425, federal: 0, medicaid: 0, state: 0 }
          },
          activityTotals: [],
          activities: {},
          years: [2017, 2018, 2019]
        },
        fundingSource: 'hie',
        category: 'statePersonnel',
        items: [
          {
            years: {
              2017: { amt: 1000, perc: 1 },
              2018: { amt: 1000, perc: 0.7 },
              2019: { amt: 1000, perc: 0.4 }
            }
          },
          {
            years: {
              2017: { amt: 1000, perc: 0.4 },
              2018: { amt: 1000, perc: 0.5 },
              2019: { amt: 1000, perc: 0.3 }
            }
          }
        ]
      });
      expect(actual).toEqual(expected);
    });

    test('null funding source with contractors with previous MMIS, HIT, and HIE values', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 2875, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 2900, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2900, federal: 0, medicaid: 0, state: 0 },
            total: { total: 8675, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        combined: {
          2017: { total: 4325, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 4800, federal: 0, medicaid: 0, state: 0 },
          2019: { total: 5200, federal: 0, medicaid: 0, state: 0 },
          total: { total: 14325, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: [2017, 2018, 2019]
      };
      const actual = sumCostsForFundingSourceByCategory({
        budget: {
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          hie: {
            statePersonnel: {
              2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
              total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
              total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hit: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmis: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hitAndHie: {
            statePersonnel: {
              2017: { total: 1400, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1200, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 700, federal: 0, medicaid: 0, state: 0 },
              total: { total: 3300, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1475, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2200, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5375, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 2875, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 2900, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2900, federal: 0, medicaid: 0, state: 0 },
              total: { total: 8675, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          combined: {
            2017: { total: 4125, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 4600, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 5000, federal: 0, medicaid: 0, state: 0 },
            total: { total: 13725, federal: 0, medicaid: 0, state: 0 }
          },
          activityTotals: [],
          activities: {},
          years: [2017, 2018, 2019]
        },
        fundingSource: null,
        category: 'contractorResources',
        items: [
          { years: { 2017: 100, 2018: 100, 2019: 100 } },
          { years: { 2017: 100, 2018: 100, 2019: 100 } }
        ]
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumTotalCostsByCategory', () => {
    test('default values', () => {
      const expected = {};
      const actual = sumTotalCostsByCategory();
      expect(actual).toEqual(expected);
    });

    test('add HIE activity to default budget', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
          2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
          2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
          total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumTotalCostsByCategory({
        budget: defaultHITECHBudgetObject([2017, 2018, 2019]),
        activity: {
          id: 1,
          key: '1',
          activityId: '1',
          name: 'hieOne',
          fundingSource: 'HIE',
          contractorResources: [
            { years: { 2017: 500, 2018: 750, 2019: 1000 } },
            { years: { 2017: 800, 2018: 775, 2019: 695 } }
          ],
          expenses: [
            { years: { 2017: 950, 2018: 875, 2019: 725 } },
            { years: { 2017: 675, 2018: 680, 2019: 885 } }
          ],
          statePersonnel: [
            {
              years: {
                2017: { amt: 1000, perc: 1 },
                2018: { amt: 1000, perc: 0.7 },
                2019: { amt: 1000, perc: 0.4 }
              }
            },
            {
              years: {
                2017: { amt: 1000, perc: 0.4 },
                2018: { amt: 1000, perc: 0.5 },
                2019: { amt: 1000, perc: 0.3 }
              }
            }
          ]
        },
        fundingSource: 'hie'
      });
      expect(actual).toEqual(expected);
    });

    test('add HIT activity to budget with HIE', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
          2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
          2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
          total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
            total: { total: 0, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumTotalCostsByCategory({
        budget: {
          activities: {},
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        activity: {
          id: 2,
          key: '2',
          activityId: '2',
          name: 'hitOne',
          fundingSource: 'HIT',
          contractorResources: [{ years: { 2017: 850, 2018: 900, 2019: 650 } }],
          expenses: [{ years: { 2017: 775, 2018: 825, 2019: 700 } }],
          statePersonnel: [
            {
              years: {
                2017: { amt: 1000, perc: 0.8 },
                2018: { amt: 1000, perc: 0.75 },
                2019: { amt: 1000, perc: 0.5 }
              }
            }
          ]
        },
        fundingSource: 'hit'
      });
      expect(actual).toEqual(expected);
    });

    test('add MMIS activity to budget with HIE and HIT', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 8825, medicaid: 0, federal: 0, state: 0 },
          2018: { total: 9420, medicaid: 0, federal: 0, state: 0 },
          2019: { total: 7410, medicaid: 0, federal: 0, state: 0 },
          total: { total: 25655, medicaid: 0, federal: 0, state: 0 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6295, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1995, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2700, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1600, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumTotalCostsByCategory({
        budget: {
          activities: {},
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 0, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 0, medicaid: 0, federal: 0, state: 0 },
              total: { total: 0, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        activity: {
          id: 3,
          key: '3',
          activityId: '3',
          name: 'mmisOne',
          fundingSource: 'MMIS',
          contractorResources: [{ years: { 2017: 775, 2018: 665, 2019: 555 } }],
          expenses: [{ years: { 2017: 800, 2018: 1000, 2019: 900 } }],
          statePersonnel: [
            {
              years: {
                2017: { amt: 1000, perc: 0.5 },
                2018: { amt: 1000, perc: 1 },
                2019: { amt: 1000, perc: 0.1 }
              }
            }
          ]
        },
        fundingSource: 'mmis'
      });
      expect(actual).toEqual(expected);
    });

    test('add null funding source activity to budget with HIE, HIT, and MMIS', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 9125, medicaid: 0, federal: 0, state: 0 },
          2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
          2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
          total: { total: 26555, medicaid: 0, federal: 0, state: 0 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6295, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1995, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2700, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1600, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumTotalCostsByCategory({
        budget: {
          activities: {},
          combined: {
            2017: { total: 8825, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 9420, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 7410, medicaid: 0, federal: 0, state: 0 },
            total: { total: 25655, medicaid: 0, federal: 0, state: 0 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 2075, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6295, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1995, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2700, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 500, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1600, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        activity: {
          id: 4,
          key: '4',
          activityId: '4',
          name: 'nullOne',
          fundingSource: null,
          contractorResources: [{ years: { 2017: 100, 2018: 100, 2019: 100 } }],
          expenses: [{ years: { 2017: 100, 2018: 100, 2019: 100 } }],
          statePersonnel: [
            {
              years: {
                2017: { amt: 100, perc: 1 },
                2018: { amt: 100, perc: 1 },
                2019: { amt: 100, perc: 1 }
              }
            }
          ]
        },
        fundingSource: null
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumCostsByFFY', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumCostsByFFY();
      expect(actual).toEqual(expected);
    });

    test('with default costsByFFY, $500 total cost, $300 total medicaid costs', () => {
      const expected = {
        2017: {
          federal: 270,
          medicaid: 300,
          state: 30,
          total: 500
        },
        total: {
          federal: 270,
          medicaid: 300,
          state: 30,
          total: 500
        }
      };
      const actual = sumCostsByFFY({
        costsByFFY: {
          total: {
            federal: 0,
            medicaid: 0,
            state: 0,
            total: 0
          }
        },
        year: 2017,
        totalCost: 500,
        totalMedicaidCostShares: { fedShare: 270, stateShare: 30 },
        totalMedicaidCost: 300
      });
      expect(actual).toEqual(expected);
    });

    test('with costsByFFY with values, $800 total cost, $400 total medicaid costs', () => {
      const expected = {
        2017: {
          federal: 270,
          medicaid: 300,
          state: 30,
          total: 500
        },
        2018: {
          federal: 300,
          medicaid: 400,
          state: 100,
          total: 800
        },
        total: {
          federal: 570,
          medicaid: 700,
          state: 130,
          total: 1300
        }
      };
      const actual = sumCostsByFFY({
        costsByFFY: {
          2017: {
            federal: 270,
            medicaid: 300,
            state: 30,
            total: 500
          },
          total: {
            federal: 270,
            medicaid: 300,
            state: 30,
            total: 500
          }
        },
        year: 2018,
        totalCost: 800,
        totalMedicaidCostShares: { fedShare: 300, stateShare: 100 },
        totalMedicaidCost: 400
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumShareCostsForCombinedTotals', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumShareCostsForCombinedTotals();
      expect(actual).toEqual(expected);
    });

    test('adds values to the combined totals for the year and overall total', () => {
      const year = '2024';
      const medicaidShare = 10;
      const fedShare = 9;
      const stateShare = 1;
      const budget = {
        combined: {
          2024: {
            medicaid: 100,
            federal: 90,
            state: 10
          },
          total: {
            medicaid: 1000,
            federal: 900,
            state: 100
          }
        }
      };
      const expected = {
        combined: {
          2024: {
            medicaid: 110,
            federal: 99,
            state: 11
          },
          total: {
            medicaid: 1010,
            federal: 909,
            state: 101
          }
        }
      };
      const actual = sumShareCostsForCombinedTotals({
        budget,
        year,
        medicaidShare,
        fedShare,
        stateShare
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumShareCostsForFundingCategory', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumShareCostsForFundingCategory();
      expect(actual).toEqual(expected);
    });

    test('returns original budget unchanged when there is no fundingCategory', () => {
      const activityTotals = activityTotalsProp;
      const allocation = allocationProp;
      const budget = budgetProp;
      const costCategoryShare = costCategoryShareProp;
      const fundingCategory = null;
      const year = '2024';
      const actual = sumShareCostsForFundingCategory({
        activityTotals,
        allocation,
        budget,
        costCategoryShare,
        fundingCategory,
        year
      });
      expect(actual).toEqual(budgetProp);
    });

    test("updates budget with new values for each cost category's year and total", () => {
      const activityTotals = activityTotalsProp;
      const allocation = allocationProp;
      const budget = budgetProp;
      const costCategoryShare = costCategoryShareProp;
      const fundingCategory = 'ddi';
      const year = '2024';
      const expected = {
        mmis: {
          statePersonnel: {
            2023: {
              total: 2400075,
              federal: 2124939,
              medicaid: 2361044,
              state: 236104
            },
            2024: {
              total: 2629801,
              federal: 1972351,
              medicaid: 2629801,
              state: 657450
            },
            total: {
              total: 5029876,
              federal: 4097290,
              medicaid: 4990845,
              state: 893554
            }
          },
          contractors: {
            2023: {
              total: 1982756,
              federal: 1746939,
              medicaid: 1941043,
              state: 194104
            },
            2024: {
              total: 2292444,
              federal: 1719333,
              medicaid: 2292444,
              state: 573111
            },
            total: {
              total: 4275200,
              federal: 3466272,
              medicaid: 4233487,
              state: 767215
            }
          },
          expenses: {
            2023: {
              total: 775000,
              federal: 675670,
              medicaid: 750744,
              state: 75075
            },
            2024: {
              total: 75000,
              federal: 56250,
              medicaid: 75000,
              state: 18750
            },
            total: {
              total: 850000,
              federal: 731920,
              medicaid: 825744,
              state: 93825
            }
          },
          combined: {
            2023: {
              total: 5257831,
              federal: 4628548,
              medicaid: 5142831,
              state: 514283
            },
            2024: {
              total: 5097245,
              federal: 3792934,
              medicaid: 5047245,
              state: 1254311
            },
            total: {
              total: 10355076,
              federal: 8421482,
              medicaid: 10190076,
              state: 1768594
            }
          },
          keyStatePersonnel: {
            2023: {
              total: 100000,
              federal: 81000,
              medicaid: 90000,
              state: 9000
            },
            2024: {
              total: 100000,
              federal: 45000,
              medicaid: 50000,
              state: 5000
            },
            total: {
              total: 200000,
              federal: 126000,
              medicaid: 140000,
              state: 14000
            }
          }
        },
        ddi: {
          '90-10': {
            statePersonnel: {
              2023: {
                total: 2400075,
                federal: 2124939,
                medicaid: 2361044,
                state: 236104
              },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: {
                total: 2400075,
                federal: 2124939,
                medicaid: 2361044,
                state: 236104
              }
            },
            contractors: {
              2023: {
                total: 1982756,
                federal: 1746939,
                medicaid: 1941043,
                state: 194104
              },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: {
                total: 1982756,
                federal: 1746939,
                medicaid: 1941043,
                state: 194104
              }
            },
            expenses: {
              2023: {
                total: 775000,
                federal: 675670,
                medicaid: 750744,
                state: 75075
              },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: {
                total: 775000,
                federal: 675670,
                medicaid: 750744,
                state: 75075
              }
            },
            combined: {
              2023: {
                total: 5157831,
                federal: 4547548,
                medicaid: 5052831,
                state: 505283
              },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: {
                total: 5157831,
                federal: 4547548,
                medicaid: 5052831,
                state: 505283
              }
            }
          },
          '75-25': {
            statePersonnel: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: {
                total: 1343000,
                federal: 1007250,
                medicaid: 1343000,
                state: 335750
              },
              total: {
                total: 1343000,
                federal: 1007250,
                medicaid: 1343000,
                state: 335750
              }
            },
            contractors: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: {
                total: 1750000,
                federal: 1312500,
                medicaid: 1750000,
                state: 437500
              },
              total: {
                total: 1750000,
                federal: 1312500,
                medicaid: 1750000,
                state: 437500
              }
            },
            expenses: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: {
                total: 3093000,
                federal: 2319750,
                medicaid: 3093000,
                state: 773250
              },
              total: {
                total: 3093000,
                federal: 2319750,
                medicaid: 3093000,
                state: 773250
              }
            }
          },
          '50-50': {
            statePersonnel: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          combined: {
            2023: {
              total: 5157831,
              federal: 4547548,
              medicaid: 5052831,
              state: 505283
            },
            2024: {
              total: 3093000,
              federal: 2319750,
              medicaid: 3093000,
              state: 773250
            },
            total: {
              total: 8250831,
              federal: 6867298,
              medicaid: 8145831,
              state: 1278533
            }
          }
        },
        mando: {
          '75-25': {
            statePersonnel: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: {
                total: 1286801,
                federal: 965101,
                medicaid: 1286801,
                state: 321700
              },
              total: {
                total: 1286801,
                federal: 965101,
                medicaid: 1286801,
                state: 321700
              }
            },
            contractors: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: {
                total: 542444,
                federal: 406833,
                medicaid: 542444,
                state: 135611
              },
              total: {
                total: 542444,
                federal: 406833,
                medicaid: 542444,
                state: 135611
              }
            },
            expenses: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: {
                total: 75000,
                federal: 56250,
                medicaid: 75000,
                state: 18750
              },
              total: {
                total: 75000,
                federal: 56250,
                medicaid: 75000,
                state: 18750
              }
            },
            combined: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: {
                total: 1904245,
                federal: 1428184,
                medicaid: 1904245,
                state: 476061
              },
              total: {
                total: 1904245,
                federal: 1428184,
                medicaid: 1904245,
                state: 476061
              }
            }
          },
          '50-50': {
            statePersonnel: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2024: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          combined: {
            2023: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2024: {
              total: 1904245,
              federal: 1428184,
              medicaid: 1904245,
              state: 476061
            },
            total: {
              total: 1904245,
              federal: 1428184,
              medicaid: 1904245,
              state: 476061
            }
          }
        },
        combined: {
          2023: {
            total: 5257831,
            federal: 4628548,
            medicaid: 5142831,
            state: 514283
          },
          2024: {
            total: 5097245,
            federal: 3792934,
            medicaid: 5047245,
            state: 1254311
          },
          total: {
            total: 10355076,
            federal: 8421482,
            medicaid: 10190076,
            state: 1768594
          }
        },
        activityTotals: [
          {
            id: '152a1e2b',
            name: 'Activity 1',
            fundingSource: null,
            data: {
              combined: { 2023: 3354831, 2024: 1904245, total: 5259076 },
              contractors: { 2023: 1332756, 2024: 542444, total: 1875200 },
              expenses: { 2023: 775000, 2024: 75000, total: 850000 },
              otherFunding: {
                2023: {
                  contractors: 41713,
                  expenses: 24256,
                  statePersonnel: 39031,
                  total: 105000
                },
                2024: {
                  contractors: 0,
                  expenses: 0,
                  statePersonnel: 0,
                  total: 0
                }
              },
              statePersonnel: { 2023: 1247075, 2024: 1286801, total: 2533876 }
            }
          }
        ],
        activities: {
          '152a1e2b': {
            costsByFFY: {
              2023: {
                federal: 2924848,
                medicaid: 3249831,
                state: 324983,
                total: 3354831
              },
              2024: {
                federal: 1428184,
                medicaid: 1904245,
                state: 476061,
                total: 1904245
              },
              total: {
                federal: 4353032,
                medicaid: 5154076,
                state: 801044,
                total: 5259076
              }
            }
          },
          '3110a314': {
            costsByFFY: {
              2023: {
                federal: 1622700,
                medicaid: 1803000,
                state: 180300,
                total: 1803000
              },
              2024: {
                federal: 2319750,
                medicaid: 3093000,
                state: 773250,
                total: 3093000
              },
              total: {
                federal: 3942450,
                medicaid: 4896000,
                state: 953550,
                total: 4896000
              }
            }
          }
        },
        years: ['2023', '2024']
      };
      const actual = sumShareCostsForFundingCategory({
        activityTotals,
        allocation,
        budget,
        costCategoryShare,
        fundingCategory,
        year
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumShareCostsForFundingSource', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumShareCostsForFundingSource();
      expect(actual).toEqual(expected);
    });

    test('MMIS for 2017 with no previous budget values', () => {
      /**
       * How to create parameters for the tests
       * budget: budget must match the default format, but should have totals added,
       * see expected values for sumCostsForFundingSourceByCategory for examples
       * of what the budget input should look like
       *
       * fundingSource: pick a fundingSource (ex, hit, hie, mmis)
       *
       * year: pick a year that is present in your budget (ex, 2017)
       *
       * totalMedicaidCost: in your budget parameter find the total for the
       * fundingSource and year. (eg, 1555)
       *
       * totalMedicaidCostShares: decide on your fed/state split
       * (ex, 90-10, 75-25, 50-50) then multiply your federal and state percentage
       * against the totalMedicaidCost
       * (eg, fedShare: (1555 * 0.75) = 2228, stateShare: (1555 * 0.25) = 248)
       *
       * costCategoryShare: decide on your category split (eg, contractors: 40,
       * expenses: 35, statePersonnel: 25) and then multiply those values against
       * the federal share, state share, and total medicaid cost
       * (eg, {
       *    fedShare: {
       *      contractors: (.4 * 1166) = 466,
       *      expenses: (.35 * 1166) = 408,
       *      statePersonnel: (.25 * 1166) = 292
       *    },
       *    stateShare: {
       *      contractors: (.4 * 389) = 156,
       *      expenses: (.35 * 389) = 136,
       *      statePersonnel: (.25 * 389) = 97
       *    },
       *    medicaidShare: {
       *      contractors: (.4 * 1555) = 622,
       *      expenses: (.35 * 1555) = 544,
       *      statePersonnel: (.25 * 1555) = 389
       *    }
       * })
       */
      const expected = {
        activities: {},
        combined: {
          2017: { total: 9125, medicaid: 2075, federal: 1556, state: 519 },
          2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
          2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
          total: { total: 26555, medicaid: 2075, federal: 1556, state: 519 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 2075, federal: 1556, state: 519 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6295, medicaid: 2075, federal: 1556, state: 519 }
          },
          contractors: {
            2017: { total: 775, medicaid: 830, federal: 622, state: 207 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1995, medicaid: 830, federal: 622, state: 207 }
          },
          expenses: {
            2017: { total: 800, medicaid: 726, federal: 545, state: 182 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2700, medicaid: 726, federal: 545, state: 182 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 519, federal: 389, state: 130 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1600, medicaid: 519, federal: 389, state: 130 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumShareCostsForFundingSource({
        budget: {
          activities: {},
          combined: {
            2017: { total: 9125, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
            total: { total: 26555, medicaid: 0, federal: 0, state: 0 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 2075, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6295, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1995, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2700, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 500, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1600, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        fundingSource: 'mmis',
        year: 2017,
        totalMedicaidCost: 2075,
        totalMedicaidCostShares: { fedShare: 1556, stateShare: 519 },
        costCategoryShare: {
          fedShare: {
            contractors: 622,
            expenses: 545,
            statePersonnel: 389
          },
          stateShare: {
            contractors: 207,
            expenses: 182,
            statePersonnel: 130
          },
          medicaidShare: {
            contractors: 830,
            expenses: 726,
            statePersonnel: 519
          }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('MMIS for 2019 with previous 2017 MMIS values', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 9125, medicaid: 2075, federal: 1556, state: 519 },
          2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
          2019: { total: 7710, medicaid: 1555, federal: 1166, state: 389 },
          total: { total: 26555, medicaid: 3630, federal: 2722, state: 908 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 2075, federal: 1556, state: 519 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 1555, federal: 1166, state: 389 },
            total: { total: 6295, medicaid: 3630, federal: 2722, state: 908 }
          },
          contractors: {
            2017: { total: 775, medicaid: 830, federal: 622, state: 207 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 622, federal: 466, state: 156 },
            total: { total: 1995, medicaid: 1452, federal: 1088, state: 363 }
          },
          expenses: {
            2017: { total: 800, medicaid: 726, federal: 545, state: 182 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 544, federal: 408, state: 136 },
            total: { total: 2700, medicaid: 1270, federal: 953, state: 318 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 519, federal: 389, state: 130 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 389, federal: 292, state: 97 },
            total: { total: 1600, medicaid: 908, federal: 681, state: 227 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumShareCostsForFundingSource({
        budget: {
          activities: {},
          combined: {
            2017: { total: 9125, medicaid: 2075, federal: 1556, state: 519 },
            2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
            total: { total: 26555, medicaid: 2075, federal: 1556, state: 519 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 2075, medicaid: 2075, federal: 1556, state: 519 },
              2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6295, medicaid: 2075, federal: 1556, state: 519 }
            },
            contractors: {
              2017: { total: 775, medicaid: 830, federal: 622, state: 207 },
              2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1995, medicaid: 830, federal: 622, state: 207 }
            },
            expenses: {
              2017: { total: 800, medicaid: 726, federal: 545, state: 182 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2700, medicaid: 726, federal: 545, state: 182 }
            },
            statePersonnel: {
              2017: { total: 500, medicaid: 519, federal: 389, state: 130 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1600, medicaid: 519, federal: 389, state: 130 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        fundingSource: 'mmis',
        year: 2019,
        totalMedicaidCost: 1555,
        totalMedicaidCostShares: { fedShare: 1166, stateShare: 389 },
        costCategoryShare: {
          fedShare: {
            contractors: 466,
            expenses: 408,
            statePersonnel: 292
          },
          stateShare: {
            contractors: 156,
            expenses: 136,
            statePersonnel: 97
          },
          medicaidShare: {
            contractors: 622,
            expenses: 544,
            statePersonnel: 389
          }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('HIT for 2018 with previous 2017 and 2019 MMIS values', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 9125, medicaid: 2075, federal: 1556, state: 519 },
          2018: { total: 9720, medicaid: 2475, federal: 2228, state: 248 },
          2019: { total: 7710, medicaid: 1555, federal: 1166, state: 389 },
          total: { total: 26555, medicaid: 6105, federal: 4950, state: 1156 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 2475, federal: 2228, state: 248 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 2475, federal: 2228, state: 248 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 825, federal: 743, state: 83 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 825, federal: 743, state: 83 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 825, federal: 743, state: 83 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 825, federal: 743, state: 83 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 825, federal: 742, state: 83 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 825, federal: 742, state: 83 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 2075, federal: 1556, state: 519 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 1555, federal: 1166, state: 389 },
            total: { total: 6295, medicaid: 3630, federal: 2722, state: 908 }
          },
          contractors: {
            2017: { total: 775, medicaid: 830, federal: 622, state: 207 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 622, federal: 466, state: 156 },
            total: { total: 1995, medicaid: 1452, federal: 1088, state: 363 }
          },
          expenses: {
            2017: { total: 800, medicaid: 726, federal: 545, state: 182 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 544, federal: 408, state: 136 },
            total: { total: 2700, medicaid: 1270, federal: 953, state: 318 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 519, federal: 389, state: 130 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 389, federal: 292, state: 97 },
            total: { total: 1600, medicaid: 908, federal: 681, state: 227 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumShareCostsForFundingSource({
        budget: {
          activities: {},
          combined: {
            2017: { total: 9125, medicaid: 2075, federal: 1556, state: 519 },
            2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 7710, medicaid: 1555, federal: 1166, state: 389 },
            total: { total: 26555, medicaid: 3630, federal: 2722, state: 908 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 2075, medicaid: 2075, federal: 1556, state: 519 },
              2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1555, medicaid: 1555, federal: 1166, state: 389 },
              total: { total: 6295, medicaid: 3630, federal: 2722, state: 908 }
            },
            contractors: {
              2017: { total: 775, medicaid: 830, federal: 622, state: 207 },
              2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 555, medicaid: 622, federal: 466, state: 156 },
              total: { total: 1995, medicaid: 1452, federal: 1088, state: 363 }
            },
            expenses: {
              2017: { total: 800, medicaid: 726, federal: 545, state: 182 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 900, medicaid: 544, federal: 408, state: 136 },
              total: { total: 2700, medicaid: 1270, federal: 953, state: 318 }
            },
            statePersonnel: {
              2017: { total: 500, medicaid: 519, federal: 389, state: 130 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 100, medicaid: 389, federal: 292, state: 97 },
              total: { total: 1600, medicaid: 908, federal: 681, state: 227 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        fundingSource: 'hit',
        year: 2018,
        totalMedicaidCost: 2475,
        totalMedicaidCostShares: { fedShare: 2228, stateShare: 248 },
        costCategoryShare: {
          fedShare: {
            contractors: 743,
            expenses: 743,
            statePersonnel: 742
          },
          stateShare: {
            contractors: 83,
            expenses: 83,
            statePersonnel: 83
          },
          medicaidShare: {
            contractors: 825,
            expenses: 825,
            statePersonnel: 825
          }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('null for 2019 with previous 2017 and 2019 MMIS and 2018 HIT values', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 9125, medicaid: 2375, federal: 1706, state: 669 },
          2018: { total: 9720, medicaid: 2475, federal: 2228, state: 248 },
          2019: { total: 7710, medicaid: 1555, federal: 1166, state: 389 },
          total: { total: 26555, medicaid: 6405, federal: 5100, state: 1306 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 2475, federal: 2228, state: 248 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 2475, federal: 2228, state: 248 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 825, federal: 743, state: 83 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 825, federal: 743, state: 83 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 825, federal: 743, state: 83 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 825, federal: 743, state: 83 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 825, federal: 742, state: 83 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 825, federal: 742, state: 83 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 2075, federal: 1556, state: 519 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 1555, federal: 1166, state: 389 },
            total: { total: 6295, medicaid: 3630, federal: 2722, state: 908 }
          },
          contractors: {
            2017: { total: 775, medicaid: 830, federal: 622, state: 207 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 622, federal: 466, state: 156 },
            total: { total: 1995, medicaid: 1452, federal: 1088, state: 363 }
          },
          expenses: {
            2017: { total: 800, medicaid: 726, federal: 545, state: 182 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 544, federal: 408, state: 136 },
            total: { total: 2700, medicaid: 1270, federal: 953, state: 318 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 519, federal: 389, state: 130 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 389, federal: 292, state: 97 },
            total: { total: 1600, medicaid: 908, federal: 681, state: 227 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumShareCostsForFundingSource({
        budget: {
          activities: {},
          combined: {
            2017: { total: 9125, medicaid: 2075, federal: 1556, state: 519 },
            2018: { total: 9720, medicaid: 2475, federal: 2228, state: 248 },
            2019: { total: 7710, medicaid: 1555, federal: 1166, state: 389 },
            total: { total: 26555, medicaid: 6105, federal: 4950, state: 1156 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 2475, federal: 2228, state: 248 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 2475, federal: 2228, state: 248 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 825, federal: 743, state: 83 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 825, federal: 743, state: 83 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 825, federal: 743, state: 83 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 825, federal: 743, state: 83 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 825, federal: 742, state: 83 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 825, federal: 742, state: 83 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 2075, medicaid: 2075, federal: 1556, state: 519 },
              2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1555, medicaid: 1555, federal: 1166, state: 389 },
              total: { total: 6295, medicaid: 3630, federal: 2722, state: 908 }
            },
            contractors: {
              2017: { total: 775, medicaid: 830, federal: 622, state: 207 },
              2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 555, medicaid: 622, federal: 466, state: 156 },
              total: { total: 1995, medicaid: 1452, federal: 1088, state: 363 }
            },
            expenses: {
              2017: { total: 800, medicaid: 726, federal: 545, state: 182 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 900, medicaid: 544, federal: 408, state: 136 },
              total: { total: 2700, medicaid: 1270, federal: 953, state: 318 }
            },
            statePersonnel: {
              2017: { total: 500, medicaid: 519, federal: 389, state: 130 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 100, medicaid: 389, federal: 292, state: 97 },
              total: { total: 1600, medicaid: 908, federal: 681, state: 227 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        fundingSource: null,
        year: 2017,
        totalMedicaidCost: 300,
        totalMedicaidCostShares: { fedShare: 150, stateShare: 150 },
        costCategoryShare: {
          fedShare: {
            contractors: 50,
            expenses: 50,
            statePersonnel: 50
          },
          stateShare: {
            contractors: 50,
            expenses: 50,
            statePersonnel: 50
          },
          medicaidShare: {
            contractors: 100,
            expenses: 100,
            statePersonnel: 100
          }
        }
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumMMISbyFFP', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumMMISbyFFP();
      expect(actual).toEqual(expected);
    });

    test('with empty values', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3000, federal: 2497, medicaid: 2775, state: 278 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3000, federal: 2497, medicaid: 2775, state: 278 }
          }
        },
        combined: {
          2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
          2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
          total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: [2017, 2018, 2019]
      };
      const actual = sumMMISbyFFP({
        budget: {
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          hie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hit: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmis: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hitAndHie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          activityTotals: [],
          activities: {},
          years: [2017, 2018, 2019]
        },
        year: 2017,
        totalCost: 3000,
        totalMedicaidCost: 2775,
        allocation: {
          2017: { ffp: { federal: 90, state: 10 }, other: 0 },
          2018: { ffp: { federal: 75, state: 25 }, other: 0 },
          2019: { ffp: { federal: 50, state: 50 }, other: 0 }
        },
        totalMedicaidCostShares: { fedShare: 2497, stateShare: 278 }
      });
      expect(actual).toEqual(expected);
    });

    test('with previous values', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3000, federal: 2497, medicaid: 2775, state: 278 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
            2018: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 8000, federal: 5497, medicaid: 6775, state: 1278 }
          }
        },
        combined: {
          2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
          2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
          total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: [2017, 2018, 2019]
      };
      const actual = sumMMISbyFFP({
        budget: {
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          hie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hit: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmis: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hitAndHie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 3000, federal: 2497, medicaid: 2775, state: 278 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 3000, federal: 2497, medicaid: 2775, state: 278 }
            }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          activityTotals: [],
          activities: {},
          years: [2017, 2018, 2019]
        },
        year: 2018,
        totalCost: 5000,
        totalMedicaidCost: 4000,
        allocation: {
          2017: { ffp: { federal: 90, state: 10 }, other: 0 },
          2018: { ffp: { federal: 75, state: 25 }, other: 0 },
          2019: { ffp: { federal: 50, state: 50 }, other: 0 }
        },
        totalMedicaidCostShares: { fedShare: 3000, stateShare: 1000 }
      });
      expect(actual).toEqual(expected);
    });

    test('with invalid cost allocation', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 3000, federal: 2497, medicaid: 2775, state: 278 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
            2018: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 },
            2019: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 },
            total: { total: 13000, federal: 8497, medicaid: 10775, state: 2278 }
          }
        },
        combined: {
          2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
          2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
          total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: [2017, 2018, 2019]
      };
      const actual = sumMMISbyFFP({
        budget: {
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          hie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hit: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmis: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
            }
          },
          hitAndHie: {
            statePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            contractors: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            expenses: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 3000, federal: 2497, medicaid: 2775, state: 278 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 3000, federal: 2497, medicaid: 2775, state: 278 },
              2018: { total: 5000, federal: 3000, medicaid: 4000, state: 1000 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 8000, federal: 5497, medicaid: 6775, state: 1278 }
            }
          },
          combined: {
            2017: { total: 1250, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 1700, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 2100, federal: 0, medicaid: 0, state: 0 },
            total: { total: 5050, federal: 0, medicaid: 0, state: 0 }
          },
          activityTotals: [],
          activities: {},
          years: [2017, 2018, 2019]
        },
        year: 2019,
        totalCost: 5000,
        totalMedicaidCost: 4000,
        allocation: {
          2017: { ffp: { federal: 90, state: 10 }, other: 0 },
          2018: { ffp: { federal: 75, state: 25 }, other: 0 },
          2019: { ffp: { federal: 40, state: 50 }, other: 0 }
        },
        totalMedicaidCostShares: { fedShare: 3000, stateShare: 1000 }
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumShareCosts', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumShareCosts();
      expect(actual).toEqual(expected);
    });

    test('MMIS for 2017 with no previous budget values', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 9125, medicaid: 2075, federal: 1868, state: 207 },
          2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
          2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
          total: { total: 26555, medicaid: 2075, federal: 1868, state: 207 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 2075, federal: 1868, state: 207 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6295, medicaid: 2075, federal: 1868, state: 207 }
          },
          contractors: {
            2017: { total: 775, medicaid: 718, federal: 647, state: 72 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1995, medicaid: 718, federal: 647, state: 72 }
          },
          expenses: {
            2017: { total: 800, medicaid: 798, federal: 718, state: 80 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2700, medicaid: 798, federal: 718, state: 80 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 559, federal: 503, state: 56 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1600, medicaid: 559, federal: 503, state: 56 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumShareCosts({
        budget: {
          activities: {},
          combined: {
            2017: { total: 9125, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
            total: { total: 26555, medicaid: 0, federal: 0, state: 0 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 2075, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6295, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1995, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2700, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 500, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1600, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        fundingSource: 'mmis',
        year: 2017,
        totalCost: 2075,
        totalMedicaidCost: 2075,
        allocation: {
          2017: { ffp: { federal: 90, state: 10 }, other: 0 },
          2018: { ffp: { federal: 75, state: 25 }, other: 0 },
          2019: { ffp: { federal: 50, state: 50 }, other: 0 }
        },
        totalMedicaidCostShares: { fedShare: 1868, stateShare: 207 },
        costCategoryShare: {
          fedShare: {
            contractors: 647,
            expenses: 718,
            statePersonnel: 503
          },
          stateShare: {
            contractors: 72,
            expenses: 80,
            statePersonnel: 56
          },
          medicaidShare: {
            contractors: 718,
            expenses: 798,
            statePersonnel: 559
          }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('HIT for 2018 with MMIS for 2017 budget values', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 9125, medicaid: 2075, federal: 1868, state: 207 },
          2018: { total: 9720, medicaid: 2475, federal: 1856, state: 619 },
          2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
          total: { total: 26555, medicaid: 4550, federal: 3724, state: 826 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 2475, federal: 1856, state: 619 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 2475, federal: 1856, state: 619 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 825, federal: 619, state: 206 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 825, federal: 619, state: 206 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 825, federal: 619, state: 206 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 825, federal: 619, state: 206 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 825, federal: 618, state: 206 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 825, federal: 618, state: 206 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 2075, federal: 1868, state: 207 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6295, medicaid: 2075, federal: 1868, state: 207 }
          },
          contractors: {
            2017: { total: 775, medicaid: 718, federal: 647, state: 72 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1995, medicaid: 718, federal: 647, state: 72 }
          },
          expenses: {
            2017: { total: 800, medicaid: 798, federal: 718, state: 80 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2700, medicaid: 798, federal: 718, state: 80 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 559, federal: 503, state: 56 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1600, medicaid: 559, federal: 503, state: 56 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 2475, federal: 1856, state: 619 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 2475, federal: 1856, state: 619 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 825, federal: 619, state: 206 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 825, federal: 619, state: 206 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 825, federal: 619, state: 206 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 825, federal: 619, state: 206 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 825, federal: 618, state: 206 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 825, federal: 618, state: 206 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumShareCosts({
        budget: {
          activities: {},
          combined: {
            2017: { total: 9125, medicaid: 2075, federal: 1868, state: 207 },
            2018: { total: 9720, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
            total: { total: 26555, medicaid: 2075, federal: 1868, state: 207 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 2075, medicaid: 2075, federal: 1868, state: 207 },
              2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6295, medicaid: 2075, federal: 1868, state: 207 }
            },
            contractors: {
              2017: { total: 775, medicaid: 718, federal: 647, state: 72 },
              2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1995, medicaid: 718, federal: 647, state: 72 }
            },
            expenses: {
              2017: { total: 800, medicaid: 798, federal: 718, state: 80 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2700, medicaid: 798, federal: 718, state: 80 }
            },
            statePersonnel: {
              2017: { total: 500, medicaid: 559, federal: 503, state: 56 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1600, medicaid: 559, federal: 503, state: 56 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 0, federal: 0, state: 0 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        fundingSource: 'hit',
        year: 2018,
        totalCost: 2475,
        totalMedicaidCost: 2475,
        allocation: {
          2017: { ffp: { federal: 90, state: 10 }, other: 0 },
          2018: { ffp: { federal: 75, state: 25 }, other: 0 },
          2019: { ffp: { federal: 50, state: 50 }, other: 0 }
        },
        totalMedicaidCostShares: { fedShare: 1856, stateShare: 619 },
        costCategoryShare: {
          fedShare: {
            contractors: 619,
            expenses: 619,
            statePersonnel: 618
          },
          stateShare: {
            contractors: 206,
            expenses: 206,
            statePersonnel: 206
          },
          medicaidShare: {
            contractors: 825,
            expenses: 825,
            statePersonnel: 825
          }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('null funding source for 2019 with MMIS for 2017 budget values', () => {
      const expected = {
        activities: {},
        combined: {
          2017: { total: 9125, medicaid: 2075, federal: 1868, state: 207 },
          2018: { total: 9720, medicaid: 2475, federal: 1856, state: 619 },
          2019: { total: 7710, medicaid: 300, federal: 150, state: 150 },
          total: { total: 26555, medicaid: 4850, federal: 3874, state: 976 }
        },
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          },
          mmis: {
            years: {
              2017: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2018: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              },
              2019: {
                1: { inHouse: 0, contractors: 0, combined: 0 },
                2: { inHouse: 0, contractors: 0, combined: 0 },
                3: { inHouse: 0, contractors: 0, combined: 0 },
                4: { inHouse: 0, contractors: 0, combined: 0 },
                subtotal: { inHouse: 0, contractors: 0, combined: 0 }
              }
            },
            total: { contractors: 0, inHouse: 0, combined: 0 }
          }
        },
        hie: {
          combined: {
            2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
            total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
          },
          contractors: {
            2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
          },
          expenses: {
            2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
            total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
          },
          statePersonnel: {
            2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
          }
        },
        hit: {
          combined: {
            2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2475, medicaid: 2475, federal: 1856, state: 619 },
            2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6750, medicaid: 2475, federal: 1856, state: 619 }
          },
          contractors: {
            2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 900, medicaid: 825, federal: 619, state: 206 },
            2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2400, medicaid: 825, federal: 619, state: 206 }
          },
          expenses: {
            2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 825, medicaid: 825, federal: 619, state: 206 },
            2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2300, medicaid: 825, federal: 619, state: 206 }
          },
          statePersonnel: {
            2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 750, medicaid: 825, federal: 618, state: 206 },
            2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2050, medicaid: 825, federal: 618, state: 206 }
          }
        },
        mmis: {
          combined: {
            2017: { total: 2075, medicaid: 2075, federal: 1868, state: 207 },
            2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6295, medicaid: 2075, federal: 1868, state: 207 }
          },
          contractors: {
            2017: { total: 775, medicaid: 718, federal: 647, state: 72 },
            2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1995, medicaid: 718, federal: 647, state: 72 }
          },
          expenses: {
            2017: { total: 800, medicaid: 798, federal: 718, state: 80 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
            total: { total: 2700, medicaid: 798, federal: 718, state: 80 }
          },
          statePersonnel: {
            2017: { total: 500, medicaid: 559, federal: 503, state: 56 },
            2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
            2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
            total: { total: 1600, medicaid: 559, federal: 503, state: 56 }
          }
        },
        hitAndHie: {
          combined: {
            2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 6755, medicaid: 2475, federal: 1856, state: 619 },
            2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
            total: { total: 19360, medicaid: 2475, federal: 1856, state: 619 }
          },
          contractors: {
            2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2425, medicaid: 825, federal: 619, state: 206 },
            2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
            total: { total: 6920, medicaid: 825, federal: 619, state: 206 }
          },
          expenses: {
            2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 2380, medicaid: 825, federal: 619, state: 206 },
            2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
            total: { total: 7090, medicaid: 825, federal: 619, state: 206 }
          },
          statePersonnel: {
            2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
            2018: { total: 1950, medicaid: 825, federal: 618, state: 206 },
            2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
            total: { total: 5350, medicaid: 825, federal: 618, state: 206 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
          }
        },
        activityTotals: [],
        years: [2017, 2018, 2019]
      };
      const actual = sumShareCosts({
        budget: {
          activities: {},
          combined: {
            2017: { total: 9125, medicaid: 2075, federal: 1868, state: 207 },
            2018: { total: 9720, medicaid: 2475, federal: 1856, state: 619 },
            2019: { total: 7710, medicaid: 0, federal: 0, state: 0 },
            total: { total: 26555, medicaid: 4550, federal: 3724, state: 826 }
          },
          federalShareByFFYQuarter: {
            hitAndHie: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            },
            mmis: {
              years: {
                2017: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2018: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                },
                2019: {
                  1: { inHouse: 0, contractors: 0, combined: 0 },
                  2: { inHouse: 0, contractors: 0, combined: 0 },
                  3: { inHouse: 0, contractors: 0, combined: 0 },
                  4: { inHouse: 0, contractors: 0, combined: 0 },
                  subtotal: { inHouse: 0, contractors: 0, combined: 0 }
                }
              },
              total: { contractors: 0, inHouse: 0, combined: 0 }
            }
          },
          hie: {
            combined: {
              2017: { total: 4325, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 4280, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 4005, medicaid: 0, federal: 0, state: 0 },
              total: { total: 12610, medicaid: 0, federal: 0, state: 0 }
            },
            contractors: {
              2017: { total: 1300, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1525, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1695, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4520, medicaid: 0, federal: 0, state: 0 }
            },
            expenses: {
              2017: { total: 1625, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1610, medicaid: 0, federal: 0, state: 0 },
              total: { total: 4790, medicaid: 0, federal: 0, state: 0 }
            },
            statePersonnel: {
              2017: { total: 1400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 3300, medicaid: 0, federal: 0, state: 0 }
            }
          },
          hit: {
            combined: {
              2017: { total: 2425, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2475, medicaid: 2475, federal: 1856, state: 619 },
              2019: { total: 1850, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6750, medicaid: 2475, federal: 1856, state: 619 }
            },
            contractors: {
              2017: { total: 850, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 900, medicaid: 825, federal: 619, state: 206 },
              2019: { total: 650, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2400, medicaid: 825, federal: 619, state: 206 }
            },
            expenses: {
              2017: { total: 775, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 825, medicaid: 825, federal: 619, state: 206 },
              2019: { total: 700, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2300, medicaid: 825, federal: 619, state: 206 }
            },
            statePersonnel: {
              2017: { total: 800, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 750, medicaid: 825, federal: 618, state: 206 },
              2019: { total: 500, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2050, medicaid: 825, federal: 618, state: 206 }
            }
          },
          mmis: {
            combined: {
              2017: { total: 2075, medicaid: 2075, federal: 1868, state: 207 },
              2018: { total: 2665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 1555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6295, medicaid: 2075, federal: 1868, state: 207 }
            },
            contractors: {
              2017: { total: 775, medicaid: 718, federal: 647, state: 72 },
              2018: { total: 665, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 555, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1995, medicaid: 718, federal: 647, state: 72 }
            },
            expenses: {
              2017: { total: 800, medicaid: 798, federal: 718, state: 80 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 900, medicaid: 0, federal: 0, state: 0 },
              total: { total: 2700, medicaid: 798, federal: 718, state: 80 }
            },
            statePersonnel: {
              2017: { total: 500, medicaid: 559, federal: 503, state: 56 },
              2018: { total: 1000, medicaid: 0, federal: 0, state: 0 },
              2019: { total: 100, medicaid: 0, federal: 0, state: 0 },
              total: { total: 1600, medicaid: 559, federal: 503, state: 56 }
            }
          },
          hitAndHie: {
            combined: {
              2017: { total: 6750, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 6755, medicaid: 2475, federal: 1856, state: 619 },
              2019: { total: 5855, medicaid: 0, federal: 0, state: 0 },
              total: { total: 19360, medicaid: 2475, federal: 1856, state: 619 }
            },
            contractors: {
              2017: { total: 2150, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2425, medicaid: 825, federal: 619, state: 206 },
              2019: { total: 2345, medicaid: 0, federal: 0, state: 0 },
              total: { total: 6920, medicaid: 825, federal: 619, state: 206 }
            },
            expenses: {
              2017: { total: 2400, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 2380, medicaid: 825, federal: 619, state: 206 },
              2019: { total: 2310, medicaid: 0, federal: 0, state: 0 },
              total: { total: 7090, medicaid: 825, federal: 619, state: 206 }
            },
            statePersonnel: {
              2017: { total: 2200, medicaid: 0, federal: 0, state: 0 },
              2018: { total: 1950, medicaid: 825, federal: 618, state: 206 },
              2019: { total: 1200, medicaid: 0, federal: 0, state: 0 },
              total: { total: 5350, medicaid: 825, federal: 618, state: 206 }
            }
          },
          mmisByFFP: {
            '90-10': {
              2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
            },
            '75-25': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '50-50': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            '0-100': {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
            combined: {
              2017: { total: 2075, federal: 1868, medicaid: 2075, state: 207 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2019: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 2075, federal: 1868, medicaid: 2075, state: 207 }
            }
          },
          activityTotals: [],
          years: [2017, 2018, 2019]
        },
        fundingSource: null,
        year: 2019,
        totalCost: 300,
        totalMedicaidCost: 300,
        allocation: {
          2017: { ffp: { federal: 90, state: 10 }, other: 0 },
          2018: { ffp: { federal: 75, state: 25 }, other: 0 },
          2019: { ffp: { federal: 50, state: 50 }, other: 0 }
        },
        totalMedicaidCostShares: { fedShare: 150, stateShare: 150 },
        costCategoryShare: {
          fedShare: {
            contractors: 50,
            expenses: 50,
            statePersonnel: 50
          },
          stateShare: {
            contractors: 50,
            expenses: 50,
            statePersonnel: 50
          },
          medicaidShare: {
            contractors: 100,
            expenses: 100,
            statePersonnel: 100
          }
        }
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumActivityQuarterlyFFP', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumActivityQuarterlyFFP();
      expect(actual).toEqual(expected);
    });

    test('contracts for 2017, no previous values', () => {
      const expected = {
        total: { combined: 2000, contractors: 2000, inHouse: 0 },
        years: {
          2017: {
            1: {
              combined: { dollars: 800, percent: 0 },
              contractors: { dollars: 800, percent: 0.4 },
              inHouse: { dollars: 0, percent: 0 }
            },
            2: {
              combined: { dollars: 400, percent: 0 },
              contractors: { dollars: 400, percent: 0.2 },
              inHouse: { dollars: 0, percent: 0 }
            },
            3: {
              combined: { dollars: 600, percent: 0 },
              contractors: { dollars: 600, percent: 0.3 },
              inHouse: { dollars: 0, percent: 0 }
            },
            4: {
              combined: { dollars: 200, percent: 0 },
              contractors: { dollars: 200, percent: 0.1 },
              inHouse: { dollars: 0, percent: 0 }
            },
            subtotal: {
              combined: { dollars: 2000, percent: 0 },
              contractors: { dollars: 2000, percent: 1.0000000000000002 },
              inHouse: { dollars: 0, percent: 0 }
            }
          },
          2018: {
            1: {
              combined: { dollars: 0, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 0, percent: 0 }
            },
            2: {
              combined: { dollars: 0, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 0, percent: 0 }
            },
            3: {
              combined: { dollars: 0, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 0, percent: 0 }
            },
            4: {
              combined: { dollars: 0, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 0, percent: 0 }
            },
            subtotal: {
              combined: { dollars: 0, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 0, percent: 0 }
            }
          }
        }
      };
      const actual = sumActivityQuarterlyFFP({
        activityFFP: {
          total: { combined: 0, contractors: 0, inHouse: 0 },
          years: {
            2017: {
              1: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              2: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              3: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              4: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              subtotal: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              }
            },
            2018: {
              1: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              2: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              3: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              4: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              subtotal: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              }
            }
          }
        },
        fedShareAmount: 2000,
        category: 'contractors',
        year: 2017,
        quarterlyInfo: {
          federalPcts: [0.4, 0.2, 0.3, 0.1],
          qFFPs: [800, 400, 600, 200]
        }
      });
      expect(actual).toEqual(expected);
    });

    test('expenses for 2018 with 2017 contractors values', () => {
      const expected = {
        years: {
          2017: {
            1: {
              combined: { dollars: 800, percent: 0 },
              contractors: { dollars: 800, percent: 0.4 },
              inHouse: { dollars: 0, percent: 0 }
            },
            2: {
              combined: { dollars: 400, percent: 0 },
              contractors: { dollars: 400, percent: 0.2 },
              inHouse: { dollars: 0, percent: 0 }
            },
            3: {
              combined: { dollars: 600, percent: 0 },
              contractors: { dollars: 600, percent: 0.3 },
              inHouse: { dollars: 0, percent: 0 }
            },
            4: {
              combined: { dollars: 200, percent: 0 },
              contractors: { dollars: 200, percent: 0.1 },
              inHouse: { dollars: 0, percent: 0 }
            },
            subtotal: {
              combined: { dollars: 2000, percent: 0 },
              contractors: { dollars: 2000, percent: 1.0000000000000002 },
              inHouse: { dollars: 0, percent: 0 }
            }
          },
          2018: {
            1: {
              combined: { dollars: 250, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 250, percent: 0.25 }
            },
            2: {
              combined: { dollars: 250, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 250, percent: 0.25 }
            },
            3: {
              combined: { dollars: 250, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 250, percent: 0.25 }
            },
            4: {
              combined: { dollars: 250, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 250, percent: 0.25 }
            },
            subtotal: {
              combined: { dollars: 1000, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 1000, percent: 0 } // code skips adding percent for expenses
            }
          }
        },
        total: { combined: 3000, contractors: 2000, inHouse: 1000 }
      };
      const actual = sumActivityQuarterlyFFP({
        activityFFP: {
          years: {
            2017: {
              1: {
                combined: { dollars: 800, percent: 0 },
                contractors: { dollars: 800, percent: 0.4 },
                inHouse: { dollars: 0, percent: 0 }
              },
              2: {
                combined: { dollars: 400, percent: 0 },
                contractors: { dollars: 400, percent: 0.2 },
                inHouse: { dollars: 0, percent: 0 }
              },
              3: {
                combined: { dollars: 600, percent: 0 },
                contractors: { dollars: 600, percent: 0.3 },
                inHouse: { dollars: 0, percent: 0 }
              },
              4: {
                combined: { dollars: 200, percent: 0 },
                contractors: { dollars: 200, percent: 0.1 },
                inHouse: { dollars: 0, percent: 0 }
              },
              subtotal: {
                combined: { dollars: 2000, percent: 0 },
                contractors: { dollars: 2000, percent: 1.0000000000000002 },
                inHouse: { dollars: 0, percent: 0 }
              }
            },
            2018: {
              1: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              2: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              3: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              4: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              },
              subtotal: {
                combined: { dollars: 0, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 0, percent: 0 }
              }
            }
          },
          total: { combined: 2000, contractors: 2000, inHouse: 0 }
        },
        fedShareAmount: 1000,
        category: 'expenses',
        year: 2018,
        quarterlyInfo: {
          federalPcts: [0.25, 0.25, 0.25, 0.25],
          qFFPs: [250, 250, 250, 250]
        }
      });
      expect(actual).toEqual(expected);
    });

    test('statePersonnel for 2018 with 2018 expenses and 2017 contractors values', () => {
      const expected = {
        years: {
          2017: {
            1: {
              combined: { dollars: 800, percent: 0 },
              contractors: { dollars: 800, percent: 0.4 },
              inHouse: { dollars: 0, percent: 0 }
            },
            2: {
              combined: { dollars: 400, percent: 0 },
              contractors: { dollars: 400, percent: 0.2 },
              inHouse: { dollars: 0, percent: 0 }
            },
            3: {
              combined: { dollars: 600, percent: 0 },
              contractors: { dollars: 600, percent: 0.3 },
              inHouse: { dollars: 0, percent: 0 }
            },
            4: {
              combined: { dollars: 200, percent: 0 },
              contractors: { dollars: 200, percent: 0.1 },
              inHouse: { dollars: 0, percent: 0 }
            },
            subtotal: {
              combined: { dollars: 2000, percent: 0 },
              contractors: { dollars: 2000, percent: 1.0000000000000002 },
              inHouse: { dollars: 0, percent: 0 }
            }
          },
          2018: {
            1: {
              combined: { dollars: 550, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 550, percent: 0.33 }
            },
            2: {
              combined: { dollars: 550, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 550, percent: 0.33 }
            },
            3: {
              combined: { dollars: 550, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 550, percent: 0.33 }
            },
            4: {
              combined: { dollars: 250, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 250, percent: 0 }
            },
            subtotal: {
              combined: { dollars: 1900, percent: 0 },
              contractors: { dollars: 0, percent: 0 },
              inHouse: { dollars: 1900, percent: 0.99 } // code skips adding percent for expenses
            }
          }
        },
        total: { combined: 3900, contractors: 2000, inHouse: 1900 }
      };
      const actual = sumActivityQuarterlyFFP({
        activityFFP: {
          years: {
            2017: {
              1: {
                combined: { dollars: 800, percent: 0 },
                contractors: { dollars: 800, percent: 0.4 },
                inHouse: { dollars: 0, percent: 0 }
              },
              2: {
                combined: { dollars: 400, percent: 0 },
                contractors: { dollars: 400, percent: 0.2 },
                inHouse: { dollars: 0, percent: 0 }
              },
              3: {
                combined: { dollars: 600, percent: 0 },
                contractors: { dollars: 600, percent: 0.3 },
                inHouse: { dollars: 0, percent: 0 }
              },
              4: {
                combined: { dollars: 200, percent: 0 },
                contractors: { dollars: 200, percent: 0.1 },
                inHouse: { dollars: 0, percent: 0 }
              },
              subtotal: {
                combined: { dollars: 2000, percent: 0 },
                contractors: { dollars: 2000, percent: 1.0000000000000002 },
                inHouse: { dollars: 0, percent: 0 }
              }
            },
            2018: {
              1: {
                combined: { dollars: 250, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 250, percent: 0.25 }
              },
              2: {
                combined: { dollars: 250, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 250, percent: 0.25 }
              },
              3: {
                combined: { dollars: 250, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 250, percent: 0.25 }
              },
              4: {
                combined: { dollars: 250, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 250, percent: 0.25 }
              },
              subtotal: {
                combined: { dollars: 1000, percent: 0 },
                contractors: { dollars: 0, percent: 0 },
                inHouse: { dollars: 1000, percent: 0 } // code skips adding percent for expenses
              }
            }
          },
          total: { combined: 3000, contractors: 2000, inHouse: 1000 }
        },
        fedShareAmount: 900,
        category: 'statePersonnel',
        year: 2018,
        quarterlyInfo: {
          federalPcts: [0.33, 0.33, 0.33, 0],
          qFFPs: [300, 300, 300, 0]
        }
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('sumQuarterlyFFP', () => {
    test('with default values', () => {
      const expected = {};
      const actual = sumQuarterlyFFP();
      expect(actual).toEqual(expected);
    });

    test('HIT contractors for 2017, no previous values', () => {
      const expected = {
        total: { inHouse: 0, contractors: 2000, combined: 2000 },
        years: {
          2017: {
            1: { inHouse: 0, contractors: 800, combined: 800 },
            2: { inHouse: 0, contractors: 400, combined: 400 },
            3: { inHouse: 0, contractors: 600, combined: 600 },
            4: { inHouse: 0, contractors: 200, combined: 200 },
            subtotal: { inHouse: 0, contractors: 2000, combined: 2000 }
          },
          2018: {
            1: { inHouse: 0, contractors: 0, combined: 0 },
            2: { inHouse: 0, contractors: 0, combined: 0 },
            3: { inHouse: 0, contractors: 0, combined: 0 },
            4: { inHouse: 0, contractors: 0, combined: 0 },
            subtotal: { inHouse: 0, contractors: 0, combined: 0 }
          },
          2019: {
            1: { inHouse: 0, contractors: 0, combined: 0 },
            2: { inHouse: 0, contractors: 0, combined: 0 },
            3: { inHouse: 0, contractors: 0, combined: 0 },
            4: { inHouse: 0, contractors: 0, combined: 0 },
            subtotal: { inHouse: 0, contractors: 0, combined: 0 }
          }
        }
      };
      const actual = sumQuarterlyFFP({
        quarterlyFFP: {
          total: { inHouse: 0, contractors: 0, combined: 0 },
          years: {
            2017: {
              1: { inHouse: 0, contractors: 0, combined: 0 },
              2: { inHouse: 0, contractors: 0, combined: 0 },
              3: { inHouse: 0, contractors: 0, combined: 0 },
              4: { inHouse: 0, contractors: 0, combined: 0 },
              subtotal: { inHouse: 0, contractors: 0, combined: 0 }
            },
            2018: {
              1: { inHouse: 0, contractors: 0, combined: 0 },
              2: { inHouse: 0, contractors: 0, combined: 0 },
              3: { inHouse: 0, contractors: 0, combined: 0 },
              4: { inHouse: 0, contractors: 0, combined: 0 },
              subtotal: { inHouse: 0, contractors: 0, combined: 0 }
            },
            2019: {
              1: { inHouse: 0, contractors: 0, combined: 0 },
              2: { inHouse: 0, contractors: 0, combined: 0 },
              3: { inHouse: 0, contractors: 0, combined: 0 },
              4: { inHouse: 0, contractors: 0, combined: 0 },
              subtotal: { inHouse: 0, contractors: 0, combined: 0 }
            }
          }
        },
        fundingSource: 'hit',
        fedShareAmount: 2000,
        category: 'contractors',
        year: 2017,
        quarterlyInfo: {
          federalPcts: [0.4, 0.2, 0.3, 0.1],
          qFFPs: [800, 400, 600, 200]
        }
      });
      expect(actual).toEqual(expected);
    });

    test('HIE statePersonnel for 2017 for 2018 expenses and 2017 contractors values', () => {
      const expected = {
        years: {
          2017: {
            1: { inHouse: 300, contractors: 800, combined: 1100 },
            2: { inHouse: 300, contractors: 400, combined: 700 },
            3: { inHouse: 300, contractors: 600, combined: 900 },
            4: { inHouse: 0, contractors: 200, combined: 200 },
            subtotal: { inHouse: 900, contractors: 2000, combined: 2900 }
          },
          2018: {
            1: { inHouse: 250, contractors: 0, combined: 250 },
            2: { inHouse: 250, contractors: 0, combined: 250 },
            3: { inHouse: 250, contractors: 0, combined: 250 },
            4: { inHouse: 250, contractors: 0, combined: 250 },
            subtotal: { inHouse: 1000, contractors: 0, combined: 1000 }
          },
          2019: {
            1: { inHouse: 0, contractors: 0, combined: 0 },
            2: { inHouse: 0, contractors: 0, combined: 0 },
            3: { inHouse: 0, contractors: 0, combined: 0 },
            4: { inHouse: 0, contractors: 0, combined: 0 },
            subtotal: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        total: { inHouse: 1900, contractors: 2000, combined: 3900 }
      };
      const actual = sumQuarterlyFFP({
        quarterlyFFP: {
          years: {
            2017: {
              1: { inHouse: 0, contractors: 800, combined: 800 },
              2: { inHouse: 0, contractors: 400, combined: 400 },
              3: { inHouse: 0, contractors: 600, combined: 600 },
              4: { inHouse: 0, contractors: 200, combined: 200 },
              subtotal: { inHouse: 0, contractors: 2000, combined: 2000 }
            },
            2018: {
              1: { inHouse: 250, contractors: 0, combined: 250 },
              2: { inHouse: 250, contractors: 0, combined: 250 },
              3: { inHouse: 250, contractors: 0, combined: 250 },
              4: { inHouse: 250, contractors: 0, combined: 250 },
              subtotal: { inHouse: 1000, contractors: 0, combined: 1000 }
            },
            2019: {
              1: { inHouse: 0, contractors: 0, combined: 0 },
              2: { inHouse: 0, contractors: 0, combined: 0 },
              3: { inHouse: 0, contractors: 0, combined: 0 },
              4: { inHouse: 0, contractors: 0, combined: 0 },
              subtotal: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          total: { inHouse: 1000, contractors: 2000, combined: 3000 }
        },
        fundingSource: 'hie',
        fedShareAmount: 900,
        category: 'statePersonnel',
        year: 2017,
        quarterlyInfo: {
          federalPcts: [0.33, 0.33, 0.33, 0],
          qFFPs: [300, 300, 300, 0]
        }
      });
      expect(actual).toEqual(expected);
    });

    test('MMIS expenses for 2018 for 2017 contractors values', () => {
      const expected = {
        years: {
          2017: {
            1: { inHouse: 0, contractors: 800, combined: 800 },
            2: { inHouse: 0, contractors: 400, combined: 400 },
            3: { inHouse: 0, contractors: 600, combined: 600 },
            4: { inHouse: 0, contractors: 200, combined: 200 },
            subtotal: { inHouse: 0, contractors: 2000, combined: 2000 }
          },
          2018: {
            1: { inHouse: 250, contractors: 0, combined: 250 },
            2: { inHouse: 250, contractors: 0, combined: 250 },
            3: { inHouse: 250, contractors: 0, combined: 250 },
            4: { inHouse: 250, contractors: 0, combined: 250 },
            subtotal: { inHouse: 1000, contractors: 0, combined: 1000 }
          },
          2019: {
            1: { inHouse: 0, contractors: 0, combined: 0 },
            2: { inHouse: 0, contractors: 0, combined: 0 },
            3: { inHouse: 0, contractors: 0, combined: 0 },
            4: { inHouse: 0, contractors: 0, combined: 0 },
            subtotal: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        total: { inHouse: 1000, contractors: 2000, combined: 3000 }
      };
      const actual = sumQuarterlyFFP({
        quarterlyFFP: {
          years: {
            2017: {
              1: { inHouse: 0, contractors: 800, combined: 800 },
              2: { inHouse: 0, contractors: 400, combined: 400 },
              3: { inHouse: 0, contractors: 600, combined: 600 },
              4: { inHouse: 0, contractors: 200, combined: 200 },
              subtotal: { inHouse: 0, contractors: 2000, combined: 2000 }
            },
            2018: {
              1: { inHouse: 0, contractors: 0, combined: 0 },
              2: { inHouse: 0, contractors: 0, combined: 0 },
              3: { inHouse: 0, contractors: 0, combined: 0 },
              4: { inHouse: 0, contractors: 0, combined: 0 },
              subtotal: { inHouse: 0, contractors: 0, combined: 0 }
            },
            2019: {
              1: { inHouse: 0, contractors: 0, combined: 0 },
              2: { inHouse: 0, contractors: 0, combined: 0 },
              3: { inHouse: 0, contractors: 0, combined: 0 },
              4: { inHouse: 0, contractors: 0, combined: 0 },
              subtotal: { inHouse: 0, contractors: 0, combined: 0 }
            }
          },
          total: { inHouse: 0, contractors: 2000, combined: 2000 }
        },
        fundingSource: 'mmis',
        fedShareAmount: 1000,
        category: 'expenses',
        year: 2018,
        quarterlyInfo: {
          federalPcts: [0.25, 0.25, 0.25, 0.25],
          qFFPs: [250, 250, 250, 250]
        }
      });
      expect(actual).toEqual(expected);
    });
  });
});
