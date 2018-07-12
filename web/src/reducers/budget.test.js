import budget, { initialState as initialStateFn } from './budget';
import { UPDATE_BUDGET } from '../actions/apd';

describe('budget reducer', () => {
  const initialState = {
    combined: { total: { total: 0, federal: 0, state: 0 } },
    federalShareByFFYQuarter: {
      hitAndHie: {
        total: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
      },
      mmis: {
        total: { contractors: 0, expenses: 0, statePersonnel: 0, total: 0 }
      }
    },
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
    activityTotals: [],
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
                id: 1,
                name: 'hieOne',
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
                id: 2,
                name: 'hieTwo',
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
                id: 3,
                name: 'hitOne',
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
                id: 4,
                name: 'mmisOne',
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
      federalShareByFFYQuarter: {
        hitAndHie: {
          '1931': {
            '1': {
              percent: 25,
              contractors: 900,
              expenses: 900,
              statePersonnel: 900,
              total: 2700
            },
            '2': {
              percent: 25,
              contractors: 900,
              expenses: 900,
              statePersonnel: 900,
              total: 2700
            },
            '3': {
              percent: 25,
              contractors: 900,
              expenses: 900,
              statePersonnel: 900,
              total: 2700
            },
            '4': {
              percent: 25,
              contractors: 900,
              expenses: 900,
              statePersonnel: 900,
              total: 2700
            },
            subtotal: {
              contractors: 3600,
              expenses: 3600,
              statePersonnel: 3600,
              total: 10800
            }
          },
          '1932': {
            '1': {
              percent: 25,
              contractors: 900,
              expenses: 900,
              statePersonnel: 900,
              total: 2700
            },
            '2': {
              percent: 25,
              contractors: 900,
              expenses: 900,
              statePersonnel: 900,
              total: 2700
            },
            '3': {
              percent: 25,
              contractors: 900,
              expenses: 900,
              statePersonnel: 900,
              total: 2700
            },
            '4': {
              percent: 25,
              contractors: 900,
              expenses: 900,
              statePersonnel: 900,
              total: 2700
            },
            subtotal: {
              contractors: 3600,
              expenses: 3600,
              statePersonnel: 3600,
              total: 10800
            }
          },
          '1933': {
            '1': {
              percent: 25,
              contractors: 825,
              expenses: 825,
              statePersonnel: 825,
              total: 2475
            },
            '2': {
              percent: 25,
              contractors: 825,
              expenses: 825,
              statePersonnel: 825,
              total: 2475
            },
            '3': {
              percent: 25,
              contractors: 825,
              expenses: 825,
              statePersonnel: 825,
              total: 2475
            },
            '4': {
              percent: 25,
              contractors: 825,
              expenses: 825,
              statePersonnel: 825,
              total: 2475
            },
            subtotal: {
              contractors: 3300,
              expenses: 3300,
              statePersonnel: 3300,
              total: 9900
            }
          },
          total: {
            contractors: 10500,
            expenses: 10500,
            statePersonnel: 10500,
            total: 31500
          }
        },
        mmis: {
          '1931': {
            '1': {
              percent: 25,
              contractors: 75,
              expenses: 75,
              statePersonnel: 37.5,
              total: 187.5
            },
            '2': {
              percent: 25,
              contractors: 75,
              expenses: 75,
              statePersonnel: 37.5,
              total: 187.5
            },
            '3': {
              percent: 25,
              contractors: 75,
              expenses: 75,
              statePersonnel: 37.5,
              total: 187.5
            },
            '4': {
              percent: 25,
              contractors: 75,
              expenses: 75,
              statePersonnel: 37.5,
              total: 187.5
            },
            subtotal: {
              contractors: 300,
              expenses: 300,
              statePersonnel: 150,
              total: 750
            }
          },
          '1932': {
            '1': {
              percent: 25,
              contractors: 125,
              expenses: 125,
              statePersonnel: 125,
              total: 375
            },
            '2': {
              percent: 25,
              contractors: 125,
              expenses: 125,
              statePersonnel: 125,
              total: 375
            },
            '3': {
              percent: 25,
              contractors: 125,
              expenses: 125,
              statePersonnel: 125,
              total: 375
            },
            '4': {
              percent: 25,
              contractors: 125,
              expenses: 125,
              statePersonnel: 125,
              total: 375
            },
            subtotal: {
              contractors: 500,
              expenses: 500,
              statePersonnel: 500,
              total: 1500
            }
          },
          '1933': {
            '1': {
              percent: 25,
              contractors: 225,
              expenses: 225,
              statePersonnel: 22.5,
              total: 472.5
            },
            '2': {
              percent: 25,
              contractors: 225,
              expenses: 225,
              statePersonnel: 22.5,
              total: 472.5
            },
            '3': {
              percent: 25,
              contractors: 225,
              expenses: 225,
              statePersonnel: 22.5,
              total: 472.5
            },
            '4': {
              percent: 25,
              contractors: 225,
              expenses: 225,
              statePersonnel: 22.5,
              total: 472.5
            },
            subtotal: {
              contractors: 900,
              expenses: 900,
              statePersonnel: 90,
              total: 1890
            }
          },
          total: {
            contractors: 1700,
            expenses: 1700,
            statePersonnel: 740,
            total: 4140
          }
        }
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
      activityTotals: [
        {
          id: 1,
          name: 'hieOne',
          fundingSource: 'HIE',
          data: {
            statePersonnel: {
              '1931': 2000,
              '1932': 2000,
              '1933': 2000,
              total: 6000
            },
            contractors: {
              '1931': 2000,
              '1932': 2000,
              '1933': 2000,
              total: 6000
            },
            expenses: { '1931': 2000, '1932': 2000, '1933': 2000, total: 6000 },
            combined: { '1931': 6000, '1932': 6000, '1933': 6000, total: 18000 }
          }
        },
        {
          id: 2,
          name: 'hieTwo',
          fundingSource: 'HIE',
          data: {
            statePersonnel: {
              '1931': 1000,
              '1932': 1000,
              '1933': 1000,
              total: 3000
            },
            contractors: {
              '1931': 1000,
              '1932': 1000,
              '1933': 1000,
              total: 3000
            },
            expenses: { '1931': 1000, '1932': 1000, '1933': 1000, total: 3000 },
            combined: { '1931': 3000, '1932': 3000, '1933': 3000, total: 9000 }
          }
        },
        {
          id: 3,
          name: 'hitOne',
          fundingSource: 'HIT',
          data: {
            statePersonnel: {
              '1931': 1000,
              '1932': 1000,
              '1933': 1000,
              total: 3000
            },
            contractors: {
              '1931': 1000,
              '1932': 1000,
              '1933': 1000,
              total: 3000
            },
            expenses: { '1931': 1000, '1932': 1000, '1933': 1000, total: 3000 },
            combined: { '1931': 3000, '1932': 3000, '1933': 3000, total: 9000 }
          }
        },
        {
          id: 4,
          name: 'mmisOne',
          fundingSource: 'MMIS',
          data: {
            statePersonnel: {
              '1931': 500,
              '1932': 1000,
              '1933': 100,
              total: 1600
            },
            contractors: {
              '1931': 1000,
              '1932': 1000,
              '1933': 1000,
              total: 3000
            },
            expenses: { '1931': 1000, '1932': 1000, '1933': 1000, total: 3000 },
            combined: { '1931': 2500, '1932': 3000, '1933': 2100, total: 7600 }
          }
        }
      ],
      years: ['1931', '1932', '1933']
    });
  });
});
