import sinon from 'sinon';

// The Hubble Space Telescope was launched on the space shuttle Discovery on
// April 24, 1990.  FFY 1990.  Set this clock before we import code under test,
// so that the stuff we import will use our faked-out clock.
const mockClock = sinon.useFakeTimers(new Date(1990, 3, 24).getTime());

const apd = require('./apd').default;
const { SUBMIT_APD_SUCCESS, WITHDRAW_APD_SUCCESS } = require('../actions/apd');

describe('APD reducer', () => {
  afterAll(() => {
    mockClock.restore();
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

  it('should handle a request to get an APD', () => {
    expect(apd(initialState, { type: 'GET_APD_REQUEST' })).toEqual({
      byId: {},
      data: { ...initialState.data },
      fetching: true,
      loaded: false,
      error: '',
      selectAPDOnLoad: false
    });
  });

  describe('should handle a successful APD get', () => {
    let data;
    let expected;

    beforeEach(() => {
      data = {
        id: 'apd-id',
        activities: [],
        federalCitations:
          'The Third Sentence of the Ninth Paragraph of the Three Hundred and Twenty-First Section of the Ninety-Fifth Part of the Forty-Fifth Title of the Federal Code of Regulations',
        programOverview: 'moop moop',
        narrativeHIT: 'HIT, but as a play',
        narrativeHIE: 'HIE, but as a novel',
        narrativeMMIS: 'MMIS, but as a script',
        keyPersonnel: [
          {
            name: 'Key Person 1',
            position: 'Keymaster',
            email: 'em@il.com',
            isPrimary: false,
            hasCosts: true,
            percentTime: 0.32,
            costs: [
              {
                year: '2018',
                cost: 100
              },
              {
                year: '2019',
                cost: 200
              }
            ]
          }
        ],
        incentivePayments: [
          {
            year: 1909, // Taft becomes President; good year
            q1: {
              ehPayment: 1,
              ehCount: 2,
              epPayment: 3,
              epCount: 4
            },
            q2: {
              ehPayment: 10,
              ehCount: 20,
              epPayment: 30,
              epCount: 40
            },
            q3: {
              ehPayment: 100,
              ehCount: 200,
              epPayment: 300,
              epCount: 400
            },
            q4: {
              ehPayment: 1000,
              ehCount: 2000,
              epPayment: 3000,
              epCount: 4000
            }
          }
        ],
        previousActivityExpenses: [
          {
            hithie: '2013 hithie',
            mmis: '2013 mmis',
            year: '2013'
          },
          {
            hithie: '2012 hithie',
            mmis: '2012 mmis',
            year: '2012'
          },
          {
            hithie: '2011 hithie',
            mmis: '2011 mmis',
            year: '2011'
          }
        ],
        previousActivitySummary: 'Bob the Builder built a building',
        stateProfile: 'this is the state profile as a string',
        status: 'draft',
        years: [2013, 2014]
      };

      expected = {
        byId: {
          'apd-id': {
            activities: [],
            id: 'apd-id',
            federalCitations:
              'The Third Sentence of the Ninth Paragraph of the Three Hundred and Twenty-First Section of the Ninety-Fifth Part of the Forty-Fifth Title of the Federal Code of Regulations',
            years: ['2013', '2014'],
            // This value is computed based on the current datetime, mocked
            // at the beginning of these tests.
            yearOptions: ['1990', '1991', '1992'],
            narrativeHIT: 'HIT, but as a play',
            narrativeHIE: 'HIE, but as a novel',
            narrativeMMIS: 'MMIS, but as a script',
            keyPersonnel: [
              {
                name: 'Key Person 1',
                position: 'Keymaster',
                email: 'em@il.com',
                isPrimary: false,
                hasCosts: true,
                percentTime: 32,
                costs: {
                  '2018': 100,
                  '2019': 200
                },
                key: expect.stringMatching(/[0-9a-f]{8}/)
              }
            ],
            incentivePayments: {
              ehAmt: {
                1909: {
                  1: 1,
                  2: 10,
                  3: 100,
                  4: 1000
                }
              },
              ehCt: {
                1909: {
                  1: 2,
                  2: 20,
                  3: 200,
                  4: 2000
                }
              },
              epAmt: {
                1909: {
                  1: 3,
                  2: 30,
                  3: 300,
                  4: 3000
                }
              },
              epCt: {
                1909: {
                  1: 4,
                  2: 40,
                  3: 400,
                  4: 4000
                }
              }
            },
            previousActivitySummary: 'Bob the Builder built a building',
            previousActivityExpenses: {
              2013: { hithie: '2013 hithie', mmis: '2013 mmis' },
              2012: { hithie: '2012 hithie', mmis: '2012 mmis' },
              2011: { hithie: '2011 hithie', mmis: '2011 mmis' }
            },
            programOverview: 'moop moop',
            stateProfile: 'this is the state profile as a string',
            status: 'draft'
          }
        },
        data: {},
        fetching: false,
        loaded: true,
        error: '',
        selectAPDOnLoad: false
      };
    });

    it('sets values from the API, and defaults otherwise', () => {
      expect(
        apd(initialState, {
          type: 'GET_APD_SUCCESS',
          data: [data]
        })
      ).toEqual(expected);
    });
  });

  it('should handle an unsuccessful APD get', () => {
    expect(
      apd(initialState, { type: 'GET_APD_FAILURE', error: 'some error' })
    ).toEqual({
      byId: {},
      data: { ...initialState.data },
      fetching: false,
      loaded: false,
      error: 'some error',
      selectAPDOnLoad: false
    });
  });

  it('should handle selecting an APD', () => {
    expect(
      apd(initialState, {
        type: 'SELECT_APD',
        apd: { value: `hurr hurr i'm a burr` }
      })
    ).toEqual({
      ...initialState,
      data: { value: `hurr hurr i'm a burr` }
    });
  });

  it('should handle enabling auto-load for an APD', () => {
    expect(apd(initialState, { type: 'SET_SELECT_APD_ON_LOAD' })).toEqual({
      ...initialState,
      selectAPDOnLoad: true
    });
  });

  it('should handle an arbitrary APD update', () => {
    expect(
      apd(initialState, { type: 'UPDATE_APD', updates: { overview: 'bloop' } })
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        overview: 'bloop'
      }
    });
  });

  it('should handle adding an APD key personnel', () => {
    expect(
      apd(
        { ...initialState, data: { keyPersonnel: [] } },
        { type: 'ADD_APD_KEY_PERSON' }
      )
    ).toEqual({
      ...initialState,
      data: {
        keyPersonnel: [
          {
            costs: {},
            email: '',
            hasCosts: false,
            isPrimary: false,
            name: '',
            position: '',
            key: expect.stringMatching(/[0-9a-f]{6}/)
          }
        ]
      }
    });
  });

  it('should handle removing an APD key personnel', () => {
    expect(
      apd(
        {
          ...initialState,
          data: { keyPersonnel: [{ key: 'person', goes: 'here' }] }
        },
        { type: 'REMOVE_APD_KEY_PERSON', index: 0 }
      )
    ).toEqual({
      ...initialState,
      data: {
        keyPersonnel: []
      }
    });
  });

  it('should handle setting an APD key personnel', () => {
    expect(
      apd(
        {
          ...initialState,
          data: {
            ...initialState.data,
            keyPersonnel: [
              {
                isPrimary: true
              },
              { isPrimary: false }
            ]
          }
        },
        { type: 'SET_KEY_PERSON_PRIMARY', index: 1 }
      )
    ).toEqual({
      ...initialState,
      data: {
        ...initialState.data,
        keyPersonnel: [
          {
            isPrimary: false
          },
          { isPrimary: true }
        ]
      }
    });
  });

  it('should handle an APD year add update (which impacts incentive payments and key personnel costs)', () => {
    const state = {
      ...initialState,
      data: {
        years: [1],
        incentivePayments: {
          ehAmt: {
            1: {
              1: 1,
              2: 10,
              3: 100,
              4: 1000
            }
          }
        },
        keyPersonnel: [
          {
            name: 'bob',
            costs: { 1: 100 }
          }
        ]
      }
    };

    expect(
      apd(state, {
        type: 'UPDATE_APD',
        updates: { years: [1, 2] }
      })
    ).toEqual({
      ...state,
      data: {
        years: [1, 2],
        incentivePayments: {
          ehAmt: {
            1: {
              1: 1,
              2: 10,
              3: 100,
              4: 1000
            },
            2: {
              1: 0,
              2: 0,
              3: 0,
              4: 0
            }
          }
        },
        keyPersonnel: [
          {
            name: 'bob',
            costs: { 1: 100, 2: 0 }
          }
        ]
      }
    });
  });

  it('should handle an APD year removal update', () => {
    const state = {
      ...initialState,
      data: {
        years: [1, 2],
        incentivePayments: {
          ehAmt: {
            1: {
              1: 1,
              2: 10,
              3: 100,
              4: 1000
            },
            2: {
              1: 1,
              2: 10,
              3: 100,
              4: 1000
            }
          }
        },
        keyPersonnel: [
          {
            name: 'bob',
            costs: { 1: 100, 2: 200 }
          }
        ]
      }
    };

    expect(
      apd(state, {
        type: 'UPDATE_APD',
        updates: { years: [1] }
      })
    ).toEqual({
      ...state,
      data: {
        years: [1],
        incentivePayments: {
          ehAmt: {
            1: {
              1: 1,
              2: 10,
              3: 100,
              4: 1000
            }
          }
        },
        keyPersonnel: [
          {
            name: 'bob',
            costs: { 1: 100 }
          }
        ]
      }
    });
  });

  it('should handle APD submission success', () => {
    expect(
      apd({ data: { status: 'draft' } }, { type: SUBMIT_APD_SUCCESS })
    ).toEqual({ data: { status: 'submitted' } });
  });

  it('should handle APD withdrawal success', () => {
    expect(
      apd({ data: { status: 'not draft' } }, { type: WITHDRAW_APD_SUCCESS })
    ).toEqual({ data: { status: 'draft' } });
  });
});
