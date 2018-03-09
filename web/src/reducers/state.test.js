import state from './state';

describe('state reducer', () => {
  const initialState = {
    data: {
      id: '',
      name: '',
      medicaid_office: null,
      program_benefits: '',
      program_vision: '',
      state_pocs: []
    },
    fetching: false,
    loaded: false,
    error: ''
  };

  it('should handle initial state', () => {
    expect(state(undefined, {})).toEqual(initialState);
  });

  it('should handle a request to get a state', () => {
    expect(state(initialState, { type: 'GET_STATE_REQUEST' })).toEqual({
      data: {
        id: '',
        name: '',
        medicaid_office: null,
        program_benefits: '',
        program_vision: '',
        state_pocs: []
      },
      fetching: true,
      loaded: false,
      error: ''
    });
  });

  it('should handle a successful state get', () => {
    expect(
      state(initialState, {
        type: 'GET_STATE_SUCCESS',
        data: { name: 'Bob' }
      })
    ).toEqual({
      data: { name: 'Bob' },
      fetching: false,
      loaded: true,
      error: ''
    });
  });

  it('should handle an unsuccessful state get', () => {
    expect(
      state(initialState, { type: 'GET_STATE_FAILURE', error: 'some error' })
    ).toEqual({
      data: {
        id: '',
        name: '',
        medicaid_office: null,
        program_benefits: '',
        program_vision: '',
        state_pocs: []
      },
      fetching: false,
      loaded: false,
      error: 'some error'
    });
  });

  it('should handle a request to update a state', () => {
    expect(state(initialState, { type: 'UPDATE_STATE_REQUEST' })).toEqual({
      data: {
        id: '',
        name: '',
        medicaid_office: null,
        program_benefits: '',
        program_vision: '',
        state_pocs: []
      },
      fetching: true,
      loaded: false,
      error: ''
    });
  });

  it('should handle a successful state update', () => {
    expect(
      state(initialState, {
        type: 'UPDATE_STATE_SUCCESS',
        data: { name: 'Bob' }
      })
    ).toEqual({
      data: {
        id: '',
        name: 'Bob',
        medicaid_office: null,
        program_benefits: '',
        program_vision: '',
        state_pocs: []
      },
      fetching: false,
      loaded: true,
      error: ''
    });
  });

  it('should handle an unsuccessful state update', () => {
    expect(
      state(initialState, { type: 'UPDATE_STATE_FAILURE', error: 'some error' })
    ).toEqual({
      data: {
        id: '',
        name: '',
        medicaid_office: null,
        program_benefits: '',
        program_vision: '',
        state_pocs: []
      },
      fetching: false,
      loaded: false,
      error: 'some error'
    });
  });
});
