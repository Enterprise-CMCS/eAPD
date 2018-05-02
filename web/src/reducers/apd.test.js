import apd, { newPerson } from './apd';

describe('APD reducer', () => {
  const initialState = {
    data: {
      id: '',
      years: ['2018'],
      overview: '',
      keyPersonnel: [newPerson(1), newPerson(2), newPerson(3)],
      hitNarrative: '',
      hieNarrative: '',
      mmisNarrative: ''
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
        data: [{ name: 'Bob' }]
      })
    ).toEqual({
      data: { name: 'Bob' },
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
