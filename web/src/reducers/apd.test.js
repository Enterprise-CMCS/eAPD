import sinon from 'sinon';

// The Hubble Space Telescope was launched on the space shuttle Discovery on
// April 24, 1990.  FFY 1990.  Set this clock before we import code under test,
// so that the stuff we import will use our faked-out clock.
const mockClock = sinon.useFakeTimers(new Date(1990, 3, 24).getTime());

const { default: apd } = require('./apd');
const {
  SUBMIT_APD_SUCCESS,
  WITHDRAW_APD_SUCCESS,
  SAVE_APD_SUCCESS
} = require('../actions/apd');

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

  it('should handle creating an APD', () => {
    expect(
      apd(initialState, {
        type: 'CREATE_APD_SUCCESS',
        data: {
          id: 'apd-id',
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
      data = [
        {
          id: 'apd-id-1',
          name: 'my first apd',
          // Laika the dog is launched into space
          updated: '1957-11-03T06:30:00Z'
        },
        {
          id: 'apd-id-2',
          name: 'a second apd',
          // The Battle of Hastings, essentially completing the Norman conquest
          // of England and securing William the Conqueror's seat on the throne
          updated: '1066-10-14T18:00:00Z'
        }
      ];

      expected = {
        byId: {
          'apd-id-1': {
            id: 'apd-id-1',
            name: 'my first apd',
            updated: 'November 3, 1957, 6:30 AM GMT'
          },
          'apd-id-2': {
            id: 'apd-id-2',
            name: 'a second apd',
            updated: 'October 14, 1066, 6:00 PM GMT'
          }
        },
        data: {},
        error: '',
        fetching: false,
        loaded: true,
        selectAPDOnLoad: false
      };
    });

    it('sets values from the API, and defaults otherwise', () => {
      expect(
        apd(initialState, {
          type: 'GET_APD_SUCCESS',
          data
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
        apd: {
          value: `hurr hurr i'm a burr`,
          // Some nobles are tossed out a window in the Second Defenestration
          // of Prague, kicking off the Thirty Years' War
          updated: '1618-05-23T10:30:00Z'
        }
      })
    ).toEqual({
      ...initialState,
      data: {
        value: `hurr hurr i'm a burr`,
        updated: 'May 23, 1618, 10:30 AM GMT',
        yearOptions: ['1990', '1991', '1992']
      }
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
            expanded: true,
            hasCosts: false,
            isPrimary: false,
            name: '',
            position: '',
            key: expect.stringMatching(/^[a-f0-9]{8}$/)
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
          // US Department of Health and Human Services is created
          data: { id: 'apdID', updated: '1953-04-11T00:00:00Z' }
        }
      )
    ).toEqual(
      {
        a: 'alpha',
        b: 'beta',
        byId: {
          apdID: { name: 'Bobbert', updated: 'April 11, 1953, 12:00 AM GMT' },
          otherID: { name: 'Jimbob', updated: 'in the future' }
        },
        data: {
          name: 'Timmothert',
          updated: 'April 11, 1953, 12:00 AM GMT'
        }
      },
      { type: SAVE_APD_SUCCESS, data: { id: 'apdID', updated: '' } }
    );
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
