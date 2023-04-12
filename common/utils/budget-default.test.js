import {
  getDefaultFundingSourceObject,
  getDefaultFundingSourceByCategoryObject,
  getDefaultFundingCategoryByFedStateSplitObject,
  defaultFederalShareByFFYQuarterObject,
  defaultBudgetObject,
  defaultHITECHBudgetObject,
  defaultMMISBudgetObject,
  defaultActivitiesFFPObject,
  defaultHITECHActivitiesFFPObject,
  defaultActivityTotalsDataObject
} from './budget.js';

describe('budget getDefault methods', () => {
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

  describe('getDefaultFundingCategoryByFedStateSplitObject', () => {
    test('with no years, no fedStateSplitOptions', () => {
      const expected = {
        combined: {
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        }
      };
      const actual = getDefaultFundingCategoryByFedStateSplitObject();
      expect(actual).toEqual(expected);
    });

    test('with years, no fedStateSplitOptions', () => {
      const expected = {
        combined: {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        }
      };
      const actual = getDefaultFundingCategoryByFedStateSplitObject([
        2017, 2018
      ]);
      expect(actual).toEqual(expected);
    });

    test('with fedStateSplitOptions, no years', () => {
      const expected = {
        '90-10': {
          keyStatePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          statePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: { total: { total: 0, federal: 0, medicaid: 0, state: 0 } },
          combined: { total: { total: 0, federal: 0, medicaid: 0, state: 0 } }
        },
        '75-25': {
          keyStatePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          statePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: { total: { total: 0, federal: 0, medicaid: 0, state: 0 } },
          combined: { total: { total: 0, federal: 0, medicaid: 0, state: 0 } }
        },
        '50-50': {
          keyStatePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          statePersonnel: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          contractors: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
          expenses: { total: { total: 0, federal: 0, medicaid: 0, state: 0 } },
          combined: { total: { total: 0, federal: 0, medicaid: 0, state: 0 } }
        },
        combined: { total: { total: 0, federal: 0, medicaid: 0, state: 0 } }
      };

      const actual = getDefaultFundingCategoryByFedStateSplitObject(
        [],
        ['90-10', '75-25', '50-50']
      );
      expect(actual).toEqual(expected);
    });

    test('with years and fedStateSplitOptions', () => {
      const expected = {
        '90-10': {
          keyStatePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
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
        '75-25': {
          keyStatePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
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
        '50-50': {
          keyStatePersonnel: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          },
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
        combined: {
          2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
          2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
          total: { total: 0, federal: 0, medicaid: 0, state: 0 }
        }
      };
      const actual = getDefaultFundingCategoryByFedStateSplitObject(
        [2017, 2018],
        ['90-10', '75-25', '50-50']
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('defaultFederalShareByFFYQuarterObject', () => {
    test('with no years', () => {
      const expected = {
        years: {},
        total: { inHouse: 0, contractors: 0, combined: 0 }
      };
      const actual = defaultFederalShareByFFYQuarterObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
      const expected = {
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
          }
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

  describe('defaultHITECHBudgetObject', () => {
    test('with no years', () => {
      const expected = {
        federalShareByFFYQuarter: {
          hitAndHie: {
            years: {},
            total: { inHouse: 0, contractors: 0, combined: 0 }
          },
          mmis: {
            years: {},
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
      const actual = defaultHITECHBudgetObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
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
              }
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
      const actual = defaultHITECHBudgetObject([2017, 2018]);
      expect(actual).toEqual(expected);
    });
  });

  describe('defaultMMISBudgetObject', () => {
    test('with no years', () => {
      const expected = {
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
        ddi: {
          '90-10': {
            keyStatePersonnel: {
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
          '75-25': {
            keyStatePersonnel: {
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
          '50-50': {
            keyStatePersonnel: {
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
          combined: {
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mando: {
          '75-25': {
            keyStatePersonnel: {
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
          '50-50': {
            keyStatePersonnel: {
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
      const actual = defaultMMISBudgetObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
      const expected = {
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
        ddi: {
          '90-10': {
            keyStatePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
          '75-25': {
            keyStatePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
          '50-50': {
            keyStatePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
          combined: {
            2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
            2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
            total: { total: 0, federal: 0, medicaid: 0, state: 0 }
          }
        },
        mando: {
          '75-25': {
            keyStatePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
          '50-50': {
            keyStatePersonnel: {
              2017: { total: 0, federal: 0, medicaid: 0, state: 0 },
              2018: { total: 0, federal: 0, medicaid: 0, state: 0 },
              total: { total: 0, federal: 0, medicaid: 0, state: 0 }
            },
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
      const actual = defaultMMISBudgetObject([2017, 2018]);
      expect(actual).toEqual(expected);
    });
  });

  describe('defaultActivitiesFFPObject', () => {
    test('with no years', () => {
      const expected = {
        costsByFFY: {
          total: { federal: 0, medicaid: 0, state: 0, total: 0 }
        }
      };
      const actual = defaultActivitiesFFPObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
      const expected = {
        costsByFFY: {
          2017: { federal: 0, medicaid: 0, state: 0, total: 0 },
          2018: { federal: 0, medicaid: 0, state: 0, total: 0 },
          total: { federal: 0, medicaid: 0, state: 0, total: 0 }
        }
      };
      const actual = defaultActivitiesFFPObject([2017, 2018]);
      expect(actual).toEqual(expected);
    });
  });

  describe('defaultHITECHActivitiesFFPObject', () => {
    test('with no years', () => {
      const expected = {
        costsByFFY: {
          total: { federal: 0, medicaid: 0, state: 0, total: 0 }
        },
        quarterlyFFP: {
          years: {},
          total: { combined: 0, contractors: 0, inHouse: 0 }
        }
      };
      const actual = defaultHITECHActivitiesFFPObject();
      expect(actual).toEqual(expected);
    });

    test('with years', () => {
      const expected = {
        costsByFFY: {
          2017: { federal: 0, medicaid: 0, state: 0, total: 0 },
          2018: { federal: 0, medicaid: 0, state: 0, total: 0 },
          total: { federal: 0, medicaid: 0, state: 0, total: 0 }
        },
        quarterlyFFP: {
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
          },
          total: { combined: 0, contractors: 0, inHouse: 0 }
        }
      };
      const actual = defaultHITECHActivitiesFFPObject([2017, 2018]);
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
});
