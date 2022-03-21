import { RESET, SELECT_APD_SUCCESS } from '../actions/app/symbols';

// The Hubble Space Telescope was launched on the space shuttle Discovery on
// April 24, 1990.  FFY 1990.  Set this clock before we import code under test,
// so that the stuff we import will use our faked-out clock.
jest.useFakeTimers().setSystemTime(new Date('1990-04-24').getTime());

const { default: apd, getPatchesForAddingItem } = require('./apd');
const {
  CREATE_APD_SUCCESS,
  FETCH_ALL_APDS_FAILURE,
  FETCH_ALL_APDS_REQUEST,
  FETCH_ALL_APDS_SUCCESS,
  SAVE_APD_SUCCESS,
  SET_APD_TO_SELECT_ON_LOAD
} = require('../actions/app');
const {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} = require('../actions/editApd');
const regulations = require('../util/regulations').default;

describe('APD reducer', () => {
  afterAll(() => {
    jest.clearAllTimers();
  });

  const initialState = {
    byId: {},
    data: {},
    fetching: false,
    loaded: false,
    error: '',
    selectAPDOnLoad: false
  };

  it('should handle initial state', () => {
    expect(apd(undefined, {})).toEqual(initialState);
  });

  it('should reset', () => {
    expect(
      apd({ data: { has: 'contents' }, stuff: 'here' }, { type: RESET })
    ).toEqual({ data: {}, stuff: 'here' });
  });

  it('should handle creating an APD', () => {
    expect(
      apd(initialState, {
        type: CREATE_APD_SUCCESS,
        data: {
          id: 'apd-id',
          // King George VI is born
          created: '1895-12-14T00:00:00Z',
          // Queen Elizabeth II is born
          updated: '1926-04-21T00:00:00Z',
          other: 'data',
          goes: 'here'
        }
      })
    ).toEqual({
      byId: {
        'apd-id': {
          id: 'apd-id',
          created: 'December 14, 1895',
          other: 'data',
          goes: 'here',
          updated: 'April 21, 1926, 12:00 AM GMT',
          yearOptions: ['1990', '1991', '1992']
        }
      },
      data: {},
      fetching: false,
      loaded: false,
      error: '',
      selectAPDOnLoad: false
    });
  });

  it('should handle a request to get all APDs', () => {
    expect(apd(initialState, { type: FETCH_ALL_APDS_REQUEST })).toEqual({
      byId: {},
      data: { ...initialState.data },
      fetching: true,
      loaded: false,
      error: '',
      selectAPDOnLoad: false
    });
  });

  it('should handle successfully getting all APDs', () => {
    const data = [
      {
        id: 'apd-id-1',
        // Albert the monkey is launched into space.
        created: '1948-06-11T00:00:00Z',
        name: 'my first apd',
        // Laika the dog is launched into space
        updated: '1957-11-03T06:30:00Z'
      },
      {
        id: 'apd-id-2',
        // By law, England includes Wales.
        created: '1746-01-01T00:00:00Z',
        name: 'a second apd',
        // The Battle of Hastings, essentially completing the Norman conquest
        // of England and securing William the Conqueror's seat on the throne
        updated: '1066-10-14T18:00:00Z'
      }
    ];

    const expected = {
      byId: {
        'apd-id-1': {
          id: 'apd-id-1',
          created: 'June 11, 1948',
          name: 'my first apd',
          updated: 'November 3, 1957, 6:30 AM GMT'
        },
        'apd-id-2': {
          id: 'apd-id-2',
          created: 'January 1, 1746',
          name: 'a second apd',
          updated: 'October 14, 1066, 6:00 PM GMT'
        }
      },
      data: initialState.data,
      error: '',
      fetching: false,
      loaded: true,
      selectAPDOnLoad: false
    };

    expect(
      apd(initialState, {
        type: FETCH_ALL_APDS_SUCCESS,
        data
      })
    ).toEqual(expected);
  });

  it('should handle unsuccessfully getting all APDs', () => {
    expect(
      apd(initialState, { type: FETCH_ALL_APDS_FAILURE, error: 'some error' })
    ).toEqual({
      byId: {},
      data: { ...initialState.data },
      fetching: false,
      loaded: false,
      error: 'some error',
      selectAPDOnLoad: false
    });
  });

  describe('should handle selecting an APD', () => {
    const action = {
      type: SELECT_APD_SUCCESS,
      apd: {
        activities: [
          {
            name: 'activity 1',
            contractorResources: [{ name: 'contractor 1' }],
            expenses: [{ name: 'expense 1' }],
            outcomes: [{ name: 'outcome 1' }],
            schedule: [{ name: 'schedule 1' }],
            statePersonnel: [{ name: 'person 1' }]
          }
        ],
        // A priest led an angry mob to the town council chambers and threw
        // them out a window. The king literally died of shock. This was the
        // First Defenestration of Prague.
        created: '1419-07-30T00:00:00Z',
        federalCitations: {
          procurement: [],
          recordsAccess: [],
          softwareRights: [],
          security: []
        },
        keyPersonnel: [{ name: 'key person 1' }],
        value: `hurr hurr i'm a burr`,
        // Some nobles are tossed out a window in the Second Defenestration
        // of Prague, kicking off the Thirty Years' War
        updated: '1618-05-23T10:30:00Z'
      }
    };

    it('sets keys and creates default federal citations if none exist', () => {
      expect(apd(initialState, action)).toEqual({
        ...initialState,
        data: {
          activities: [
            {
              key: expect.stringMatching(/^[a-f0-9]{8}$/),
              name: 'activity 1',
              contractorResources: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'contractor 1'
                }
              ],
              expenses: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'expense 1'
                }
              ],
              outcomes: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'outcome 1'
                }
              ],
              schedule: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'schedule 1'
                }
              ],
              statePersonnel: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'person 1'
                }
              ]
            }
          ],
          created: 'July 30, 1419',
          federalCitations: regulations,
          keyPersonnel: [
            {
              key: expect.stringMatching(/^[a-f0-9]{8}$/),
              name: 'key person 1'
            }
          ],
          value: `hurr hurr i'm a burr`,
          updated: 'May 23, 1618, 10:30 AM GMT',
          yearOptions: ['1990', '1991', '1992']
        }
      });
    });

    it('sets keys and preserves the federal citations if they are defined', () => {
      action.apd.federalCitations = { key: 'value' };

      expect(apd(initialState, action)).toEqual({
        ...initialState,
        data: {
          activities: [
            {
              key: expect.stringMatching(/^[a-f0-9]{8}$/),
              name: 'activity 1',
              contractorResources: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'contractor 1'
                }
              ],
              expenses: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'expense 1'
                }
              ],
              outcomes: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'outcome 1'
                }
              ],
              schedule: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'schedule 1'
                }
              ],
              statePersonnel: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'person 1'
                }
              ]
            }
          ],
          created: 'July 30, 1419',
          federalCitations: { key: 'value' },
          keyPersonnel: [
            {
              key: expect.stringMatching(/^[a-f0-9]{8}$/),
              name: 'key person 1'
            }
          ],
          value: `hurr hurr i'm a burr`,
          updated: 'May 23, 1618, 10:30 AM GMT',
          yearOptions: ['1990', '1991', '1992']
        }
      });
    });
  });

  it('should handle enabling auto-load for an APD', () => {
    expect(apd(initialState, { type: SET_APD_TO_SELECT_ON_LOAD })).toEqual({
      ...initialState,
      selectAPDOnLoad: true
    });
  });

  it('should handle adding an APD year', () => {
    const state = {
      data: {
        activities: [
          {
            costAllocation: {
              1742: 'yes',
              1743: 'no'
            },
            costAllocationNarrative: {
              years: {
                1741: { otherSources: '' },
                1742: { otherSources: '' }
              },
              methodology: ''
            },
            contractorResources: [
              {
                hourly: {
                  data: {
                    1742: { hours: 20, rate: 22 },
                    1743: { hours: 25, rate: 27 }
                  }
                },
                years: {
                  1742: 0,
                  1743: 0
                }
              }
            ],
            expenses: [
              {
                years: {
                  1742: 0,
                  1743: 0
                }
              }
            ],
            quarterlyFFP: {
              1742: 'sometimes',
              1743: 'rarely'
            },
            statePersonnel: [
              {
                years: {
                  1742: 0,
                  1743: 0
                }
              }
            ]
          }
        ],
        incentivePayments: {
          ehAmt: {
            1742: { 1: 1, 2: 1, 3: 1, 4: 1 },
            1743: { 1: 2, 2: 2, 3: 2, 4: 2 }
          },
          ehCt: {
            1742: { 1: 3, 2: 3, 3: 3, 4: 3 },
            1743: { 1: 4, 2: 4, 3: 4, 4: 4 }
          },
          epAmt: {
            1742: { 1: 5, 2: 5, 3: 5, 4: 5 },
            1743: { 1: 6, 2: 6, 3: 6, 4: 6 }
          },
          epCt: {
            1742: { 1: 7, 2: 7, 3: 7, 4: 7 },
            1743: { 1: 8, 2: 8, 3: 8, 4: 8 }
          }
        },
        keyPersonnel: [
          {
            costs: {
              1742: 1,
              1243: 2
            },
            fte: {
              1742: 1,
              1243: 2
            }
          }
        ],
        years: ['1742', '1743']
      }
    };

    expect(apd(state, { type: ADD_APD_YEAR, value: '1741' })).toEqual({
      data: {
        activities: [
          {
            costAllocation: {
              1741: { other: 0, ffp: { federal: 0, state: 100 } },
              1742: 'yes',
              1743: 'no'
            },
            costAllocationNarrative: {
              years: {
                1741: { otherSources: '' },
                1742: { otherSources: '' }
              },
              methodology: ''
            },
            contractorResources: [
              {
                hourly: {
                  data: {
                    1741: { hours: 0, rate: 0 },
                    1742: { hours: 20, rate: 22 },
                    1743: { hours: 25, rate: 27 }
                  }
                },
                years: {
                  1741: 0,
                  1742: 0,
                  1743: 0
                }
              }
            ],
            expenses: [
              {
                years: {
                  1741: 0,
                  1742: 0,
                  1743: 0
                }
              }
            ],
            quarterlyFFP: {
              1741: {
                1: {
                  inHouse: 25,
                  contractors: 25,
                  combined: 25
                },
                2: {
                  inHouse: 25,
                  contractors: 25,
                  combined: 25
                },
                3: {
                  inHouse: 25,
                  contractors: 25,
                  combined: 25
                },
                4: {
                  inHouse: 25,
                  contractors: 25,
                  combined: 25
                }
              },
              1742: 'sometimes',
              1743: 'rarely'
            },
            statePersonnel: [
              {
                years: {
                  1741: { amt: 0, perc: 0 },
                  1742: 0,
                  1743: 0
                }
              }
            ]
          }
        ],
        incentivePayments: {
          ehAmt: {
            1741: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1742: { 1: 1, 2: 1, 3: 1, 4: 1 },
            1743: { 1: 2, 2: 2, 3: 2, 4: 2 }
          },
          ehCt: {
            1741: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1742: { 1: 3, 2: 3, 3: 3, 4: 3 },
            1743: { 1: 4, 2: 4, 3: 4, 4: 4 }
          },
          epAmt: {
            1741: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1742: { 1: 5, 2: 5, 3: 5, 4: 5 },
            1743: { 1: 6, 2: 6, 3: 6, 4: 6 }
          },
          epCt: {
            1741: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1742: { 1: 7, 2: 7, 3: 7, 4: 7 },
            1743: { 1: 8, 2: 8, 3: 8, 4: 8 }
          }
        },
        keyPersonnel: [
          {
            costs: {
              1741: 0,
              1742: 1,
              1243: 2
            },
            fte: {
              1741: 0,
              1742: 1,
              1243: 2
            }
          }
        ],
        years: ['1741', '1742', '1743']
      }
    });
  });

  it('should handle removing an APD year', () => {
    const state = {
      data: {
        activities: [
          {
            costAllocation: {
              1741: { other: 0, ffp: { federal: 90, state: 10 } },
              1742: 'yes',
              1743: 'no'
            },
            costAllocationNarrative: {
              years: {
                1741: { otherSources: '' },
                1742: { otherSources: '' }
              },
              methodology: ''
            },
            contractorResources: [
              {
                hourly: {
                  data: {
                    1741: { hours: '', rate: '' },
                    1742: { hours: 20, rate: 22 },
                    1743: { hours: 25, rate: 27 }
                  }
                },
                years: {
                  1741: 0,
                  1742: 0,
                  1743: 0
                }
              }
            ],
            expenses: [
              {
                years: {
                  1741: 0,
                  1742: 0,
                  1743: 0
                }
              }
            ],
            quarterlyFFP: {
              1741: {
                1: {
                  state: 25,
                  contractors: 25,
                  combined: 25
                },
                2: {
                  state: 25,
                  contractors: 25,
                  combined: 25
                },
                3: {
                  state: 25,
                  contractors: 25,
                  combined: 25
                },
                4: {
                  state: 25,
                  contractors: 25,
                  combined: 25
                }
              },
              1742: 'sometimes',
              1743: 'rarely'
            },
            statePersonnel: [
              {
                years: {
                  1741: { amt: '', perc: '' },
                  1742: 0,
                  1743: 0
                }
              }
            ]
          }
        ],
        incentivePayments: {
          ehAmt: {
            1741: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1742: { 1: 1, 2: 1, 3: 1, 4: 1 },
            1743: { 1: 2, 2: 2, 3: 2, 4: 2 }
          },
          ehCt: {
            1741: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1742: { 1: 3, 2: 3, 3: 3, 4: 3 },
            1743: { 1: 4, 2: 4, 3: 4, 4: 4 }
          },
          epAmt: {
            1741: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1742: { 1: 5, 2: 5, 3: 5, 4: 5 },
            1743: { 1: 6, 2: 6, 3: 6, 4: 6 }
          },
          epCt: {
            1741: { 1: 0, 2: 0, 3: 0, 4: 0 },
            1742: { 1: 7, 2: 7, 3: 7, 4: 7 },
            1743: { 1: 8, 2: 8, 3: 8, 4: 8 }
          }
        },
        keyPersonnel: [
          {
            costs: {
              1741: 0,
              1742: 1,
              1243: 2
            },
            fte: {
              1741: 0,
              1742: 1,
              1243: 2
            }
          }
        ],
        years: ['1741', '1742', '1743']
      }
    };

    expect(apd(state, { type: REMOVE_APD_YEAR, value: '1741' })).toEqual({
      data: {
        activities: [
          {
            costAllocation: {
              1742: 'yes',
              1743: 'no'
            },
            costAllocationNarrative: {
              years: {
                1742: { otherSources: '' }
              },
              methodology: ''
            },
            contractorResources: [
              {
                hourly: {
                  data: {
                    1742: { hours: 20, rate: 22 },
                    1743: { hours: 25, rate: 27 }
                  }
                },
                years: {
                  1742: 0,
                  1743: 0
                }
              }
            ],
            expenses: [
              {
                years: {
                  1742: 0,
                  1743: 0
                }
              }
            ],
            quarterlyFFP: {
              1742: 'sometimes',
              1743: 'rarely'
            },
            statePersonnel: [
              {
                years: {
                  1742: 0,
                  1743: 0
                }
              }
            ]
          }
        ],
        incentivePayments: {
          ehAmt: {
            1742: { 1: 1, 2: 1, 3: 1, 4: 1 },
            1743: { 1: 2, 2: 2, 3: 2, 4: 2 }
          },
          ehCt: {
            1742: { 1: 3, 2: 3, 3: 3, 4: 3 },
            1743: { 1: 4, 2: 4, 3: 4, 4: 4 }
          },
          epAmt: {
            1742: { 1: 5, 2: 5, 3: 5, 4: 5 },
            1743: { 1: 6, 2: 6, 3: 6, 4: 6 }
          },
          epCt: {
            1742: { 1: 7, 2: 7, 3: 7, 4: 7 },
            1743: { 1: 8, 2: 8, 3: 8, 4: 8 }
          }
        },
        keyPersonnel: [
          {
            costs: {
              1742: 1,
              1243: 2
            },
            fte: {
              1742: 1,
              1243: 2
            }
          }
        ],
        years: ['1742', '1743']
      }
    });
  });

  describe('should handle an APD item being added', () => {
    it('should add arbitrary items', () => {
      const state = {
        data: {
          theArray: [1, 2, 4, 5]
        }
      };
      expect(apd(state, { type: ADD_APD_ITEM, path: '/theArray/2' })).toEqual({
        data: { theArray: [1, 2, null, 4, 5] }
      });
    });

    it('should add a new primary key personnel', () => {
      const state = {
        data: {
          keyPersonnel: [],
          years: ['1', '2']
        }
      };
      expect(
        apd(state, { type: ADD_APD_ITEM, path: '/keyPersonnel/-' })
      ).toEqual({
        data: {
          keyPersonnel: [
            {
              costs: { 1: 0, 2: 0 },
              email: '',
              expanded: true,
              hasCosts: null,
              isPrimary: true,
              fte: { 1: 0, 2: 0 },
              name: '',
              position: '',
              key: expect.stringMatching(/^[a-f0-9]{8}$/)
            }
          ],
          years: ['1', '2']
        }
      });
    });

    it('should add a new state key personnel', () => {
      const state = {
        data: {
          keyPersonnel: [
            {
              costs: { 1: 0, 2: 0 },
              email: '',
              expanded: true,
              hasCosts: null,
              isPrimary: true,
              fte: { 1: 0, 2: 0 },
              name: '',
              position: '',
              key: 'primary'
            }
          ],
          years: ['1', '2']
        }
      };
      expect(
        apd(state, { type: ADD_APD_ITEM, path: '/keyPersonnel/-' })
      ).toEqual({
        data: {
          keyPersonnel: [
            {
              costs: { 1: 0, 2: 0 },
              email: '',
              expanded: true,
              hasCosts: null,
              isPrimary: true,
              fte: { 1: 0, 2: 0 },
              name: '',
              position: '',
              key: 'primary'
            },
            {
              costs: { 1: 0, 2: 0 },
              email: '',
              expanded: true,
              hasCosts: null,
              isPrimary: false,
              fte: { 1: 0, 2: 0 },
              name: '',
              position: '',
              key: expect.stringMatching(/^[a-f0-9]{8}$/)
            }
          ],
          years: ['1', '2']
        }
      });
    });

    it('should add a new activity', () => {
      const state = {
        data: {
          activities: [],
          years: ['1787']
        }
      };

      expect(apd(state, { type: ADD_APD_ITEM, path: '/activities/-' })).toEqual(
        {
          data: {
            activities: [
              {
                alternatives: '',
                contractorResources: [],
                costAllocation: {
                  1787: { ffp: { federal: 0, state: 100 }, other: 0 }
                },
                costAllocationNarrative: {
                  years: {
                    1787: { otherSources: '' }
                  },
                  methodology: ''
                },
                description: '',
                expenses: [],
                fundingSource: null,
                key: expect.stringMatching(/^[a-f0-9]{8}$/),
                meta: { expanded: false },
                name: '',
                outcomes: [],
                plannedEndDate: '',
                plannedStartDate: '',
                quarterlyFFP: {
                  1787: {
                    1: { combined: 25, contractors: 25, inHouse: 25 },
                    2: { combined: 25, contractors: 25, inHouse: 25 },
                    3: { combined: 25, contractors: 25, inHouse: 25 },
                    4: { combined: 25, contractors: 25, inHouse: 25 }
                  }
                },
                schedule: [],
                standardsAndConditions: {
                  doesNotSupport: '',
                  supports: ''
                },
                statePersonnel: [],
                summary: '',
                years: ['1787']
              }
            ],
            years: ['1787']
          }
        }
      );
    });

    it('should add a new activity contractor resource', () => {
      const state = {
        data: {
          activities: [{ contractorResources: [] }],
          years: ['1403', '1404']
        }
      };

      expect(
        apd(state, {
          type: ADD_APD_ITEM,
          path: `/activities/0/contractorResources/-`
        })
      ).toEqual({
        data: {
          activities: [
            {
              contractorResources: [
                {
                  description: '',
                  end: '',
                  files: [],
                  hourly: {
                    data: {
                      1403: { hours: 0, rate: 0 },
                      1404: { hours: 0, rate: 0 }
                    },
                    useHourly: false
                  },
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: '',
                  start: '',
                  totalCost: 0,
                  years: {
                    1403: 0,
                    1404: 0
                  }
                }
              ]
            }
          ],
          years: ['1403', '1404']
        }
      });
    });

    it('should add a new activity outcome', () => {
      const state = {
        data: {
          activities: [{ outcomes: [] }]
        }
      };

      expect(
        apd(state, { type: ADD_APD_ITEM, path: `/activities/0/outcomes/-` })
      ).toEqual({
        data: {
          activities: [
            {
              outcomes: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  metrics: [],
                  outcome: ''
                }
              ]
            }
          ]
        }
      });
    });

    it('should add a new activity outcome metric', () => {
      const state = {
        data: {
          activities: [{ outcomes: [{ outcome: 'blah', metrics: [] }] }]
        }
      };

      expect(
        apd(state, {
          type: ADD_APD_ITEM,
          path: '/activities/0/outcomes/0/metrics/-'
        })
      ).toEqual({
        data: {
          activities: [
            {
              outcomes: [
                {
                  metrics: [
                    {
                      key: expect.stringMatching(/^[a-f0-9]{8}$/),
                      metric: ''
                    }
                  ],
                  outcome: 'blah'
                }
              ]
            }
          ]
        }
      });
    });

    it('should add a new activity milestone', () => {
      const state = {
        data: {
          activities: [{ schedule: [] }]
        }
      };

      expect(
        apd(state, { type: ADD_APD_ITEM, path: `/activities/0/schedule/-` })
      ).toEqual({
        data: {
          activities: [
            {
              schedule: [
                {
                  endDate: '',
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  milestone: ''
                }
              ]
            }
          ]
        }
      });
    });

    it('should add a new activity non-personnel cost', () => {
      const state = {
        data: {
          activities: [{ expenses: [] }],
          years: ['1403', '1404']
        }
      };

      expect(
        apd(state, { type: ADD_APD_ITEM, path: `/activities/0/expenses/-` })
      ).toEqual({
        data: {
          activities: [
            {
              expenses: [
                {
                  category: '',
                  description: '',
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  years: {
                    1403: 0,
                    1404: 0
                  }
                }
              ]
            }
          ],
          years: ['1403', '1404']
        }
      });
    });

    it('should add a new activity state personnel', () => {
      const state = {
        data: {
          activities: [{ statePersonnel: [] }],
          years: ['1403', '1404']
        }
      };

      expect(
        apd(state, {
          type: ADD_APD_ITEM,
          path: `/activities/0/statePersonnel/-`
        })
      ).toEqual({
        data: {
          activities: [
            {
              statePersonnel: [
                {
                  description: '',
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  title: '',
                  years: {
                    1403: { amt: 0, perc: 0 },
                    1404: { amt: 0, perc: 0 }
                  }
                }
              ]
            }
          ],
          years: ['1403', '1404']
        }
      });
    });
  });

  describe('should handle an APD item being removed', () => {
    const state = {
      data: {
        items: [1, 2, 3, 4, 5]
      }
    };
    expect(apd(state, { type: REMOVE_APD_ITEM, path: '/items/2' })).toEqual({
      data: { items: [1, 2, 4, 5] }
    });
  });

  it('should handle an APD edit', () => {
    const state = {
      data: {
        overview: 'bleep'
      }
    };
    expect(
      apd(state, { type: EDIT_APD, path: '/overview', value: 'bloop' })
    ).toEqual({
      data: {
        overview: 'bloop'
      }
    });
  });

  it('should handle APD save success', () => {
    expect(
      apd(
        {
          a: 'alpha',
          b: 'beta',
          byId: {
            apdID: { name: 'Bobbert', updated: 'in the past' },
            otherID: { name: 'Jimbob', updated: 'in the future' }
          },
          data: {
            name: 'Timmothert',
            updated: 'in the present'
          }
        },
        {
          type: SAVE_APD_SUCCESS,
          data: {
            id: 'apdID',
            // Medicare and Medicaid are created, 546 years to the day after
            // the First Defenestration of Prague.
            created: '1965-07-30T00:00:00Z',
            // US Department of Health and Human Services is created
            updated: '1953-04-11T00:00:00Z'
          }
        }
      )
    ).toEqual(
      {
        a: 'alpha',
        b: 'beta',
        byId: {
          apdID: {
            name: 'Bobbert',
            updated: 'April 11, 1953, 12:00 AM GMT'
          },
          otherID: { name: 'Jimbob', updated: 'in the future' }
        },
        data: {
          created: 'July 30, 1965',
          name: 'Timmothert',
          updated: 'April 11, 1953, 12:00 AM GMT'
        }
      },
      { type: SAVE_APD_SUCCESS, data: { id: 'apdID', updated: '' } }
    );
  });
});

