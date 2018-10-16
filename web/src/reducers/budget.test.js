import budget from './budget';
import { UPDATE_BUDGET } from '../actions/apd';

describe('budget reducer', () => {
  const initialState = {
    activities: {},
    combined: { total: { total: 0, federal: 0, state: 0 } },
    federalShareByFFYQuarter: {
      hitAndHie: {
        total: { contractors: 0, state: 0, combined: 0 }
      },
      mmis: {
        total: { contractors: 0, state: 0, combined: 0 }
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
    activityTotals: [],
    years: []
  };

  it('should handle initial state', () => {
    expect(budget(undefined, {})).toEqual(initialState);
  });

  it('computes new budget data from state', () => {
    expect(
      budget(null, {
        type: UPDATE_BUDGET,
        state: {
          apd: { data: { years: ['1931', '1932', '1933'] } },
          activities: {
            byKey: {
              '1': {
                id: 1,
                key: '1',
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
                      '1931': { amt: 1000, perc: 1 },
                      '1932': { amt: 1000, perc: 0.7 },
                      '1933': { amt: 1000, perc: 0.4 }
                    }
                  },
                  {
                    years: {
                      '1931': { amt: 1000, perc: 0.4 },
                      '1932': { amt: 1000, perc: 0.5 },
                      '1933': { amt: 1000, perc: 0.3 }
                    }
                  }
                ],
                quarterlyFFP: {
                  '1931': {
                    '1': { state: 30, contractors: 40 },
                    '2': { state: 20, contractors: 20 },
                    '3': { state: 40, contractors: 30 },
                    '4': { state: 10, contractors: 10 }
                  },
                  '1932': {
                    '1': { state: 25, contractors: 50 },
                    '2': { state: 25, contractors: 20 },
                    '3': { state: 25, contractors: 20 },
                    '4': { state: 25, contractors: 10 }
                  },
                  '1933': {
                    '1': { state: 10, contractors: 40 },
                    '2': { state: 20, contractors: 30 },
                    '3': { state: 30, contractors: 20 },
                    '4': { state: 40, contractors: 10 }
                  }
                }
              },
              '2': {
                id: 2,
                key: '2',
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
                      '1931': { amt: 1000, perc: 1 },
                      '1932': { amt: 1000, perc: 1 },
                      '1933': { amt: 1000, perc: 1 }
                    }
                  }
                ],
                quarterlyFFP: {
                  '1931': {
                    '1': { state: 25, contractors: 50 },
                    '2': { state: 25, contractors: 20 },
                    '3': { state: 25, contractors: 20 },
                    '4': { state: 25, contractors: 10 }
                  },
                  '1932': {
                    '1': { state: 30, contractors: 40 },
                    '2': { state: 20, contractors: 20 },
                    '3': { state: 40, contractors: 30 },
                    '4': { state: 10, contractors: 10 }
                  },
                  '1933': {
                    '1': { state: 10, contractors: 40 },
                    '2': { state: 20, contractors: 30 },
                    '3': { state: 30, contractors: 20 },
                    '4': { state: 40, contractors: 10 }
                  }
                }
              },
              '3': {
                id: 3,
                key: '3',
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
                      '1931': { amt: 1000, perc: 1 },
                      '1932': { amt: 1000, perc: 1 },
                      '1933': { amt: 1000, perc: 1 }
                    }
                  }
                ],
                quarterlyFFP: {
                  '1931': {
                    '1': { state: 10, contractors: 40 },
                    '2': { state: 20, contractors: 30 },
                    '3': { state: 30, contractors: 20 },
                    '4': { state: 40, contractors: 10 }
                  },
                  '1932': {
                    '1': { state: 25, contractors: 50 },
                    '2': { state: 25, contractors: 20 },
                    '3': { state: 25, contractors: 20 },
                    '4': { state: 25, contractors: 10 }
                  },
                  '1933': {
                    '1': { state: 30, contractors: 40 },
                    '2': { state: 20, contractors: 20 },
                    '3': { state: 40, contractors: 30 },
                    '4': { state: 10, contractors: 30 }
                  }
                }
              },
              '4': {
                id: 4,
                key: '4',
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
                      '1931': { amt: 1000, perc: 0.5 },
                      '1932': { amt: 1000, perc: 1 },
                      '1933': { amt: 1000, perc: 0.1 }
                    }
                  }
                ],
                quarterlyFFP: {
                  '1931': {
                    '1': { state: 10, contractors: 40 },
                    '2': { state: 20, contractors: 30 },
                    '3': { state: 30, contractors: 20 },
                    '4': { state: 40, contractors: 10 }
                  },
                  '1932': {
                    '1': { state: 30, contractors: 40 },
                    '2': { state: 20, contractors: 20 },
                    '3': { state: 40, contractors: 30 },
                    '4': { state: 10, contractors: 30 }
                  },
                  '1933': {
                    '1': { state: 25, contractors: 50 },
                    '2': { state: 25, contractors: 20 },
                    '3': { state: 25, contractors: 20 },
                    '4': { state: 25, contractors: 10 }
                  }
                }
              }
            }
          }
        }
      })
    ).toEqual({
      activities: {
        '1': {
          quarterlyFFP: {
            '1931': {
              '1': {
                state: { dollars: 918, percent: 0.3 },
                contractors: { dollars: 720, percent: 0.4 },
                combined: { dollars: 1638, percent: 0 }
              },
              '2': {
                state: { dollars: 612, percent: 0.2 },
                contractors: { dollars: 360, percent: 0.2 },
                combined: { dollars: 972, percent: 0 }
              },
              '3': {
                state: { dollars: 1224, percent: 0.4 },
                contractors: { dollars: 540, percent: 0.3 },
                combined: { dollars: 1764, percent: 0 }
              },
              '4': {
                state: { dollars: 306, percent: 0.1 },
                contractors: { dollars: 180, percent: 0.1 },
                combined: { dollars: 486, percent: 0 }
              },
              subtotal: {
                state: { dollars: 3060, percent: 1 },
                contractors: { dollars: 1800, percent: 1 },
                combined: { dollars: 4860, percent: 0 }
              }
            },
            '1932': {
              '1': {
                state: { dollars: 720, percent: 0.25 },
                contractors: { dollars: 900, percent: 0.5 },
                combined: { dollars: 1620, percent: 0 }
              },
              '2': {
                state: { dollars: 720, percent: 0.25 },
                contractors: { dollars: 360, percent: 0.2 },
                combined: { dollars: 1080, percent: 0 }
              },
              '3': {
                state: { dollars: 720, percent: 0.25 },
                contractors: { dollars: 360, percent: 0.2 },
                combined: { dollars: 1080, percent: 0 }
              },
              '4': {
                state: { dollars: 720, percent: 0.25 },
                contractors: { dollars: 180, percent: 0.1 },
                combined: { dollars: 900, percent: 0 }
              },
              subtotal: {
                state: { dollars: 2880, percent: 1 },
                contractors: { dollars: 1800, percent: 1 },
                combined: { dollars: 4680, percent: 0 }
              }
            },
            '1933': {
              '1': {
                state: { dollars: 243, percent: 0.1 },
                contractors: { dollars: 720, percent: 0.4 },
                combined: { dollars: 963, percent: 0 }
              },
              '2': {
                state: { dollars: 486, percent: 0.2 },
                contractors: { dollars: 540, percent: 0.3 },
                combined: { dollars: 1026, percent: 0 }
              },
              '3': {
                state: { dollars: 729, percent: 0.3 },
                contractors: { dollars: 360, percent: 0.2 },
                combined: { dollars: 1089, percent: 0 }
              },
              '4': {
                state: { dollars: 972, percent: 0.4 },
                contractors: { dollars: 180, percent: 0.1 },
                combined: { dollars: 1152, percent: 0 }
              },
              subtotal: {
                state: { dollars: 2430, percent: 1 },
                contractors: { dollars: 1800, percent: 1 },
                combined: { dollars: 4230, percent: 0 }
              }
            },
            total: { state: 8370, contractors: 5400, combined: 13770 }
          }
        },
        '2': {
          quarterlyFFP: {
            '1931': {
              '1': {
                state: { dollars: 450, percent: 0.25 },
                contractors: { dollars: 450, percent: 0.5 },
                combined: { dollars: 900, percent: 0 }
              },
              '2': {
                state: { dollars: 450, percent: 0.25 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 630, percent: 0 }
              },
              '3': {
                state: { dollars: 450, percent: 0.25 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 630, percent: 0 }
              },
              '4': {
                state: { dollars: 450, percent: 0.25 },
                contractors: { dollars: 90, percent: 0.1 },
                combined: { dollars: 540, percent: 0 }
              },
              subtotal: {
                state: { dollars: 1800, percent: 1 },
                contractors: { dollars: 900, percent: 1 },
                combined: { dollars: 2700, percent: 0 }
              }
            },
            '1932': {
              '1': {
                state: { dollars: 540, percent: 0.3 },
                contractors: { dollars: 360, percent: 0.4 },
                combined: { dollars: 900, percent: 0 }
              },
              '2': {
                state: { dollars: 360, percent: 0.2 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 540, percent: 0 }
              },
              '3': {
                state: { dollars: 720, percent: 0.4 },
                contractors: { dollars: 270, percent: 0.3 },
                combined: { dollars: 990, percent: 0 }
              },
              '4': {
                state: { dollars: 180, percent: 0.1 },
                contractors: { dollars: 90, percent: 0.1 },
                combined: { dollars: 270, percent: 0 }
              },
              subtotal: {
                state: { dollars: 1800, percent: 1 },
                contractors: { dollars: 900, percent: 1 },
                combined: { dollars: 2700, percent: 0 }
              }
            },
            '1933': {
              '1': {
                state: { dollars: 180, percent: 0.1 },
                contractors: { dollars: 360, percent: 0.4 },
                combined: { dollars: 540, percent: 0 }
              },
              '2': {
                state: { dollars: 360, percent: 0.2 },
                contractors: { dollars: 270, percent: 0.3 },
                combined: { dollars: 630, percent: 0 }
              },
              '3': {
                state: { dollars: 540, percent: 0.3 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 720, percent: 0 }
              },
              '4': {
                state: { dollars: 720, percent: 0.4 },
                contractors: { dollars: 90, percent: 0.1 },
                combined: { dollars: 810, percent: 0 }
              },
              subtotal: {
                state: { dollars: 1800, percent: 1 },
                contractors: { dollars: 900, percent: 1 },
                combined: { dollars: 2700, percent: 0 }
              }
            },
            total: { state: 5400, contractors: 2700, combined: 8100 }
          }
        },
        '3': {
          quarterlyFFP: {
            '1931': {
              '1': {
                state: { dollars: 180, percent: 0.1 },
                contractors: { dollars: 360, percent: 0.4 },
                combined: { dollars: 540, percent: 0 }
              },
              '2': {
                state: { dollars: 360, percent: 0.2 },
                contractors: { dollars: 270, percent: 0.3 },
                combined: { dollars: 630, percent: 0 }
              },
              '3': {
                state: { dollars: 540, percent: 0.3 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 720, percent: 0 }
              },
              '4': {
                state: { dollars: 720, percent: 0.4 },
                contractors: { dollars: 90, percent: 0.1 },
                combined: { dollars: 810, percent: 0 }
              },
              subtotal: {
                state: { dollars: 1800, percent: 1 },
                contractors: { dollars: 900, percent: 1 },
                combined: { dollars: 2700, percent: 0 }
              }
            },
            '1932': {
              '1': {
                state: { dollars: 450, percent: 0.25 },
                contractors: { dollars: 450, percent: 0.5 },
                combined: { dollars: 900, percent: 0 }
              },
              '2': {
                state: { dollars: 450, percent: 0.25 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 630, percent: 0 }
              },
              '3': {
                state: { dollars: 450, percent: 0.25 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 630, percent: 0 }
              },
              '4': {
                state: { dollars: 450, percent: 0.25 },
                contractors: { dollars: 90, percent: 0.1 },
                combined: { dollars: 540, percent: 0 }
              },
              subtotal: {
                state: { dollars: 1800, percent: 1 },
                contractors: { dollars: 900, percent: 1 },
                combined: { dollars: 2700, percent: 0 }
              }
            },
            '1933': {
              '1': {
                state: { dollars: 360, percent: 0.3 },
                contractors: { dollars: 240, percent: 0.4 },
                combined: { dollars: 600, percent: 0 }
              },
              '2': {
                state: { dollars: 240, percent: 0.2 },
                contractors: { dollars: 120, percent: 0.2 },
                combined: { dollars: 360, percent: 0 }
              },
              '3': {
                state: { dollars: 480, percent: 0.4 },
                contractors: { dollars: 180, percent: 0.3 },
                combined: { dollars: 660, percent: 0 }
              },
              '4': {
                state: { dollars: 120, percent: 0.1 },
                contractors: { dollars: 180, percent: 0.3 },
                combined: { dollars: 300, percent: 0 }
              },
              subtotal: {
                state: { dollars: 1200, percent: 1 },
                contractors: { dollars: 720, percent: 1.2 },
                combined: { dollars: 1920, percent: 0 }
              }
            },
            total: { state: 4800, contractors: 2520, combined: 7320 }
          }
        },
        '4': {
          quarterlyFFP: {
            '1931': {
              '1': {
                state: { dollars: 45, percent: 0.1 },
                contractors: { dollars: 120, percent: 0.4 },
                combined: { dollars: 165, percent: 0 }
              },
              '2': {
                state: { dollars: 90, percent: 0.2 },
                contractors: { dollars: 90, percent: 0.3 },
                combined: { dollars: 180, percent: 0 }
              },
              '3': {
                state: { dollars: 135, percent: 0.3 },
                contractors: { dollars: 60, percent: 0.2 },
                combined: { dollars: 195, percent: 0 }
              },
              '4': {
                state: { dollars: 180, percent: 0.4 },
                contractors: { dollars: 30, percent: 0.1 },
                combined: { dollars: 210, percent: 0 }
              },
              subtotal: {
                state: { dollars: 450, percent: 1 },
                contractors: { dollars: 300, percent: 1 },
                combined: { dollars: 750, percent: 0 }
              }
            },
            '1932': {
              '1': {
                state: { dollars: 300, percent: 0.3 },
                contractors: { dollars: 200, percent: 0.4 },
                combined: { dollars: 500, percent: 0 }
              },
              '2': {
                state: { dollars: 200, percent: 0.2 },
                contractors: { dollars: 100, percent: 0.2 },
                combined: { dollars: 300, percent: 0 }
              },
              '3': {
                state: { dollars: 400, percent: 0.4 },
                contractors: { dollars: 150, percent: 0.3 },
                combined: { dollars: 550, percent: 0 }
              },
              '4': {
                state: { dollars: 100, percent: 0.1 },
                contractors: { dollars: 150, percent: 0.3 },
                combined: { dollars: 250, percent: 0 }
              },
              subtotal: {
                state: { dollars: 1000, percent: 1 },
                contractors: { dollars: 600, percent: 1.2 },
                combined: { dollars: 1600, percent: 0 }
              }
            },
            '1933': {
              '1': {
                state: { dollars: 247, percent: 0.25 },
                contractors: { dollars: 450, percent: 0.5 },
                combined: { dollars: 697, percent: 0 }
              },
              '2': {
                state: { dollars: 247, percent: 0.25 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 427, percent: 0 }
              },
              '3': {
                state: { dollars: 248, percent: 0.25 },
                contractors: { dollars: 180, percent: 0.2 },
                combined: { dollars: 428, percent: 0 }
              },
              '4': {
                state: { dollars: 248, percent: 0.25 },
                contractors: { dollars: 90, percent: 0.1 },
                combined: { dollars: 338, percent: 0 }
              },
              subtotal: {
                state: { dollars: 990, percent: 1 },
                contractors: { dollars: 900, percent: 1 },
                combined: { dollars: 1890, percent: 0 }
              }
            },
            total: { state: 2440, contractors: 1800, combined: 4240 }
          }
        }
      },
      combined: {
        '1931': { federal: 11010, state: 1890, total: 13900 },
        '1932': { federal: 11580, state: 1620, total: 14200 },
        '1933': { federal: 10620, state: 1180, total: 12800 },
        total: { federal: 33210, state: 4690, total: 40900 }
      },
      federalShareByFFYQuarter: {
        hitAndHie: {
          '1931': {
            '1': { contractors: 1530, state: 1548, combined: 3078 },
            '2': { contractors: 810, state: 1422, combined: 2232 },
            '3': { contractors: 900, state: 2214, combined: 3114 },
            '4': { contractors: 360, state: 1476, combined: 1836 },
            subtotal: { contractors: 3600, state: 6660, combined: 10260 }
          },
          '1932': {
            '1': { contractors: 1710, state: 1710, combined: 3420 },
            '2': { contractors: 720, state: 1530, combined: 2250 },
            '3': { contractors: 810, state: 1890, combined: 2700 },
            '4': { contractors: 360, state: 1350, combined: 1710 },
            subtotal: { contractors: 3600, state: 6480, combined: 10080 }
          },
          '1933': {
            '1': { contractors: 1320, state: 783, combined: 2103 },
            '2': { contractors: 930, state: 1086, combined: 2016 },
            '3': { contractors: 720, state: 1749, combined: 2469 },
            '4': { contractors: 450, state: 1812, combined: 2262 },
            subtotal: { contractors: 3420, state: 5430, combined: 8850 }
          },
          total: { contractors: 10620, state: 18570, combined: 29190 }
        },
        mmis: {
          '1931': {
            '1': { contractors: 120, state: 45, combined: 165 },
            '2': { contractors: 90, state: 90, combined: 180 },
            '3': { contractors: 60, state: 135, combined: 195 },
            '4': { contractors: 30, state: 180, combined: 210 },
            subtotal: { contractors: 300, state: 450, combined: 750 }
          },
          '1932': {
            '1': { contractors: 200, state: 300, combined: 500 },
            '2': { contractors: 100, state: 200, combined: 300 },
            '3': { contractors: 150, state: 400, combined: 550 },
            '4': { contractors: 150, state: 100, combined: 250 },
            subtotal: { contractors: 600, state: 1000, combined: 1600 }
          },
          '1933': {
            '1': { contractors: 450, state: 247, combined: 697 },
            '2': { contractors: 180, state: 247, combined: 427 },
            '3': { contractors: 180, state: 248, combined: 428 },
            '4': { contractors: 90, state: 248, combined: 338 },
            subtotal: { contractors: 900, state: 990, combined: 1890 }
          },
          total: { contractors: 1800, state: 2440, combined: 4240 }
        }
      },
      hie: {
        combined: {
          '1931': { federal: 7560, state: 840, total: 8400 },
          '1932': { federal: 7380, state: 820, total: 8200 },
          '1933': { federal: 6930, state: 770, total: 7700 },
          total: { federal: 21870, state: 2430, total: 24300 }
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
          '1931': { federal: 2160, state: 240, total: 2400 },
          '1932': { federal: 1980, state: 220, total: 2200 },
          '1933': { federal: 1530, state: 170, total: 1700 },
          total: { federal: 5670, state: 630, total: 6300 }
        }
      },
      hit: {
        combined: {
          '1931': { federal: 2700, state: 300, total: 3000 },
          '1932': { federal: 2700, state: 300, total: 3000 },
          '1933': { federal: 1800, state: 200, total: 3000 },
          total: { federal: 7200, state: 800, total: 9000 }
        },
        contractors: {
          '1931': { federal: 900, state: 100, total: 1000 },
          '1932': { federal: 900, state: 100, total: 1000 },
          '1933': { federal: 600, state: 66, total: 1000 },
          total: { federal: 2400, state: 266, total: 3000 }
        },
        expenses: {
          '1931': { federal: 900, state: 100, total: 1000 },
          '1932': { federal: 900, state: 100, total: 1000 },
          '1933': { federal: 600, state: 66, total: 1000 },
          total: { federal: 2400, state: 266, total: 3000 }
        },
        statePersonnel: {
          '1931': { federal: 900, state: 100, total: 1000 },
          '1932': { federal: 900, state: 100, total: 1000 },
          '1933': { federal: 600, state: 67, total: 1000 },
          total: { federal: 2400, state: 267, total: 3000 }
        }
      },
      hitAndHie: {
        combined: {
          '1931': { federal: 10260, state: 1140, total: 11400 },
          '1932': { federal: 10080, state: 1120, total: 11200 },
          '1933': { federal: 8730, state: 970, total: 10700 },
          total: { federal: 29070, state: 3230, total: 33300 }
        },
        contractors: {
          '1931': { federal: 3600, state: 400, total: 4000 },
          '1932': { federal: 3600, state: 400, total: 4000 },
          '1933': { federal: 3300, state: 366, total: 4000 },
          total: { federal: 10500, state: 1166, total: 12000 }
        },
        expenses: {
          '1931': { federal: 3600, state: 400, total: 4000 },
          '1932': { federal: 3600, state: 400, total: 4000 },
          '1933': { federal: 3300, state: 366, total: 4000 },
          total: { federal: 10500, state: 1166, total: 12000 }
        },
        statePersonnel: {
          '1931': { federal: 3060, state: 340, total: 3400 },
          '1932': { federal: 2880, state: 320, total: 3200 },
          '1933': { federal: 2130, state: 237, total: 2700 },
          total: { federal: 8070, state: 897, total: 9300 }
        }
      },
      mmis: {
        combined: {
          '1931': { federal: 750, state: 750, total: 2500 },
          '1932': { federal: 1500, state: 500, total: 3000 },
          '1933': { federal: 1890, state: 210, total: 2100 },
          total: { federal: 4140, state: 1460, total: 7600 }
        },
        contractors: {
          '1931': { federal: 300, state: 300, total: 1000 },
          '1932': { federal: 500, state: 166, total: 1000 },
          '1933': { federal: 900, state: 100, total: 1000 },
          total: { federal: 1700, state: 566, total: 3000 }
        },
        expenses: {
          '1931': { federal: 300, state: 300, total: 1000 },
          '1932': { federal: 500, state: 167, total: 1000 },
          '1933': { federal: 900, state: 100, total: 1000 },
          total: { federal: 1700, state: 567, total: 3000 }
        },
        statePersonnel: {
          '1931': { federal: 150, state: 150, total: 500 },
          '1932': { federal: 500, state: 167, total: 1000 },
          '1933': { federal: 90, state: 10, total: 100 },
          total: { federal: 740, state: 327, total: 1600 }
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
      activityTotals: [
        {
          id: 1,
          name: 'hieOne',
          fundingSource: 'HIE',
          data: {
            statePersonnel: {
              '1931': 1400,
              '1932': 1200,
              '1933': 700,
              total: 3300
            },
            contractors: {
              '1931': 2000,
              '1932': 2000,
              '1933': 2000,
              total: 6000
            },
            expenses: { '1931': 2000, '1932': 2000, '1933': 2000, total: 6000 },
            combined: { '1931': 5400, '1932': 5200, '1933': 4700, total: 15300 }
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
