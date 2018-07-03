import apd, {
  initIncentiveData,
  initialAssurances,
  getPreviousActivityExpense
} from './apd';

describe('APD reducer', () => {
  const incentivePayments = initIncentiveData();
  const initialState = {
    byId: {},
    data: {
      id: '',
      years: ['2018', '2019'],
      yearOptions: ['2018', '2019', '2020'],
      overview: '',
      hitNarrative: '',
      hieNarrative: '',
      mmisNarrative: '',
      assurancesAndCompliance: initialAssurances,
      previousActivitySummary: '',
      previousActivityExpenses: {
        2016: getPreviousActivityExpense(),
        2017: getPreviousActivityExpense(),
        2018: getPreviousActivityExpense()
      },
      incentivePayments,
      stateProfile: {
        medicaidDirector: {
          name: '',
          email: '',
          phone: ''
        },
        medicaidOffice: {
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: ''
        }
      }
    },
    fetching: false,
    loaded: false,
    error: ''
  };

  it('should handle initial state', () => {
    expect(apd(undefined, {})).toEqual(initialState);
  });

  it('has helper to build previous activities expenses', () => {
    expect(getPreviousActivityExpense()).toEqual({
      hie: {
        federalActual: 0,
        federalApproved: 0,
        stateActual: 0,
        stateApproved: 0
      },
      hit: {
        federalActual: 0,
        federalApproved: 0,
        stateActual: 0,
        stateApproved: 0
      }
    });
  });

  it('should handle a request to get an APD', () => {
    expect(apd(initialState, { type: 'GET_APD_REQUEST' })).toEqual({
      byId: {},
      data: { ...initialState.data },
      fetching: true,
      loaded: false,
      error: ''
    });
  });

  it('should handle a successful APD get', () => {
    expect(
      apd(initialState, {
        type: 'GET_APD_SUCCESS',
        data: [
          {
            id: 'apd-id',
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
            programOverview: 'moop moop',
            narrativeHIT: 'HIT, but as a play',
            narrativeHIE: 'HIE, but as a novel',
            narrativeMMIS: 'MMIS, but as a script',
            stateProfile: 'this is the state profile as a string',
            years: [2013, 2014]
          }
        ]
      })
    ).toEqual({
      byId: {
        'apd-id': {
          activities: undefined,
          id: 'apd-id',
          years: ['2013', '2014'],
          // TODO: This value is computed based on the current datetime.
          // Probably ought to mock the time (sinon can do this) so
          // the test is deterministic.
          yearOptions: ['2018', '2019', '2020'],
          overview: 'moop moop',
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
          hitNarrative: 'HIT, but as a play',
          hieNarrative: 'HIE, but as a novel',
          mmisNarrative: 'MMIS, but as a script',
          assurancesAndCompliance: initialAssurances,
          previousActivitySummary: '',
          previousActivityExpenses: {
            2016: getPreviousActivityExpense(),
            2017: getPreviousActivityExpense(),
            2018: getPreviousActivityExpense()
          },
          stateProfile: 'this is the state profile as a string'
        }
      },
      data: {
        id: '',
        overview: '',
        hitNarrative: '',
        hieNarrative: '',
        mmisNarrative: '',
        assurancesAndCompliance: initialAssurances,
        previousActivitySummary: '',
        previousActivityExpenses: {
          2016: getPreviousActivityExpense(),
          2017: getPreviousActivityExpense(),
          2018: getPreviousActivityExpense()
        },
        incentivePayments,
        stateProfile: {
          medicaidDirector: {
            name: '',
            email: '',
            phone: ''
          },
          medicaidOffice: {
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: ''
          }
        },
        // TODO: This value is computed based on the current datetime.
        // Probably ought to mock the time (sinon can do this) so
        // the test is deterministic.
        years: ['2018', '2019'],
        yearOptions: ['2018', '2019', '2020']
      },
      fetching: false,
      loaded: true,
      error: ''
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
      error: 'some error'
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
});