describe('APD reducer helper methods', () => {
  describe('it can get patches for adding new APD items', () => {
    it(`gets patches for paths that don't need anything special`, () => {
      expect(getPatchesForAddingItem({}, '/fake/path')).toEqual([
        { op: 'add', path: '/fake/path', value: null }
      ]);
    });

    it('gets patches for adding a primary key personnel', () => {
      expect(
        getPatchesForAddingItem(
          { data: { years: ['1', '2'] } },
          '/keyPersonnel/-'
        )
      ).toEqual([
        {
          op: 'add',
          path: '/keyPersonnel/-',
          value: {
            costs: { 1: 0, 2: 0 },
            email: '',
            expanded: true,
            hasCosts: null,
            isPrimary: true,
            fte: { 1: 0, 2: 0 },
            name: '',
            position: '',
            key: expect.stringMatching(/^[a-f0-9]{8}$/)
          }
        }
      ]);
    });

    it('gets patches for adding a key personnel', () => {
      expect(
        getPatchesForAddingItem(
          { data: { years: ['1', '2'], keyPersonnel: [{ isPrimary: true }] } },
          '/keyPersonnel/-'
        )
      ).toEqual([
        {
          op: 'add',
          path: '/keyPersonnel/-',
          value: {
            costs: { 1: 0, 2: 0 },
            email: '',
            expanded: true,
            hasCosts: null,
            isPrimary: false,
            fte: { 1: 0, 2: 0 },
            name: '',
            position: '',
            key: expect.stringMatching(/^[a-f0-9]{8}$/)
          }
        }
      ]);
    });
  });
});
