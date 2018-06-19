import apd, { initIncentiveData } from './apd';

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
      previousActivitySummary: '',
      incentivePayments,
      state: {
        id: '--',
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
            programOverview: 'moop moop',
            narrativeHIT: 'HIT, but as a play',
            narrativeHIE: 'HIE, but as a novel',
            narrativeMMIS: 'MMIS, but as a script',
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
          hitNarrative: 'HIT, but as a play',
          hieNarrative: 'HIE, but as a novel',
          mmisNarrative: 'MMIS, but as a script',
          previousActivitySummary: '',
          incentivePayments,
          state: {
            // TODO: Update this when we actually get data from the API
            id: '--',
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
        }
      },
      data: {
        id: '',
        overview: '',
        hitNarrative: '',
        hieNarrative: '',
        mmisNarrative: '',
        previousActivitySummary: '',
        incentivePayments,
        state: {
          // TODO: Update this when we actually get data from the API
          id: '--',
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
