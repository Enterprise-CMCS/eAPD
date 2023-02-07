import {
  getSharesOfTotalMedicaidCost,
  updateStatePersonnel,
  getCostFromItemByYear,
  getPropCostType
} from './budget.js';

describe('budget util methods', () => {
  describe('getSharesOfTotalMedicaidCost', () => {
    test('with no activity, no year, and no amount', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost();
      expect(actual).toEqual(expected);
    });

    test('with year, no activity', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({ year: 2017 });
      expect(actual).toEqual(expected);
    });

    test('with activity with no cost allocation', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({ activity: {} });
      expect(actual).toEqual(expected);
    });

    test('with activity with cost allocation with no years', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: { costAllocation: {} }
      });
      expect(actual).toEqual(expected);
    });

    test('with activity with cost allocation with matching year without ffp', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: {}
          }
        },
        year: 2017
      });
      expect(actual).toEqual(expected);
    });

    test('with activity with cost allocation with ffp no state or federal', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: { ffp: {} }
          }
        },
        year: 2017
      });
      expect(actual).toEqual(expected);
    });

    test('with activity with cost allocation no matching year', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          }
        },
        year: 2019
      });
      expect(actual).toEqual(expected);
    });

    test('with activity, no years, no amount', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          }
        }
      });
      expect(actual).toEqual(expected);
    });

    test('with activity, years, no amount', () => {
      const expected = { fedShare: 0, stateShare: 0 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          }
        },
        year: 2017
      });
      expect(actual).toEqual(expected);
    });

    test('with activity, first year, amount', () => {
      const expected = { fedShare: 750, stateShare: 250 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          },
          years: [2017, 2018]
        },
        year: 2017,
        amount: 1000
      });
      expect(actual).toEqual(expected);
    });

    test('with activity, second year, amount', () => {
      const expected = { fedShare: 500, stateShare: 500 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          },
          years: [2017, 2018]
        },
        year: 2018,
        amount: 1000
      });
      expect(actual).toEqual(expected);
    });

    test('with activity, second year, string amount', () => {
      const expected = { fedShare: 500, stateShare: 500 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 50, state: 50 } }
          },
          years: [2017, 2018]
        },
        year: 2018,
        amount: '1000'
      });
      expect(actual).toEqual(expected);
    });

    test('with activity, second year, amount that will need rounding', () => {
      const expected = { fedShare: 3110, stateShare: 346 };
      const actual = getSharesOfTotalMedicaidCost({
        activity: {
          costAllocation: {
            2017: { ffp: { federal: 75, state: 25 } },
            2018: { ffp: { federal: 90, state: 10 } }
          },
          years: [2017, 2018]
        },
        year: 2018,
        amount: 3456
      });
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
      const actual = updateStatePersonnel({ name: 'name' });
      expect(actual).toEqual(expected);
    });

    test('with name and keyPersonnel, and non-array statePersonnel', () => {
      const expected = [];
      const actual = updateStatePersonnel({
        name: 'Program Administration',
        statePersonnel: 'statePersonnel',
        keyPersonnel: [
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
      });
      expect(actual).toEqual(expected);
    });

    test('with name and keyPersonnel, and non-array statePersonnel', () => {
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
      const actual = updateStatePersonnel({
        name: 'Program Administration',
        statePersonnel: [
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
        keyPersonnel: 'keyPersonnel'
      });
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
      const actual = updateStatePersonnel({
        name: 'name',
        statePersonnel: [
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
        ]
      });
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
      const actual = updateStatePersonnel({
        name: 'name',
        statePersonnel: [
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
        keyPersonnel: [
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
      });
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
      const actual = updateStatePersonnel({
        name: 'Program Administration',
        statePersonnel: [
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
        keyPersonnel: [
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
      });
      expect(actual).toEqual(expected);
    });

    test('should handle invalid keyPersonnel that hasCosts to the statePersonnel', () => {
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
          years: {}
        }
      ];
      const actual = updateStatePersonnel({
        name: 'Program Administration',
        statePersonnel: [
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
        keyPersonnel: [
          {
            costs: { 1931: 150, 1932: 151, 1933: 152 },
            fte: { 1931: 0, 1932: 0.5, 1933: 1 },
            hasCosts: false
          },
          {
            hasCosts: true
          }
        ]
      });
      expect(actual).toEqual(expected);
    });

    test('should handle keyPersonnel (costs, no fte) that hasCosts to the statePersonnel', () => {
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
            1932: { amt: 151, perc: 0 },
            1933: { amt: 152, perc: 0 }
          }
        }
      ];
      const actual = updateStatePersonnel({
        name: 'Program Administration',
        statePersonnel: [
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
        keyPersonnel: [
          {
            costs: { 1931: 150, 1932: 151, 1933: 152 },
            fte: { 1931: 0, 1932: 0.5, 1933: 1 },
            hasCosts: false
          },
          {
            costs: { 1931: 150, 1932: 151, 1933: 152 },
            hasCosts: true
          }
        ]
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('getCostFromItemByYear', () => {
    test('with default values', () => {
      const expected = 0;
      const actual = getCostFromItemByYear();
      expect(actual).toEqual(expected);
    });

    test('with empty item object and year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear({}, 1931);
      expect(actual).toEqual(expected);
    });

    test('with item with empty years object and year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear({ years: {} }, 1931);
      expect(actual).toEqual(expected);
    });

    test('with item with empty object for year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear({ years: { 1931: {} } }, 1931);
      expect(actual).toEqual(expected);
    });

    test('with item with undefined amount for year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear(
        { years: { 1931: { perc: 0.3 } } },
        1931
      );
      expect(actual).toEqual(expected);
    });

    test('with item with empty amount for year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear(
        { years: { 1931: { amt: null, perc: 0.3 } } },
        1931
      );
      expect(actual).toEqual(expected);
    });

    test('with item with undefined perc for year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear(
        { years: { 1931: { amount: 1000 } } },
        1931
      );
      expect(actual).toEqual(expected);
    });

    test('with item with empty perc for year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear(
        { years: { 1931: { amount: 1000, perc: null } } },
        1931
      );
      expect(actual).toEqual(expected);
    });

    test('with item that an object with empty values for year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear(
        {
          years: {
            1931: 1000,
            1932: 1300,
            1933: { amt: null, perc: null }
          }
        },
        1933
      );
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
    test('with item that has a value and invalid year', () => {
      const expected = 0;
      const actual = getCostFromItemByYear(
        {
          years: {
            1931: 1000,
            1932: 1300,
            1933: 900
          }
        },
        1934
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

    test('with bad category', () => {
      const expected = 'inHouse';
      const actual = getPropCostType('bad category');
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
});
