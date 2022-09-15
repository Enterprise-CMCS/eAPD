import budget from './budget';
import { RESET } from '../actions/app';
import { UPDATE_BUDGET } from '../actions/budget';

describe('budget reducer', () => {
  const initialState = {
    activities: {},
    combined: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
    federalShareByFFYQuarter: {
      hitAndHie: {
        years: {},
        total: { contractors: 0, inHouse: 0, combined: 0 }
      },
      mmis: {
        years: {},
        total: { contractors: 0, inHouse: 0, combined: 0 }
      }
    },
    hie: {
      combined: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      contractors: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      expenses: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      statePersonnel: {
        total: { total: 0, medicaid: 0, federal: 0, state: 0 }
      }
    },
    hit: {
      combined: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      contractors: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      expenses: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      statePersonnel: {
        total: { total: 0, medicaid: 0, federal: 0, state: 0 }
      }
    },
    mmis: {
      combined: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      contractors: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      expenses: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      statePersonnel: {
        total: { total: 0, medicaid: 0, federal: 0, state: 0 }
      }
    },
    hitAndHie: {
      combined: { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
      contractors: { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
      expenses: { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
      statePersonnel: {
        total: { medicaid: 0, federal: 0, state: 0, total: 0 }
      }
    },
    mmisByFFP: {
      '50-50': { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
      '75-25': { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
      '90-10': { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
      '0-100': { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
      combined: { total: { medicaid: 0, federal: 0, state: 0, total: 0 } }
    },
    activityTotals: [],
    years: []
  };

  it('should handle initial state', () => {
    expect(budget(undefined, {})).toEqual(initialState);
  });

  it('should reset', () => {
    expect(
      budget({ this: 'is', the: 'old', budget: 'data' }, { type: RESET })
    ).toEqual({});
  });

  it('updates the budget state', () => {
    const state = {
      activities: {},
      combined: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
      federalShareByFFYQuarter: {
        hitAndHie: {
          years: {},
          total: { contractors: 0, inHouse: 0, combined: 0 }
        },
        mmis: {
          years: {},
          total: { contractors: 0, inHouse: 0, combined: 0 }
        }
      },
      hie: {
        combined: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        contractors: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        expenses: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        statePersonnel: {
          total: { total: 0, medicaid: 0, federal: 0, state: 0 }
        }
      },
      hit: {
        combined: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        contractors: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        expenses: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        statePersonnel: {
          total: { total: 0, medicaid: 0, federal: 0, state: 0 }
        }
      },
      mmis: {
        combined: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        contractors: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        expenses: { total: { total: 0, medicaid: 0, federal: 0, state: 0 } },
        statePersonnel: {
          total: { total: 0, medicaid: 0, federal: 0, state: 0 }
        }
      },
      hitAndHie: {
        combined: { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
        contractors: { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
        expenses: { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
        statePersonnel: {
          total: { medicaid: 0, federal: 0, state: 0, total: 0 }
        }
      },
      mmisByFFP: {
        '50-50': { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
        '75-25': { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
        '90-10': { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
        '0-100': { total: { medicaid: 0, federal: 0, state: 0, total: 0 } },
        combined: { total: { medicaid: 0, federal: 0, state: 0, total: 0 } }
      },
      activityTotals: [],
      years: []
    };

    const budgetState = {
      activities: {
        1: {
          costsByFFY: {
            1931: {
              federal: 4860,
              state: 540,
              medicaid: 5400,
              total: 5400
            },
            1932: {
              federal: 4680,
              state: 520,
              medicaid: 5200,
              total: 5200
            },
            1933: {
              federal: 4230,
              state: 470,
              medicaid: 4700,
              total: 4700
            },
            total: {
              federal: 13770,
              medicaid: 15300,
              state: 1530,
              total: 15300
            }
          },
          quarterlyFFP: {
            years: {
              1931: {
                1: {
                  inHouse: { dollars: 918, percent: 0.3 },
                  contractors: { dollars: 720, percent: 0.4 },
                  combined: { dollars: 1638, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 612, percent: 0.2 },
                  contractors: { dollars: 360, percent: 0.2 },
                  combined: { dollars: 972, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 1224, percent: 0.4 },
                  contractors: { dollars: 540, percent: 0.3 },
                  combined: { dollars: 1764, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 306, percent: 0.1 },
                  contractors: { dollars: 180, percent: 0.1 },
                  combined: { dollars: 486, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 3060, percent: 1 },
                  contractors: { dollars: 1800, percent: 1 },
                  combined: { dollars: 4860, percent: 0 }
                }
              },
              1932: {
                1: {
                  inHouse: { dollars: 720, percent: 0.25 },
                  contractors: { dollars: 900, percent: 0.5 },
                  combined: { dollars: 1620, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 720, percent: 0.25 },
                  contractors: { dollars: 360, percent: 0.2 },
                  combined: { dollars: 1080, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 720, percent: 0.25 },
                  contractors: { dollars: 360, percent: 0.2 },
                  combined: { dollars: 1080, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 720, percent: 0.25 },
                  contractors: { dollars: 180, percent: 0.1 },
                  combined: { dollars: 900, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 2880, percent: 1 },
                  contractors: { dollars: 1800, percent: 1 },
                  combined: { dollars: 4680, percent: 0 }
                }
              },
              1933: {
                1: {
                  inHouse: { dollars: 243, percent: 0.1 },
                  contractors: { dollars: 720, percent: 0.4 },
                  combined: { dollars: 963, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 486, percent: 0.2 },
                  contractors: { dollars: 540, percent: 0.3 },
                  combined: { dollars: 1026, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 729, percent: 0.3 },
                  contractors: { dollars: 360, percent: 0.2 },
                  combined: { dollars: 1089, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 972, percent: 0.4 },
                  contractors: { dollars: 180, percent: 0.1 },
                  combined: { dollars: 1152, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 2430, percent: 1 },
                  contractors: { dollars: 1800, percent: 1 },
                  combined: { dollars: 4230, percent: 0 }
                }
              }
            },
            total: { inHouse: 8370, contractors: 5400, combined: 13770 }
          }
        },
        2: {
          costsByFFY: {
            1931: {
              federal: 2700,
              state: 300,
              medicaid: 3000,
              total: 3000
            },
            1932: {
              federal: 2700,
              state: 300,
              medicaid: 3000,
              total: 3000
            },
            1933: {
              federal: 2700,
              state: 300,
              medicaid: 3000,
              total: 3000
            },
            total: {
              federal: 8100,
              state: 900,
              medicaid: 9000,
              total: 9000
            }
          },
          quarterlyFFP: {
            years: {
              1931: {
                1: {
                  inHouse: { dollars: 450, percent: 0.25 },
                  contractors: { dollars: 450, percent: 0.5 },
                  combined: { dollars: 900, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 450, percent: 0.25 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 630, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 450, percent: 0.25 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 630, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 450, percent: 0.25 },
                  contractors: { dollars: 90, percent: 0.1 },
                  combined: { dollars: 540, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 1800, percent: 1 },
                  contractors: { dollars: 900, percent: 1 },
                  combined: { dollars: 2700, percent: 0 }
                }
              },
              1932: {
                1: {
                  inHouse: { dollars: 540, percent: 0.3 },
                  contractors: { dollars: 360, percent: 0.4 },
                  combined: { dollars: 900, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 360, percent: 0.2 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 540, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 720, percent: 0.4 },
                  contractors: { dollars: 270, percent: 0.3 },
                  combined: { dollars: 990, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 180, percent: 0.1 },
                  contractors: { dollars: 90, percent: 0.1 },
                  combined: { dollars: 270, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 1800, percent: 1 },
                  contractors: { dollars: 900, percent: 1 },
                  combined: { dollars: 2700, percent: 0 }
                }
              },
              1933: {
                1: {
                  inHouse: { dollars: 180, percent: 0.1 },
                  contractors: { dollars: 360, percent: 0.4 },
                  combined: { dollars: 540, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 360, percent: 0.2 },
                  contractors: { dollars: 270, percent: 0.3 },
                  combined: { dollars: 630, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 540, percent: 0.3 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 720, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 720, percent: 0.4 },
                  contractors: { dollars: 90, percent: 0.1 },
                  combined: { dollars: 810, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 1800, percent: 1 },
                  contractors: { dollars: 900, percent: 1 },
                  combined: { dollars: 2700, percent: 0 }
                }
              }
            },
            total: { inHouse: 5400, contractors: 2700, combined: 8100 }
          }
        },
        3: {
          // Activity 3 is the Program Administration activity, so its state
          // personnel costs will include key personnel as well.
          costsByFFY: {
            1931: {
              federal: 2700,
              state: 300,
              medicaid: 3000,
              total: 3000
            },
            1932: {
              federal: 3105,
              state: 345,
              medicaid: 3450,
              total: 3450
            },
            1933: {
              federal: 15300,
              state: 1700,
              medicaid: 17000,
              total: 18000
            },
            total: {
              federal: 21105,
              state: 2345,
              medicaid: 23450,
              total: 24450
            }
          },
          quarterlyFFP: {
            years: {
              1931: {
                1: {
                  inHouse: { dollars: 180, percent: 0.1 },
                  contractors: { dollars: 360, percent: 0.4 },
                  combined: { dollars: 540, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 360, percent: 0.2 },
                  contractors: { dollars: 270, percent: 0.3 },
                  combined: { dollars: 630, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 540, percent: 0.3 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 720, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 720, percent: 0.4 },
                  contractors: { dollars: 90, percent: 0.1 },
                  combined: { dollars: 810, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 1800, percent: 1 },
                  contractors: { dollars: 900, percent: 1 },
                  combined: { dollars: 2700, percent: 0 }
                }
              },
              1932: {
                1: {
                  inHouse: { dollars: 552, percent: 0.25 },
                  contractors: { dollars: 450, percent: 0.5 },
                  combined: { dollars: 1002, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 551, percent: 0.25 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 731, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 551, percent: 0.25 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 731, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 551, percent: 0.25 },
                  contractors: { dollars: 90, percent: 0.1 },
                  combined: { dollars: 641, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 2205, percent: 1 },
                  contractors: { dollars: 900, percent: 1 },
                  combined: { dollars: 3105, percent: 0 }
                }
              },
              1933: {
                1: {
                  inHouse: { dollars: 4335, percent: 0.3 },
                  contractors: { dollars: 340, percent: 0.4 },
                  combined: { dollars: 4675, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 2890, percent: 0.2 },
                  contractors: { dollars: 170, percent: 0.2 },
                  combined: { dollars: 3060, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 5780, percent: 0.4 },
                  contractors: { dollars: 255, percent: 0.3 },
                  combined: { dollars: 6035, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 1445, percent: 0.1 },
                  contractors: { dollars: 255, percent: 0.3 },
                  combined: { dollars: 1700, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 14450, percent: 1 },
                  // The contractor percent for FFY 1933 for activity 3 is 120%,
                  // but the totals should NOT be affected by the percents. That
                  // is, these subtotals below should *NOT* sum from the values
                  // above.
                  contractors: { dollars: 850, percent: 1.2 },
                  combined: { dollars: 15300, percent: 0 }
                }
              }
            },
            // Because of the 120% thing above, these totals also won't
            // sum up from the previous values.
            total: { inHouse: 18455, contractors: 2650, combined: 21105 }
          }
        },
        4: {
          costsByFFY: {
            1931: {
              federal: 750,
              state: 750,
              medicaid: 1500,
              total: 2500
            },
            1932: {
              federal: 1500,
              state: 500,
              medicaid: 2000,
              total: 3000
            },
            1933: {
              federal: 1890,
              state: 210,
              medicaid: 2100,
              total: 2100
            },
            total: {
              federal: 4140,
              state: 1460,
              medicaid: 5600,
              total: 7600
            }
          },
          quarterlyFFP: {
            years: {
              1931: {
                1: {
                  inHouse: { dollars: 45, percent: 0.1 },
                  contractors: { dollars: 120, percent: 0.4 },
                  combined: { dollars: 165, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 90, percent: 0.2 },
                  contractors: { dollars: 90, percent: 0.3 },
                  combined: { dollars: 180, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 135, percent: 0.3 },
                  contractors: { dollars: 60, percent: 0.2 },
                  combined: { dollars: 195, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 180, percent: 0.4 },
                  contractors: { dollars: 30, percent: 0.1 },
                  combined: { dollars: 210, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 450, percent: 1 },
                  contractors: { dollars: 300, percent: 1 },
                  combined: { dollars: 750, percent: 0 }
                }
              },
              1932: {
                1: {
                  inHouse: { dollars: 300, percent: 0.3 },
                  contractors: { dollars: 200, percent: 0.4 },
                  combined: { dollars: 500, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 200, percent: 0.2 },
                  contractors: { dollars: 100, percent: 0.2 },
                  combined: { dollars: 300, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 400, percent: 0.4 },
                  contractors: { dollars: 150, percent: 0.3 },
                  combined: { dollars: 550, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 100, percent: 0.1 },
                  contractors: { dollars: 150, percent: 0.3 },
                  combined: { dollars: 250, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 1000, percent: 1 },
                  // The contractor percent for FFY 1932 for activity 4 is 120%,
                  // but the totals should NOT be affected by the percents. That
                  // is, these subtotals below should *NOT* sum from the values
                  // above.
                  contractors: { dollars: 500, percent: 1.2 },
                  combined: { dollars: 1500, percent: 0 }
                }
              },
              1933: {
                1: {
                  inHouse: { dollars: 248, percent: 0.25 },
                  contractors: { dollars: 450, percent: 0.5 },
                  combined: { dollars: 698, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 248, percent: 0.25 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 428, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 247, percent: 0.25 },
                  contractors: { dollars: 180, percent: 0.2 },
                  combined: { dollars: 427, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 247, percent: 0.25 },
                  contractors: { dollars: 90, percent: 0.1 },
                  combined: { dollars: 337, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 990, percent: 1 },
                  contractors: { dollars: 900, percent: 1 },
                  combined: { dollars: 1890, percent: 0 }
                }
              }
            },
            // Because of the 120% thing above, these totals also won't
            // sum up from the previous values.
            total: { inHouse: 2440, contractors: 1700, combined: 4140 }
          }
        },
        5: {
          costsByFFY: {
            1931: { federal: 0, medicaid: 0, state: 0, total: 0 },
            1932: { federal: 0, medicaid: 0, state: 0, total: 0 },
            1933: { federal: 0, medicaid: 0, state: 0, total: 0 },
            total: { federal: 0, medicaid: 0, state: 0, total: 0 }
          },
          quarterlyFFP: {
            years: {
              1931: {
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
              1932: {
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
              1933: {
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
            total: {
              combined: 0,
              contractors: 0,
              inHouse: 0
            }
          }
        },
        6: {
          costsByFFY: {
            1931: {
              federal: 150,
              state: 150,
              medicaid: 300,
              total: 300
            },
            1932: {
              federal: 225,
              state: 75,
              medicaid: 300,
              total: 300
            },
            1933: {
              federal: 270,
              state: 30,
              medicaid: 300,
              total: 300
            },
            total: {
              federal: 645,
              medicaid: 900,
              state: 255,
              total: 900
            }
          },
          quarterlyFFP: {
            years: {
              1931: {
                // You might intuit that that the in-house cost per quarter
                // should be $25 since the total cost for the year is $100 and
                // each quarter wants 25%. That'd make sense, right? Well let
                // me teach you about how these budgets are built up.
                //
                // We actually calculate the quarterly amount of both state
                // personnel and non-personnel expenses separately and them add
                // them together to get the in-house cost per quarter. "That will
                // still add up to the same thing," you say.  Well, yes, and no!
                //
                // Quick summary of the activity so all the inputs are right here
                // for reference:
                //    State personnel cost for 1931: $100
                //    Non-personnel cost for 1931:   $100
                //    Federal/state split:           50/50
                //    ------------------------------------
                //    State personnel federal share: $50
                //    Non-personnel federal share:   $50
                //
                // At 25% per quarter, that means we want $12.50 per quarter for
                // each one. Well that sums to $25, right? Not quite!
                //
                // Yes, I promise I know how to math.
                //
                // We don't actually get $12.50 per quarter. Because the budget
                // calculations always produce only whole dollars with rounded
                // values distributed, what we actually get is $13 for the first
                // two quarters and $12 for the second two quarters.
                //
                // Now add it together. We get $26 for in-house costs for the
                // first two quarters and $24 for the second two quarters. And
                // now you know why these numbers aren't what you might expect
                // them to be. And this same thing happens throughout the
                // quarterly FFP math for this activity
                1: {
                  inHouse: { dollars: 26, percent: 0.25 },
                  contractors: { dollars: 13, percent: 0.25 },
                  combined: { dollars: 39, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 26, percent: 0.25 },
                  contractors: { dollars: 13, percent: 0.25 },
                  combined: { dollars: 39, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 24, percent: 0.25 },
                  contractors: { dollars: 12, percent: 0.25 },
                  combined: { dollars: 36, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 24, percent: 0.25 },
                  contractors: { dollars: 12, percent: 0.25 },
                  combined: { dollars: 36, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 100, percent: 1 },
                  contractors: { dollars: 50, percent: 1 },
                  combined: { dollars: 150, percent: 0 }
                }
              },
              1932: {
                1: {
                  inHouse: { dollars: 38, percent: 0.25 },
                  contractors: { dollars: 19, percent: 0.25 },
                  combined: { dollars: 57, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 38, percent: 0.25 },
                  contractors: { dollars: 19, percent: 0.25 },
                  combined: { dollars: 57, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 38, percent: 0.25 },
                  contractors: { dollars: 19, percent: 0.25 },
                  combined: { dollars: 57, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 36, percent: 0.25 },
                  contractors: { dollars: 18, percent: 0.25 },
                  combined: { dollars: 54, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 150, percent: 1 },
                  contractors: { dollars: 75, percent: 1 },
                  combined: { dollars: 225, percent: 0 }
                }
              },
              1933: {
                1: {
                  inHouse: { dollars: 46, percent: 0.25 },
                  contractors: { dollars: 23, percent: 0.25 },
                  combined: { dollars: 69, percent: 0 }
                },
                2: {
                  inHouse: { dollars: 46, percent: 0.25 },
                  contractors: { dollars: 23, percent: 0.25 },
                  combined: { dollars: 69, percent: 0 }
                },
                3: {
                  inHouse: { dollars: 44, percent: 0.25 },
                  contractors: { dollars: 22, percent: 0.25 },
                  combined: { dollars: 66, percent: 0 }
                },
                4: {
                  inHouse: { dollars: 44, percent: 0.25 },
                  contractors: { dollars: 22, percent: 0.25 },
                  combined: { dollars: 66, percent: 0 }
                },
                subtotal: {
                  inHouse: { dollars: 180, percent: 1 },
                  contractors: { dollars: 90, percent: 1 },
                  combined: { dollars: 270, percent: 0 }
                }
              }
            },
            total: { inHouse: 430, contractors: 215, combined: 645 }
          }
        }
      },
      combined: {
        1931: { federal: 11160, state: 2040, medicaid: 13200, total: 14200 },
        1932: { federal: 12210, state: 1740, medicaid: 13950, total: 14950 },
        1933: { federal: 24390, state: 2710, medicaid: 27100, total: 28100 },
        total: { federal: 47760, state: 6490, medicaid: 54250, total: 57250 }
      },
      federalShareByFFYQuarter: {
        hitAndHie: {
          years: {
            1931: {
              1: { contractors: 1530, inHouse: 1548, combined: 3078 },
              2: { contractors: 810, inHouse: 1422, combined: 2232 },
              3: { contractors: 900, inHouse: 2214, combined: 3114 },
              4: { contractors: 360, inHouse: 1476, combined: 1836 },
              subtotal: { contractors: 3600, inHouse: 6660, combined: 10260 }
            },
            1932: {
              1: { contractors: 1710, inHouse: 1812, combined: 3522 },
              2: { contractors: 720, inHouse: 1631, combined: 2351 },
              3: { contractors: 810, inHouse: 1991, combined: 2801 },
              4: { contractors: 360, inHouse: 1451, combined: 1811 },
              subtotal: { contractors: 3600, inHouse: 6885, combined: 10485 }
            },
            1933: {
              1: { contractors: 1420, inHouse: 4758, combined: 6178 },
              2: { contractors: 980, inHouse: 3736, combined: 4716 },
              3: { contractors: 795, inHouse: 7049, combined: 7844 },
              4: { contractors: 525, inHouse: 3137, combined: 3662 },
              // The requested quarterly percents is 120%, so the above will not
              // sum up to the below - the numbers below are from the activity
              // totals, not simple sums of the quarterly FFP.
              subtotal: { contractors: 3550, inHouse: 18680, combined: 22230 }
            }
          },
          // And because one of the FFYs has quarterly percents that aren't
          // exactly 100%, the total here also doesn't sum from the pieces
          // of each quarter - but they do sum from the FFY subtotals.
          total: { contractors: 10750, inHouse: 32225, combined: 42975 }
        },
        mmis: {
          years: {
            1931: {
              1: { contractors: 120, inHouse: 45, combined: 165 },
              2: { contractors: 90, inHouse: 90, combined: 180 },
              3: { contractors: 60, inHouse: 135, combined: 195 },
              4: { contractors: 30, inHouse: 180, combined: 210 },
              subtotal: { contractors: 300, inHouse: 450, combined: 750 }
            },
            1932: {
              1: { contractors: 200, inHouse: 300, combined: 500 },
              2: { contractors: 100, inHouse: 200, combined: 300 },
              3: { contractors: 150, inHouse: 400, combined: 550 },
              4: { contractors: 150, inHouse: 100, combined: 250 },
              // The requested quarterly percents is 120%, so the above will not
              // sum up to the below - the numbers below are from the activity
              // totals, not simple sums of the quarterly FFP.
              subtotal: { contractors: 500, inHouse: 1000, combined: 1500 }
            },
            1933: {
              1: { contractors: 450, inHouse: 248, combined: 698 },
              2: { contractors: 180, inHouse: 248, combined: 428 },
              3: { contractors: 180, inHouse: 247, combined: 427 },
              4: { contractors: 90, inHouse: 247, combined: 337 },
              subtotal: { contractors: 900, inHouse: 990, combined: 1890 }
            }
          },
          // And because one of the FFYs has quarterly percents that aren't
          // exactly 100%, the total here also doesn't sum from the pieces
          // of each quarter - but they do sum from the FFY subtotals.
          total: { contractors: 1700, inHouse: 2440, combined: 4140 }
        }
      },
      hie: {
        combined: {
          1931: { federal: 7560, state: 840, medicaid: 8400, total: 8400 },
          1932: { federal: 7380, state: 820, medicaid: 8200, total: 8200 },
          1933: { federal: 6930, state: 770, medicaid: 7700, total: 7700 },
          total: { federal: 21870, state: 2430, medicaid: 24300, total: 24300 }
        },
        contractors: {
          1931: { federal: 2700, state: 300, medicaid: 3000, total: 3000 },
          1932: { federal: 2700, state: 300, medicaid: 3000, total: 3000 },
          1933: { federal: 2700, state: 300, medicaid: 3000, total: 3000 },
          total: { federal: 8100, state: 900, medicaid: 9000, total: 9000 }
        },
        expenses: {
          1931: { federal: 2700, state: 300, medicaid: 3000, total: 3000 },
          1932: { federal: 2700, state: 300, medicaid: 3000, total: 3000 },
          1933: { federal: 2700, state: 300, medicaid: 3000, total: 3000 },
          total: { federal: 8100, state: 900, medicaid: 9000, total: 9000 }
        },
        statePersonnel: {
          1931: { federal: 2160, state: 240, medicaid: 2400, total: 2400 },
          1932: { federal: 1980, state: 220, medicaid: 2200, total: 2200 },
          1933: { federal: 1530, state: 170, medicaid: 1700, total: 1700 },
          total: { federal: 5670, state: 630, medicaid: 6300, total: 6300 }
        }
      },
      hit: {
        combined: {
          1931: { federal: 2700, state: 300, medicaid: 3000, total: 3000 },
          1932: { federal: 3105, state: 345, medicaid: 3450, total: 3450 },
          1933: {
            federal: 15300,
            state: 1700,
            medicaid: 17000,
            total: 18000
          },
          total: { federal: 21105, state: 2345, medicaid: 23450, total: 24450 }
        },
        contractors: {
          1931: { federal: 900, state: 100, medicaid: 1000, total: 1000 },
          1932: { federal: 900, state: 100, medicaid: 1000, total: 1000 },
          1933: { federal: 850, state: 95, medicaid: 945, total: 1000 },
          total: { federal: 2650, state: 295, medicaid: 2945, total: 3000 }
        },
        expenses: {
          1931: { federal: 900, state: 100, medicaid: 1000, total: 1000 },
          1932: { federal: 900, state: 100, medicaid: 1000, total: 1000 },
          1933: { federal: 850, state: 94, medicaid: 944, total: 1000 },
          total: { federal: 2650, state: 294, medicaid: 2944, total: 3000 }
        },
        statePersonnel: {
          1931: { federal: 900, state: 100, medicaid: 1000, total: 1000 },
          1932: { federal: 1305, state: 145, medicaid: 1450, total: 1450 },
          1933: {
            federal: 13600,
            state: 1511,
            medicaid: 15111,
            total: 16000
          },
          total: { federal: 15805, state: 1756, medicaid: 17561, total: 18450 }
        }
      },
      hitAndHie: {
        combined: {
          1931: {
            federal: 10260,
            state: 1140,
            medicaid: 11400,
            total: 11400
          },
          1932: {
            federal: 10485,
            state: 1165,
            medicaid: 11650,
            total: 11650
          },
          1933: {
            federal: 22230,
            state: 2470,
            medicaid: 24700,
            total: 25700
          },
          total: { federal: 42975, state: 4775, medicaid: 47750, total: 48750 }
        },
        contractors: {
          1931: { federal: 3600, state: 400, medicaid: 4000, total: 4000 },
          1932: { federal: 3600, state: 400, medicaid: 4000, total: 4000 },
          1933: { federal: 3550, state: 395, medicaid: 3945, total: 4000 },
          total: { federal: 10750, state: 1195, medicaid: 11945, total: 12000 }
        },
        expenses: {
          1931: { federal: 3600, state: 400, medicaid: 4000, total: 4000 },
          1932: { federal: 3600, state: 400, medicaid: 4000, total: 4000 },
          1933: { federal: 3550, state: 394, medicaid: 3944, total: 4000 },
          total: { federal: 10750, state: 1194, medicaid: 11944, total: 12000 }
        },
        statePersonnel: {
          1931: { federal: 3060, state: 340, medicaid: 3400, total: 3400 },
          1932: { federal: 3285, state: 365, medicaid: 3650, total: 3650 },
          1933: {
            federal: 15130,
            state: 1681,
            medicaid: 16811,
            total: 17700
          },
          total: { federal: 21475, state: 2386, medicaid: 23861, total: 24750 }
        }
      },
      mmis: {
        combined: {
          1931: { federal: 750, state: 750, medicaid: 1500, total: 2500 },
          1932: { federal: 1500, state: 500, medicaid: 2000, total: 3000 },
          1933: { federal: 1890, state: 210, medicaid: 2100, total: 2100 },
          total: { federal: 4140, state: 1460, medicaid: 5600, total: 7600 }
        },
        contractors: {
          1931: { federal: 300, state: 300, medicaid: 600, total: 1000 },
          1932: { federal: 500, state: 167, medicaid: 667, total: 1000 },
          1933: { federal: 900, state: 100, medicaid: 1000, total: 1000 },
          total: { federal: 1700, state: 567, medicaid: 2267, total: 3000 }
        },
        expenses: {
          1931: { federal: 300, state: 300, medicaid: 600, total: 1000 },
          1932: { federal: 500, state: 167, medicaid: 667, total: 1000 },
          1933: { federal: 900, state: 100, medicaid: 1000, total: 1000 },
          total: { federal: 1700, state: 567, medicaid: 2267, total: 3000 }
        },
        statePersonnel: {
          1931: { federal: 150, state: 150, medicaid: 300, total: 500 },
          1932: { federal: 500, state: 166, medicaid: 666, total: 1000 },
          1933: { federal: 90, state: 10, medicaid: 100, total: 100 },
          total: { federal: 740, state: 326, medicaid: 1066, total: 1600 }
        }
      },
      mmisByFFP: {
        '50-50': {
          1931: { federal: 750, state: 750, medicaid: 1500, total: 2500 },
          1932: { federal: 0, state: 0, medicaid: 0, total: 0 },
          1933: { federal: 0, state: 0, medicaid: 0, total: 0 },
          total: { federal: 750, state: 750, medicaid: 1500, total: 2500 }
        },
        '75-25': {
          1931: { federal: 0, state: 0, medicaid: 0, total: 0 },
          1932: { federal: 1500, state: 500, medicaid: 2000, total: 3000 },
          1933: { federal: 0, state: 0, medicaid: 0, total: 0 },
          total: { federal: 1500, state: 500, medicaid: 2000, total: 3000 }
        },
        '90-10': {
          1931: { federal: 0, state: 0, medicaid: 0, total: 0 },
          1932: { federal: 0, state: 0, medicaid: 0, total: 0 },
          1933: { federal: 1890, state: 210, medicaid: 2100, total: 2100 },
          total: { federal: 1890, state: 210, medicaid: 2100, total: 2100 }
        },
        '0-100': {
          1931: { federal: 0, state: 0, medicaid: 0, total: 0 },
          1932: { federal: 0, state: 0, medicaid: 0, total: 0 },
          1933: { federal: 0, state: 0, medicaid: 0, total: 0 },
          total: { federal: 0, state: 0, medicaid: 0, total: 0 }
        },
        combined: {
          1931: { federal: 750, state: 750, medicaid: 1500, total: 2500 },
          1932: { federal: 1500, state: 500, medicaid: 2000, total: 3000 },
          1933: { federal: 1890, state: 210, medicaid: 2100, total: 2100 },
          total: { federal: 4140, state: 1460, medicaid: 5600, total: 7600 }
        }
      },
      activityTotals: [
        {
          id: 1,
          name: 'hieOne',
          fundingSource: 'HIE',
          data: {
            otherFunding: {
              1931: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1932: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1933: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              }
            },
            statePersonnel: {
              1931: 1400,
              1932: 1200,
              1933: 700,
              total: 3300
            },
            contractors: {
              1931: 2000,
              1932: 2000,
              1933: 2000,
              total: 6000
            },
            expenses: { 1931: 2000, 1932: 2000, 1933: 2000, total: 6000 },
            combined: {
              1931: 5400,
              1932: 5200,
              1933: 4700,
              total: 15300
            }
          }
        },
        {
          id: 2,
          name: 'hieTwo',
          fundingSource: 'HIE',
          data: {
            otherFunding: {
              1931: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1932: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1933: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              }
            },
            statePersonnel: {
              1931: 1000,
              1932: 1000,
              1933: 1000,
              total: 3000
            },
            contractors: {
              1931: 1000,
              1932: 1000,
              1933: 1000,
              total: 3000
            },
            expenses: { 1931: 1000, 1932: 1000, 1933: 1000, total: 3000 },
            combined: { 1931: 3000, 1932: 3000, 1933: 3000, total: 9000 }
          }
        },
        {
          // Activity 3 is the Program Administration activity, so its state
          // personnel costs will include key personnel as well.
          id: 3,
          name: 'Program Administration',
          fundingSource: 'HIT',
          data: {
            otherFunding: {
              1931: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1932: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1933: {
                contractors: 56,
                expenses: 55,
                statePersonnel: 889,
                total: 1000
              }
            },
            statePersonnel: {
              1931: 1000,
              1932: 1450,
              1933: 16000,
              total: 18450
            },
            contractors: {
              1931: 1000,
              1932: 1000,
              1933: 1000,
              total: 3000
            },
            expenses: { 1931: 1000, 1932: 1000, 1933: 1000, total: 3000 },
            combined: {
              1931: 3000,
              1932: 3450,
              1933: 18000,
              total: 24450
            }
          }
        },
        {
          id: 4,
          name: 'mmisOne',
          fundingSource: 'MMIS',
          data: {
            otherFunding: {
              1931: {
                contractors: 400,
                expenses: 400,
                statePersonnel: 200,
                total: 1000
              },
              1932: {
                contractors: 334,
                expenses: 333,
                statePersonnel: 333,
                total: 1000
              },
              1933: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              }
            },
            statePersonnel: {
              1931: 500,
              1932: 1000,
              1933: 100,
              total: 1600
            },
            contractors: {
              1931: 1000,
              1932: 1000,
              1933: 1000,
              total: 3000
            },
            expenses: { 1931: 1000, 1932: 1000, 1933: 1000, total: 3000 },
            combined: { 1931: 2500, 1932: 3000, 1933: 2100, total: 7600 }
          }
        },
        {
          id: 5,
          name: 'zero total',
          fundingSource: 'MMIS',
          data: {
            otherFunding: {
              1931: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1932: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1933: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              }
            },
            statePersonnel: {
              1931: 0,
              1932: 0,
              1933: 0,
              total: 0
            },
            contractors: {
              1931: 0,
              1932: 0,
              1933: 0,
              total: 0
            },
            expenses: { 1931: 0, 1932: 0, 1933: 0, total: 0 },
            combined: { 1931: 0, 1932: 0, 1933: 0, total: 0 }
          }
        },
        {
          id: 6,
          name: 'no funding program',
          fundingSource: null,
          data: {
            otherFunding: {
              1931: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1932: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              },
              1933: {
                contractors: 0,
                expenses: 0,
                statePersonnel: 0,
                total: 0
              }
            },
            statePersonnel: {
              1931: 100,
              1932: 100,
              1933: 100,
              total: 300
            },
            contractors: {
              1931: 100,
              1932: 100,
              1933: 100,
              total: 300
            },
            expenses: { 1931: 100, 1932: 100, 1933: 100, total: 300 },
            combined: { 1931: 300, 1932: 300, 1933: 300, total: 900 }
          }
        }
      ],
      years: ['1931', '1932', '1933']
    };

    expect(budget(state, { type: UPDATE_BUDGET, budget: budgetState })).toEqual(
      budgetState
    );
  });
});
