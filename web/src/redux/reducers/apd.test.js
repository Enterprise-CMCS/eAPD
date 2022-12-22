import { APD_TYPE } from '@cms-eapd/common/utils/constants';
import { RESET, SELECT_APD_SUCCESS } from '../actions/app/symbols';

// The Hubble Space Telescope was launched on the space shuttle Discovery on
// April 24, 1990.  FFY 1990.  Set this clock before we import code under test,
// so that the stuff we import will use our faked-out clock.
jest.useFakeTimers().setSystemTime(new Date('1990-04-24').getTime());

import { default as apd, getPatchesForAddingItem } from './apd';
import {
  CREATE_APD_SUCCESS,
  FETCH_ALL_APDS_FAILURE,
  FETCH_ALL_APDS_REQUEST,
  FETCH_ALL_APDS_SUCCESS,
  SAVE_APD_SUCCESS,
  SET_APD_TO_SELECT_ON_LOAD,
  ADMIN_CHECK_TOGGLE,
  ADMIN_CHECK_COLLAPSE_TOGGLE,
  ADMIN_CHECK_COMPLETE_TOGGLE
} from '../actions/app';
import {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} from '../actions/editApd';
import regulations from '../../util/regulations';

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
    selectAPDOnLoad: false,
    adminCheck: {
      errors: [],
      enabled: false,
      collapsed: false,
      complete: false
    }
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
          apdType: APD_TYPE.HITECH,
          // King George VI is born
          created: '1895-12-14T00:00:00Z',
          // Queen Elizabeth II is born
          updated: '1926-04-21T00:00:00Z',
          other: 'data',
          goes: 'here',
          yearOptions: ['1990', '1991', '1992']
        }
      })
    ).toEqual({
      byId: {
        'apd-id': {
          id: 'apd-id',
          apdType: APD_TYPE.HITECH,
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
      selectAPDOnLoad: false,
      adminCheck: {
        errors: [],
        enabled: false,
        collapsed: false,
        complete: false
      }
    });
  });

  it('should handle a request to get all APDs', () => {
    expect(apd(initialState, { type: FETCH_ALL_APDS_REQUEST })).toEqual({
      byId: {},
      data: { ...initialState.data },
      fetching: true,
      loaded: false,
      error: '',
      selectAPDOnLoad: false,
      adminCheck: {
        errors: [],
        enabled: false,
        collapsed: false,
        complete: false
      }
    });
  });

  it('should handle successfully getting all APDs', () => {
    const data = [
      {
        id: 'apd-id-1',
        apdType: APD_TYPE.HITECH,
        // Albert the monkey is launched into space.
        created: '1948-06-11T00:00:00Z',
        // Laika the dog is launched into space
        updated: '1957-11-03T06:30:00Z',
        name: 'my first apd'
      },
      {
        id: 'apd-id-2',
        apdType: APD_TYPE.HITECH,
        // By law, England includes Wales.
        created: '1746-01-01T00:00:00Z',
        // The Battle of Hastings, essentially completing the Norman conquest
        // of England and securing William the Conqueror's seat on the throne
        updated: '1066-10-14T18:00:00Z',
        name: 'a second apd'
      }
    ];

    const expected = {
      byId: {
        'apd-id-1': {
          id: 'apd-id-1',
          apdType: APD_TYPE.HITECH,
          created: 'June 11, 1948',
          updated: 'November 3, 1957, 6:30 AM GMT',
          name: 'my first apd'
        },
        'apd-id-2': {
          id: 'apd-id-2',
          apdType: APD_TYPE.HITECH,
          created: 'January 1, 1746',
          updated: 'October 14, 1066, 6:00 PM GMT',
          name: 'a second apd'
        }
      },
      data: initialState.data,
      error: '',
      fetching: false,
      loaded: true,
      selectAPDOnLoad: false,
      adminCheck: {
        errors: [],
        enabled: false,
        collapsed: false,
        complete: false
      }
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
      selectAPDOnLoad: false,
      adminCheck: {
        errors: [],
        enabled: false,
        collapsed: false,
        complete: false
      }
    });
  });

  describe('should handle selecting an APD', () => {
    const action = {
      type: SELECT_APD_SUCCESS,
      data: {
        apd: {
          apdType: APD_TYPE.HITECH,
          activities: [
            {
              name: 'activity 1',
              activityId: 'abcd1234',
              contractorResources: [{ name: 'contractor 1' }],
              expenses: [{ name: 'expense 1' }],
              outcomes: [
                { name: 'outcome 1', metrics: [{ name: 'metric 1' }] }
              ],
              milestones: [{ name: 'milestone 1' }],
              statePersonnel: [{ name: 'person 1' }]
            }
          ],
          // A priest led an angry mob to the town council chambers and threw
          // them out a window. The king literally died of shock. This was the
          // First Defenestration of Prague.
          created: '1419-07-30T00:00:00Z',
          assurancesAndCompliances: {
            procurement: [],
            recordsAccess: [],
            softwareRights: [],
            security: []
          },
          keyStatePersonnel: { keyPersonnel: [{ name: 'key person 1' }] },
          value: `hurr hurr i'm a burr`,
          // Some nobles are tossed out a window in the Second Defenestration
          // of Prague, kicking off the Thirty Years' War
          updated: '1618-05-23T10:30:00Z'
        },
        adminCheck: []
      }
    };

    it('sets keys and creates default federal citations if none exist', () => {
      expect(apd(initialState, action)).toEqual({
        ...initialState,
        data: {
          created: 'July 30, 1419',
          updated: 'May 23, 1618, 10:30 AM GMT',
          apdType: APD_TYPE.HITECH,
          keyStatePersonnel: {
            keyPersonnel: [
              {
                key: expect.stringMatching(/^[a-f0-9]{8}$/),
                name: 'key person 1'
              }
            ]
          },
          activities: [
            {
              key: 'abcd1234',
              activityId: 'abcd1234',
              name: 'activity 1',
              milestones: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'milestone 1'
                }
              ],
              outcomes: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'outcome 1',
                  metrics: [
                    {
                      key: expect.stringMatching(/^[a-f0-9]{8}$/),
                      name: 'metric 1'
                    }
                  ]
                }
              ],
              statePersonnel: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'person 1'
                }
              ],
              expenses: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'expense 1'
                }
              ],
              contractorResources: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'contractor 1'
                }
              ]
            }
          ],
          assurancesAndCompliances: regulations,
          value: `hurr hurr i'm a burr`
        }
      });
    });

    it('sets keys and preserves the federal citations if they are defined', () => {
      action.data.apd.assurancesAndCompliances = { key: 'value' };

      expect(apd(initialState, action)).toEqual({
        ...initialState,
        data: {
          activities: [
            {
              key: 'abcd1234',
              activityId: 'abcd1234',
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
                  name: 'outcome 1',
                  metrics: [
                    {
                      key: expect.stringMatching(/^[a-f0-9]{8}$/),
                      name: 'metric 1'
                    }
                  ]
                }
              ],
              milestones: [
                {
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: 'milestone 1'
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
          apdType: APD_TYPE.HITECH,
          created: 'July 30, 1419',
          assurancesAndCompliances: { key: 'value' },
          keyStatePersonnel: {
            keyPersonnel: [
              {
                key: expect.stringMatching(/^[a-f0-9]{8}$/),
                name: 'key person 1'
              }
            ]
          },
          value: `hurr hurr i'm a burr`,
          updated: 'May 23, 1618, 10:30 AM GMT'
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
        keyStatePersonnel: {
          keyPersonnel: [
            {
              costs: {
                1742: 1,
                1743: 2
              },
              fte: {
                1742: 1,
                1743: 2
              }
            }
          ]
        },
        activities: [
          {
            statePersonnel: [
              {
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
            contractorResources: [
              {
                hourly: {
                  1742: { hours: 20, rate: 22 },
                  1743: { hours: 25, rate: 27 }
                },
                years: {
                  1742: 0,
                  1743: 0
                }
              }
            ],
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
            quarterlyFFP: {
              1742: 'sometimes',
              1743: 'rarely'
            }
          }
        ],
        proposedBudget: {
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
          }
        },
        years: ['1742', '1743'],
        yearOptions: ['1741', '1742', '1743']
      }
    };

    expect(apd(state, { type: ADD_APD_YEAR, value: '1741' })).toEqual({
      data: {
        keyStatePersonnel: {
          keyPersonnel: [
            {
              costs: {
                1741: 0,
                1742: 1,
                1743: 2
              },
              fte: {
                1741: 0,
                1742: 1,
                1743: 2
              }
            }
          ]
        },
        activities: [
          {
            statePersonnel: [
              {
                years: {
                  1741: { amt: null, perc: null },
                  1742: 0,
                  1743: 0
                }
              }
            ],
            expenses: [
              {
                years: {
                  1741: null,
                  1742: 0,
                  1743: 0
                }
              }
            ],
            contractorResources: [
              {
                hourly: {
                  1741: { hours: null, rate: null },
                  1742: { hours: 20, rate: 22 },
                  1743: { hours: 25, rate: 27 }
                },
                years: {
                  1741: null,
                  1742: 0,
                  1743: 0
                }
              }
            ],
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
            }
          }
        ],
        proposedBudget: {
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
          }
        },
        years: ['1741', '1742', '1743'],
        yearOptions: ['1741', '1742', '1743']
      }
    });
  });

  it('should handle removing an APD year', () => {
    const state = {
      data: {
        keyStatePersonnel: {
          keyPersonnel: [
            {
              costs: {
                1741: 0,
                1742: 1,
                1743: 2
              },
              fte: {
                1741: 0,
                1742: 1,
                1743: 2
              }
            }
          ]
        },
        activities: [
          {
            statePersonnel: [
              {
                years: {
                  1741: { amt: '', perc: '' },
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
            contractorResources: [
              {
                hourly: {
                  1741: { hours: '', rate: '' },
                  1742: { hours: 20, rate: 22 },
                  1743: { hours: 25, rate: 27 }
                },
                years: {
                  1741: 0,
                  1742: 0,
                  1743: 0
                }
              }
            ],
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
            }
          }
        ],
        proposedBudget: {
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
          }
        },
        years: ['1741', '1742', '1743'],
        yearOptions: ['1741', '1742', '1743']
      }
    };

    expect(apd(state, { type: REMOVE_APD_YEAR, value: '1741' })).toEqual({
      data: {
        keyStatePersonnel: {
          keyPersonnel: [
            {
              costs: {
                1742: 1,
                1743: 2
              },
              fte: {
                1742: 1,
                1743: 2
              }
            }
          ]
        },
        activities: [
          {
            statePersonnel: [
              {
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
            contractorResources: [
              {
                hourly: {
                  1742: { hours: 20, rate: 22 },
                  1743: { hours: 25, rate: 27 }
                },
                years: {
                  1742: 0,
                  1743: 0
                }
              }
            ],
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
            quarterlyFFP: {
              1742: 'sometimes',
              1743: 'rarely'
            }
          }
        ],
        proposedBudget: {
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
          }
        },
        years: ['1742', '1743'],
        yearOptions: ['1741', '1742', '1743']
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
          keyStatePersonnel: { keyPersonnel: [] },
          years: ['1', '2']
        }
      };
      expect(
        apd(state, {
          type: ADD_APD_ITEM,
          path: '/keyStatePersonnel/keyPersonnel/-'
        })
      ).toEqual({
        data: {
          keyStatePersonnel: {
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
            ]
          },
          years: ['1', '2']
        }
      });
    });

    it('should add a new state key personnel', () => {
      const state = {
        data: {
          keyStatePersonnel: {
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
            ]
          },
          years: ['1', '2']
        }
      };
      expect(
        apd(state, {
          type: ADD_APD_ITEM,
          path: '/keyStatePersonnel/keyPersonnel/-'
        })
      ).toEqual({
        data: {
          keyStatePersonnel: {
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
            ]
          },
          years: ['1', '2']
        }
      });
    });

    it('should add a new HITECH activity', () => {
      const state = {
        data: {
          activities: [],
          years: ['1787'],
          apdType: APD_TYPE.HITECH
        }
      };

      expect(
        apd(state, {
          type: ADD_APD_ITEM,
          path: '/activities/-',
          key: '1234abcd'
        })
      ).toEqual({
        data: {
          activities: [
            {
              key: '1234abcd',
              activityId: '1234abcd',
              fundingSource: null,
              name: '',
              activityOverview: {
                summary: '',
                description: '',
                alternatives: '',
                standardsAndConditions: {
                  doesNotSupport: '',
                  supports: ''
                }
              },
              activitySchedule: {
                plannedStartDate: '',
                plannedEndDate: ''
              },
              milestones: [],
              outcomes: [],
              statePersonnel: [],
              expenses: [],
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
              quarterlyFFP: {
                1787: {
                  1: { combined: 25, contractors: 25, inHouse: 25 },
                  2: { combined: 25, contractors: 25, inHouse: 25 },
                  3: { combined: 25, contractors: 25, inHouse: 25 },
                  4: { combined: 25, contractors: 25, inHouse: 25 }
                }
              },
              meta: { expanded: false },
              years: ['1787']
            }
          ],
          apdType: APD_TYPE.HITECH,
          years: ['1787']
        }
      });
    });

    it('should add a new MMIS activity', () => {
      const state = {
        data: {
          activities: [],
          years: ['1787'],
          apdType: APD_TYPE.MMIS
        }
      };

      expect(
        apd(state, {
          type: ADD_APD_ITEM,
          path: '/activities/-',
          key: '1234abcd'
        })
      ).toEqual({
        data: {
          activities: [
            {
              key: '1234abcd',
              activityId: '1234abcd',
              name: '',
              activityOverview: {
                activitySnapshot: '',
                problemStatement: '',
                proposedSolution: ''
              },
              activitySchedule: {
                plannedStartDate: '',
                plannedEndDate: ''
              },
              analysisOfAlternativesAndRisks: {
                alternativeAnalysis: '',
                costBenefitAnalysis: '',
                feasibilityStudy: '',
                requirementsAnalysis: '',
                forseeableRisks: ''
              },
              conditionsForEnhancedFunding: {
                enhancedFundingQualification: null,
                enhancedFundingJustification: ''
              },
              milestones: [],
              outcomes: [],
              statePersonnel: [],
              expenses: [],
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
              quarterlyFFP: {
                1787: {
                  1: { combined: 25, contractors: 25, inHouse: 25 },
                  2: { combined: 25, contractors: 25, inHouse: 25 },
                  3: { combined: 25, contractors: 25, inHouse: 25 },
                  4: { combined: 25, contractors: 25, inHouse: 25 }
                }
              },
              meta: { expanded: false },
              years: ['1787']
            }
          ],
          apdType: APD_TYPE.MMIS,
          years: ['1787']
        }
      });
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
                    1403: { hours: null, rate: null },
                    1404: { hours: null, rate: null }
                  },
                  useHourly: null,
                  key: expect.stringMatching(/^[a-f0-9]{8}$/),
                  name: '',
                  start: '',
                  totalCost: null,
                  years: {
                    1403: null,
                    1404: null
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
          activities: [{ milestones: [] }]
        }
      };

      expect(
        apd(state, { type: ADD_APD_ITEM, path: `/activities/0/milestones/-` })
      ).toEqual({
        data: {
          activities: [
            {
              milestones: [
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
                    1403: null,
                    1404: null
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
                    1403: { amt: null, perc: null },
                    1404: { amt: null, perc: null }
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
          },
          adminCheck: {
            errors: []
          }
        },
        {
          type: SAVE_APD_SUCCESS,
          data: {
            apd: {
              id: 'apdID',
              // Medicare and Medicaid are created, 546 years to the day after
              // the First Defenestration of Prague.
              created: '1965-07-30T00:00:00Z',
              // US Department of Health and Human Services is created
              updated: '1953-04-11T00:00:00Z'
            },
            adminCheck: []
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
        },
        adminCheck: {
          errors: []
        }
      },
      { type: SAVE_APD_SUCCESS, data: { apd: { id: 'apdID', updated: '' } } }
    );
  });

  describe('admin check panel toggles', () => {
    it('should handle turning the admin check on', () => {
      expect(
        apd(initialState, {
          type: ADMIN_CHECK_TOGGLE,
          data: true
        })
      ).toEqual({
        ...initialState,
        adminCheck: {
          errors: [],
          enabled: true,
          collapsed: false,
          complete: false
        }
      });
    });

    it('should handle turning the admin check collapsed on', () => {
      expect(
        apd(initialState, {
          type: ADMIN_CHECK_COLLAPSE_TOGGLE,
          data: true
        })
      ).toEqual({
        ...initialState,
        adminCheck: {
          errors: [],
          enabled: false,
          collapsed: true,
          complete: false
        }
      });
    });

    it('should handle turning setting the admin check to complete', () => {
      expect(
        apd(initialState, {
          type: ADMIN_CHECK_COMPLETE_TOGGLE,
          data: true
        })
      ).toEqual({
        ...initialState,
        adminCheck: {
          errors: [],
          enabled: false,
          collapsed: false,
          complete: true
        }
      });
    });
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
          '/keyStatePersonnel/keyPersonnel/-'
        )
      ).toEqual([
        {
          op: 'add',
          path: '/keyStatePersonnel/keyPersonnel/-',
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
          {
            data: {
              years: ['1', '2'],
              keyStatePersonnel: { keyPersonnel: [{ isPrimary: true }] }
            }
          },
          '/keyStatePersonnel/keyPersonnel/-'
        )
      ).toEqual([
        {
          op: 'add',
          path: '/keyStatePersonnel/keyPersonnel/-',
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
