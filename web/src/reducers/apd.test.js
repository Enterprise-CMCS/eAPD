import apd from './apd';

describe('APD reducer', () => {
  const initialState = {
    data: {
      id: '',
      years: ['2018', '2019'],
      yearOptions: ['2018', '2019', '2020'],
      overview: '',
      hitNarrative: '',
      hieNarrative: '',
      mmisNarrative: '',
      previousActivitySummary: ''
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
        data: {
          id: 'apd-id',
          programOverview: 'moop moop',
          narrativeHIT: 'HIT, but as a play',
          narrativeHIE: 'HIE, but as a novel',
          narrativeMMIS: 'MMIS, but as a script',
          years: []
        }
      })
    ).toEqual({
      data: {
        id: 'apd-id',
        years: [],
        // TODO: This value is computed based on the current datetime.
        // Probably ought to mock the time (sinon can do this) so
        // the test is deterministic.
        yearOptions: ['2018', '2019', '2020'],
        overview: 'moop moop',
        hitNarrative: 'HIT, but as a play',
        hieNarrative: 'HIE, but as a novel',
        mmisNarrative: 'MMIS, but as a script',
        previousActivitySummary: ''
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
      data: { ...initialState.data },
      fetching: false,
      loaded: false,
      error: 'some error'
    });
  });
});
