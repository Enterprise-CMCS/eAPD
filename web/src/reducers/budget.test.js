import budget, { initialState as initialStateFn } from './budget';
import { UPDATE_BUDGET } from '../actions/apd';

describe('budget reducer', () => {
  const initialState = {
    combined: { total: { total: 0, federal: 0, state: 0 } },
    hie: {
      combined: { total: { total: 0, federal: 0, state: 0 } },
      contractors: { total: { total: 0, federal: 0, state: 0 } },
      expenses: { total: { total: 0, federal: 0, state: 0 } },
      statePersonnel: { total: { total: 0, federal: 0, state: 0 } }
    },
    hit: {
      combined: { total: { total: 0, federal: 0, state: 0 } },
      contractors: { total: { total: 0, federal: 0, state: 0 } },
      expenses: { total: { total: 0, federal: 0, state: 0 } },
      statePersonnel: { total: { total: 0, federal: 0, state: 0 } }
    },
    mmis: {
      combined: { total: { total: 0, federal: 0, state: 0 } },
      contractors: { total: { total: 0, federal: 0, state: 0 } },
      expenses: { total: { total: 0, federal: 0, state: 0 } },
      statePersonnel: { total: { total: 0, federal: 0, state: 0 } }
    },
    hitAndHie: {
      combined: { total: { federal: 0, state: 0, total: 0 } },
      contractors: { total: { federal: 0, state: 0, total: 0 } },
      expenses: { total: { federal: 0, state: 0, total: 0 } },
      statePersonnel: { total: { federal: 0, state: 0, total: 0 } }
    },
    mmisByFFP: {
      '50-50': { total: { federal: 0, state: 0, total: 0 } },
      '75-25': { total: { federal: 0, state: 0, total: 0 } },
      '90-10': { total: { federal: 0, state: 0, total: 0 } },
      combined: { total: { federal: 0, state: 0, total: 0 } }
    },
    quarterly: { hitAndHie: {}, mmis: {} },
    years: []
  };

  it('should handle initial state', () => {
    expect(budget(undefined, {})).toEqual(initialState);
  });

  it('handles quarterly share updates', () => {
    const state = initialStateFn(['2018']);
    const newState = budget(state, {
      type: 'UPDATE_BUDGET_QUARTERLY_SHARE',
      updates: { hitAndHie: { '2018': { 1: 10 } } }
    });

    expect(newState.quarterly.hitAndHie).toEqual({
      '2018': { 1: 10, 2: 25, 3: 25, 4: 25 }
    });
  });

  it('computes new budget data from state', () => {
    expect(
      budget(null, {
        type: UPDATE_BUDGET,
        state: {
          apd: { data: { years: ['1931', '1932', '1933'] } },
          activities: {
            byId: {
              hieOne: {
                fundingSource: 'HIE',
                years: ['1931', '1932', '1933'],
                costAllocation: {
                  '1931': { ffp: { federal: 90, state: 10 }, other: 0 },
                  '1932': { ffp: { federal: 90, state: 10 }, other: 0 },
                  '1933': { ffp: { federal: 90, state: 10 }, other: 0 }
                },
                contractorResources: [
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } },
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } }
                ],
                expenses: [
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } },
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } }
                ],
                statePersonnel: [
                  {
                    years: {
                      '1931': { amt: 1000, perc: 100 },
                      '1932': { amt: 1000, perc: 100 },
                      '1933': { amt: 1000, perc: 100 }
                    }
                  },
                  {
                    years: {
                      '1931': { amt: 1000, perc: 100 },
                      '1932': { amt: 1000, perc: 100 },
                      '1933': { amt: 1000, perc: 100 }
                    }
                  }
                ]
              },
              hieTwo: {
                fundingSource: 'HIE',
                years: ['1931', '1932', '1933'],
                costAllocation: {
                  '1931': { ffp: { federal: 90, state: 10 }, other: 0 },
                  '1932': { ffp: { federal: 90, state: 10 }, other: 0 },
                  '1933': { ffp: { federal: 90, state: 10 }, other: 0 }
                },
                contractorResources: [
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } }
                ],
                expenses: [
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } }
                ],
                statePersonnel: [
                  {
                    years: {
                      '1931': { amt: 1000, perc: 100 },
                      '1932': { amt: 1000, perc: 100 },
                      '1933': { amt: 1000, perc: 100 }
                    }
                  }
                ]
              },
              hitOne: {
                fundingSource: 'HIT',
                years: ['1931', '1932', '1933'],
                costAllocation: {
                  '1931': { ffp: { federal: 90, state: 10 }, other: 0 },
                  '1932': { ffp: { federal: 90, state: 10 }, other: 0 },
                  '1933': { ffp: { federal: 90, state: 10 }, other: 1000 }
                },
                contractorResources: [
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } }
                ],
                expenses: [
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } }
                ],
                statePersonnel: [
                  {
                    years: {
                      '1931': { amt: 1000, perc: 100 },
                      '1932': { amt: 1000, perc: 100 },
                      '1933': { amt: 1000, perc: 100 }
                    }
                  }
                ]
              },
              mmisOne: {
                fundingSource: 'MMIS',
                years: ['1931', '1932', '1933'],
                costAllocation: {
                  '1931': { ffp: { federal: 50, state: 50 }, other: 1000 },
                  '1932': { ffp: { federal: 75, state: 25 }, other: 1000 },
                  '1933': { ffp: { federal: 90, state: 10 }, other: 0 }
                },
                contractorResources: [
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } }
                ],
                expenses: [
                  { years: { '1931': 1000, '1932': 1000, '1933': 1000 } }
                ],
                statePersonnel: [
                  {
                    years: {
                      '1931': { amt: 1000, perc: 50 },
                      '1932': { amt: 1000, perc: 100 },
                      '1933': { amt: 1000, perc: 10 }
                    }
                  }
                ]
              }
            }
          }
        }
      })
    ).toEqual({
      combined: {
        '1931': { federal: 11550, state: 1950, total: 14500 },
        '1932': { federal: 12300, state: 1700.0100000000002, total: 15000 },
        '1933': { federal: 11790, state: 1310.01, total: 14100 },
        total: { federal: 35640, state: 4960.02, total: 43600 }
      },
      hie: {
        combined: {
          '1931': { federal: 8100, state: 900, total: 9000 },
          '1932': { federal: 8100, state: 900, total: 9000 },
          '1933': { federal: 8100, state: 900, total: 9000 },
          total: { federal: 24300, state: 2700, total: 27000 }
        },
        contractors: {
          '1931': { federal: 2700, state: 300, total: 3000 },
          '1932': { federal: 2700, state: 300, total: 3000 },
          '1933': { federal: 2700, state: 300, total: 3000 },
          total: { federal: 8100, state: 900, total: 9000 }
        },
        expenses: {
          '1931': { federal: 2700, state: 300, total: 3000 },
          '1932': { federal: 2700, state: 300, total: 3000 },
          '1933': { federal: 2700, state: 300, total: 3000 },
          total: { federal: 8100, state: 900, total: 9000 }
        },
        statePersonnel: {
          '1931': { federal: 2700, state: 300, total: 3000 },
          '1932': { federal: 2700, state: 300, total: 3000 },
          '1933': { federal: 2700, state: 300, total: 3000 },
          total: { federal: 8100, state: 900, total: 9000 }
        }
      },
      hit: {
        combined: {
          '1931': { federal: 2700, state: 300, total: 3000 },
          '1932': { federal: 2700, state: 300, total: 3000 },
          '1933': { federal: 1800, state: 200.01, total: 3000 },
          total: { federal: 7200, state: 800.01, total: 9000 }
        },
        contractors: {
          '1931': { federal: 900, state: 100, total: 1000 },
          '1932': { federal: 900, state: 100, total: 1000 },
          '1933': { federal: 600, state: 66.67, total: 1000 },
          total: { federal: 2400, state: 266.67, total: 3000 }
        },
        expenses: {
          '1931': { federal: 900, state: 100, total: 1000 },
          '1932': { federal: 900, state: 100, total: 1000 },
          '1933': { federal: 600, state: 66.67, total: 1000 },
          total: { federal: 2400, state: 266.67, total: 3000 }
        },
        statePersonnel: {
          '1931': { federal: 900, state: 100, total: 1000 },
          '1932': { federal: 900, state: 100, total: 1000 },
          '1933': { federal: 600, state: 66.67, total: 1000 },
          total: { federal: 2400, state: 266.67, total: 3000 }
        }
      },
      hitAndHie: {
        combined: {
          '1931': { federal: 10800, state: 1200, total: 12000 },
          '1932': { federal: 10800, state: 1200, total: 12000 },
          '1933': { federal: 9900, state: 1100.01, total: 12000 },
          total: { federal: 31500, state: 3500.01, total: 36000 }
        },
        contractors: {
          '1931': { federal: 3600, state: 400, total: 4000 },
          '1932': { federal: 3600, state: 400, total: 4000 },
          '1933': { federal: 3300, state: 366.67, total: 4000 },
          total: { federal: 10500, state: 1166.67, total: 12000 }
        },
        expenses: {
          '1931': { federal: 3600, state: 400, total: 4000 },
          '1932': { federal: 3600, state: 400, total: 4000 },
          '1933': { federal: 3300, state: 366.67, total: 4000 },
          total: { federal: 10500, state: 1166.67, total: 12000 }
        },
        statePersonnel: {
          '1931': { federal: 3600, state: 400, total: 4000 },
          '1932': { federal: 3600, state: 400, total: 4000 },
          '1933': { federal: 3300, state: 366.67, total: 4000 },
          total: { federal: 10500, state: 1166.67, total: 12000 }
        }
      },
      mmis: {
        combined: {
          '1931': { federal: 750, state: 750, total: 2500 },
          '1932': { federal: 1500, state: 500.01, total: 3000 },
          '1933': { federal: 1890, state: 210, total: 2100 },
          total: { federal: 4140, state: 1460.0099999999998, total: 7600 }
        },
        contractors: {
          '1931': { federal: 300, state: 300, total: 1000 },
          '1932': { federal: 500, state: 166.67, total: 1000 },
          '1933': { federal: 900, state: 100, total: 1000 },
          total: { federal: 1700, state: 566.67, total: 3000 }
        },
        expenses: {
          '1931': { federal: 300, state: 300, total: 1000 },
          '1932': { federal: 500, state: 166.67, total: 1000 },
          '1933': { federal: 900, state: 100, total: 1000 },
          total: { federal: 1700, state: 566.67, total: 3000 }
        },
        statePersonnel: {
          '1931': { federal: 150, state: 150, total: 500 },
          '1932': { federal: 500, state: 166.67, total: 1000 },
          '1933': { federal: 90, state: 10, total: 100 },
          total: { federal: 740, state: 326.66999999999996, total: 1600 }
        }
      },
      mmisByFFP: {
        '50-50': {
          '1931': { federal: 750, state: 750, total: 2500 },
          '1932': { federal: 0, state: 0, total: 0 },
          '1933': { federal: 0, state: 0, total: 0 },
          total: { federal: 750, state: 750, total: 2500 }
        },
        '75-25': {
          '1931': { federal: 0, state: 0, total: 0 },
          '1932': { federal: 1500, state: 500, total: 3000 },
          '1933': { federal: 0, state: 0, total: 0 },
          total: { federal: 1500, state: 500, total: 3000 }
        },
        '90-10': {
          '1931': { federal: 0, state: 0, total: 0 },
          '1932': { federal: 0, state: 0, total: 0 },
          '1933': { federal: 1890, state: 210, total: 2100 },
          total: { federal: 1890, state: 210, total: 2100 }
        },
        combined: {
          '1931': { federal: 750, state: 750, total: 2500 },
          '1932': { federal: 1500, state: 500, total: 3000 },
          '1933': { federal: 1890, state: 210, total: 2100 },
          total: { federal: 4140, state: 1460, total: 7600 }
        }
      },
      quarterly: {
        hitAndHie: {
          '1931': { '1': 25, '2': 25, '3': 25, '4': 25 },
          '1932': { '1': 25, '2': 25, '3': 25, '4': 25 },
          '1933': { '1': 25, '2': 25, '3': 25, '4': 25 }
        },
        mmis: {
          '1931': { '1': 25, '2': 25, '3': 25, '4': 25 },
          '1932': { '1': 25, '2': 25, '3': 25, '4': 25 },
          '1933': { '1': 25, '2': 25, '3': 25, '4': 25 }
        }
      },
      years: ['1931', '1932', '1933']
    });
  });
});
