import {
  getDefaultFundingSourceObject,
  getDefaultFundingSourceByCategoryObject,
  defaultFederalShareByFFYQuarterObject,
  defaultBudgetObject,
  defaultQuarterlyFFPObject,
  defaultActivityTotalsDataObject,
  getSharesOfTotalMedicaidCost,
  updateStatePersonnel,
  getCostFromItemByYear,
  getPropCostType,
  calculateActivityTotalByCategories
} from './budget';

describe('budget methods', () => {
  describe('getDefaultFundingSourceObject', () => {
    test('with no years', () => {
      const expected = {
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      };
      const actual = getDefaultFundingSourceObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
      const expected = {
        2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
        2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
        total: { total: 0, federal: 0, medicaid: 0, state: 0 }
      };
      const actual = getDefaultFundingSourceObject(['2017', '2018']);
      expect(actual).toEqual(expected);
    });
  });

  describe('getDefaultFundingSourceByCategoryObject', () => {
    test('with no years, no names', () => {
      const expected = {
        statePersonnel: {
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        contractors: {
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        expenses: {
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        combined: {
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        }
      };
      const actual = getDefaultFundingSourceByCategoryObject();
      expect(actual).toEqual(expected);
    });

    test('with years, no names', () => {
      const expected = {
        statePersonnel: {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        contractors: {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        expenses: {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        combined: {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        }
      };
      const actual = getDefaultFundingSourceByCategoryObject([2017, 2018]);
      expect(actual).toEqual(expected);
    });

    test('with years and names', () => {
      const expected = {
        '90-10': {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        '75-25': {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        '50-50': {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        combined: {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        }
      };
      const actual = getDefaultFundingSourceByCategoryObject(
        [2017, 2018],
        ['90-10', '75-25', '50-50', 'combined']
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('defaultFederalShareByFFYQuarterObject', () => {
    test('with no years', () => {
      const expected = {
        total: { inHouse: 0, contractors: 0, combined: 0 }
      };
      const actual = defaultFederalShareByFFYQuarterObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
      const expected = {
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
        total: { inHouse: 0, contractors: 0, combined: 0 }
      };
      const actual = defaultFederalShareByFFYQuarterObject(['2017', '2018']);
      expect(actual).toEqual(expected);
    });
  });

  describe('defaultBudgetObject', () => {
    test('with no years', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        combined: {
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: []
      };
      const actual = defaultBudgetObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
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
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
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
            total: { inHouse: 0, contractors: 0, combined: 0 }
          }
        },
        hie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hit: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmis: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        hitAndHie: {
          statePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mmisByFFP: {
          '90-10': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '75-25': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '50-50': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          '0-100': {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        combined: {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        },
        activityTotals: [],
        activities: {},
        years: [2017, 2018]
      };
      const actual = defaultBudgetObject([2017, 2018]);
      expect(actual).toEqual(expected);
    });
  });

  describe('defaultQuarterlyFFPObject', () => {
    test('with no years', () => {
      const expected = {
        costsByFFY: {
          total: { federal: 0, medicaidShare: 0, state: 0, total: 0 }
        },
        quarterlyFFP: {
          total: { combined: 0, contractors: 0, inHouse: 0 }
        }
      };
      const actual = defaultQuarterlyFFPObject();
      expect(actual).toEqual(expected);
    });
    test('with years', () => {
      const expected = {
        costsByFFY: {
          2017: { federal: 0, medicaidShare: 0, state: 0, total: 0 },
          2018: { federal: 0, medicaidShare: 0, state: 0, total: 0 },
          total: { federal: 0, medicaidShare: 0, state: 0, total: 0 }
        },
        quarterlyFFP: {
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
          },
          total: { combined: 0, contractors: 0, inHouse: 0 }
        }
      };
      const actual = defaultQuarterlyFFPObject([2017, 2018]);
      expect(actual).toEqual(expected);
    });
  });

  describe('defaultActivityTotalsDataObject', () => {
    test('with no years', () => {
      const expected = {
        combined: { total: 0 },
        contractors: { total: 0 },
        expenses: { total: 0 },
        otherFunding: {},
        statePersonnel: { total: 0 }
      };
      const actual = defaultActivityTotalsDataObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
      const expected = {
        combined: { 2017: 0, 2018: 0, total: 0 },
        contractors: { 2017: 0, 2018: 0, total: 0 },
        expenses: { 2017: 0, 2018: 0, total: 0 },
        otherFunding: {
          2017: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
          2018: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
        },
        statePersonnel: { 2017: 0, 2018: 0, total: 0 }
      };
      const actual = defaultActivityTotalsDataObject([2017, 2018]);
      expect(actual).toEqual(expected);
    });
  });

  describe('getSharesOfTotalMedicaidCost', () => {
    test('with no activity, no years, and no amount', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost();
      expect(actual).toEqual(expected);
    });

    test('with activity, no years, no amount', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({
        costAllocation: {
          2017: { ffp: { federal: 75, state: 25 } },
          2018: { ffp: { federal: 50, state: 50 } }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('with activity, years, no amount', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost(
        {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          }
        },
        2017
      );
      expect(actual).toEqual(expected);
    });

    test('with activity, first year, amount', () => {
      const expected = { fedShare: 750, stateShare: 250 };
      const actual = getSharesOfTotalMedicaidCost(
        {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          },
          years: [2017, 2018]
        },
        2017,
        1000
      );
      expect(actual).toEqual(expected);
    });

    test('with activity, second year, amount', () => {
      const expected = { fedShare: 500, stateShare: 500 };
      const actual = getSharesOfTotalMedicaidCost(
        {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          },
          years: [2017, 2018]
        },
        2018,
        1000
      );
      expect(actual).toEqual(expected);
    });

    test('with activity, second year, string amount', () => {
      const expected = { fedShare: 500, stateShare: 500 };
      const actual = getSharesOfTotalMedicaidCost(
        {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          },
          years: [2017, 2018]
        },
        2018,
        '1000'
      );
      expect(actual).toEqual(expected);
    });

    test('with activity, second year, amount that will need rounding', () => {
      const expected = { fedShare: 3110, stateShare: 346 };
      const actual = getSharesOfTotalMedicaidCost(
        {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 90, state: 10 } }
          },
          years: [2017, 2018]
        },
        2018,
        3456
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('updateStatePersonnel', () => {
    test('with default values', () => {
      const expected = [];
      const actual = updateStatePersonnel();
      expect(actual).toEqual(expected);
    });

    test('with name and default statePersonnel and keyPersonnel', () => {
      const expected = [];
      const actual = updateStatePersonnel('name');
      expect(actual).toEqual(expected);
    });

    test('with name and statePersonnel and default keyPersonnel', () => {
      const expected = [
        {
          years: {
            1931: { amt: 1000, perc: 1 },
            1932: { amt: 1000, perc: 0.7 },
            1933: { amt: 1000, perc: 0.4 }
          }
        },
        {
          years: {
            1931: { amt: 1000, perc: 0.4 },
            1932: { amt: 1000, perc: 0.5 },
            1933: { amt: 1000, perc: 0.3 }
          }
        }
      ];
      const actual = updateStatePersonnel('name', [
        {
          years: {
            1931: { amt: 1000, perc: 1 },
            1932: { amt: 1000, perc: 0.7 },
            1933: { amt: 1000, perc: 0.4 }
          }
        },
        {
          years: {
            1931: { amt: 1000, perc: 0.4 },
            1932: { amt: 1000, perc: 0.5 },
            1933: { amt: 1000, perc: 0.3 }
          }
        }
      ]);
      expect(actual).toEqual(expected);
    });
    test('should not add keyPersonnel if name is not Program Administration', () => {
      const expected = [
        {
          years: {
            1931: { amt: 1000, perc: 1 },
            1932: { amt: 1000, perc: 0.7 },
            1933: { amt: 1000, perc: 0.4 }
          }
        },
        {
          years: {
            1931: { amt: 1000, perc: 0.4 },
            1932: { amt: 1000, perc: 0.5 },
            1933: { amt: 1000, perc: 0.3 }
          }
        }
      ];
      const actual = updateStatePersonnel(
        'name',
        [
          {
            years: {
              1931: { amt: 1000, perc: 1 },
              1932: { amt: 1000, perc: 0.7 },
              1933: { amt: 1000, perc: 0.4 }
            }
          },
          {
            years: {
              1931: { amt: 1000, perc: 0.4 },
              1932: { amt: 1000, perc: 0.5 },
              1933: { amt: 1000, perc: 0.3 }
            }
          }
        ],
        [
          {
            costs: { 1931: 150, 1932: 151, 1933: 152 },
            fte: { 1931: 0, 1932: 0.5, 1933: 1 },
            hasCosts: false
          },
          {
            costs: { 1931: 150, 1932: 1500, 1933: 15000 },
            fte: { 1931: 0, 1932: 0.3, 1933: 1 },
            hasCosts: true
          }
        ]
      );
      expect(actual).toEqual(expected);
    });

    test('should add the keyPersonnel that hasCosts to the statePersonnel', () => {
      const expected = [
        {
          years: {
            1931: { amt: 1000, perc: 1 },
            1932: { amt: 1000, perc: 0.7 },
            1933: { amt: 1000, perc: 0.4 }
          }
        },
        {
          years: {
            1931: { amt: 1000, perc: 0.4 },
            1932: { amt: 1000, perc: 0.5 },
            1933: { amt: 1000, perc: 0.3 }
          }
        },
        {
          years: {
            1931: { amt: 150, perc: 0 },
            1932: { amt: 1500, perc: 0.3 },
            1933: { amt: 15000, perc: 1 }
          }
        }
      ];
      const actual = updateStatePersonnel(
        'Program Administration',
        [
          {
            years: {
              1931: { amt: 1000, perc: 1 },
              1932: { amt: 1000, perc: 0.7 },
              1933: { amt: 1000, perc: 0.4 }
            }
          },
          {
            years: {
              1931: { amt: 1000, perc: 0.4 },
              1932: { amt: 1000, perc: 0.5 },
              1933: { amt: 1000, perc: 0.3 }
            }
          }
        ],
        [
          {
            costs: { 1931: 150, 1932: 151, 1933: 152 },
            fte: { 1931: 0, 1932: 0.5, 1933: 1 },
            hasCosts: false
          },
          {
            costs: { 1931: 150, 1932: 1500, 1933: 15000 },
            fte: { 1931: 0, 1932: 0.3, 1933: 1 },
            hasCosts: true
          }
        ]
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('getCostFromItemByYear', () => {
    test('with default values', () => {
      const expected = 0;
      const actual = getCostFromItemByYear();
      expect(actual).toEqual(expected);
    });
    test('with item and default year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear({
        years: {
          1931: { amt: 1000, perc: 1 },
          1932: { amt: 1000, perc: 0.7 },
          1933: { amt: 1000, perc: 0.4 }
        }
      });
      expect(actual).toEqual(expected);
    });
    test('with item that has a value and year', () => {
      const expected = 1300;
      const actual = getCostFromItemByYear(
        {
          years: {
            1931: 1000,
            1932: 1300,
            1933: 900
          }
        },
        1932
      );
      expect(actual).toEqual(expected);
    });
    test('with item that has an object cost and year', () => {
      const expected = 700;
      const actual = getCostFromItemByYear(
        {
          years: {
            1931: { amt: 1000, perc: 1 },
            1932: { amt: 1000, perc: 0.7 },
            1933: { amt: 1000, perc: 0.4 }
          }
        },
        1932
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('getPropCostType', () => {
    test('with default category', () => {
      const expected = 'inHouse';
      const actual = getPropCostType();
      expect(actual).toEqual(expected);
    });
    test('with category that is not contractors', () => {
      const expected = 'inHouse';
      const actual = getPropCostType('expenses');
      expect(actual).toEqual(expected);
    });
    test('with category that is contractors', () => {
      const expected = 'contractors';
      const actual = getPropCostType('contractors');
      expect(actual).toEqual(expected);
    });
  });

  describe('calculateActivityTotalByCategories', () => {
    test('with default values', () => {
      const expected = {};
      const actual = calculateActivityTotalByCategories();
      expect(actual).toEqual(expected);
    });
    test('with item and default activityTotals and category', () => {
      const expected = {
        data: {
          combined: { 2017: 1500, 2018: 1700, 2019: 1600, total: 4800 },
          contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          otherFunding: {
            2017: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2018: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
          },
          statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
        }
      };
      const actual = calculateActivityTotalByCategories([
        { years: { 2017: 1000, 2018: 900, 2019: 600 } },
        { years: { 2017: 500, 2018: 800, 2019: 1000 } }
      ]);
      expect(actual).toEqual(expected);
    });
    test('with item and default activityTotals and no category', () => {
      const expected = {
        data: {
          combined: { 2017: 1500, 2018: 1700, 2019: 1600, total: 4800 },
          contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          otherFunding: {
            2017: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2018: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
          },
          statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
        }
      };
      const actual = calculateActivityTotalByCategories(
        [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        {
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
      );
      expect(actual).toEqual(expected);
    });
    test('with item and activityTotals with values and no category', () => {
      const expected = {
        data: {
          combined: { 2017: 1800, 2018: 1950, 2019: 2350, total: 6100 },
          contractors: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          expenses: { 2017: 0, 2018: 0, 2019: 0, total: 0 },
          otherFunding: {
            2017: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2018: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 },
            2019: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
          },
          statePersonnel: { 2017: 0, 2018: 0, 2019: 0, total: 0 }
        }
      };
      const actual = calculateActivityTotalByCategories(
        [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        {
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
      );
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
      const actual = calculateActivityTotalByCategories(
        [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        {
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
        'expenses'
      );
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
      const actual = calculateActivityTotalByCategories(
        [
          { years: { 2017: 1000, 2018: 900, 2019: 600 } },
          { years: { 2017: 500, 2018: 800, 2019: 1000 } }
        ],
        {
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
        'contractors'
      );
      expect(actual).toEqual(expected);
    });
  });
});
