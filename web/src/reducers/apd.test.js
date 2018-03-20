import apd from './apd';

describe('APD reducer', () => {
  const initialState = {
    data: {
      id: '',
      activities: []
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
      data: {
        id: '',
        activities: []
      },
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
      data: {
        id: '',
        activities: []
      },
      fetching: false,
      loaded: false,
      error: 'some error'
    });
  });

  it('should handle a request to add an APD activity', () => {
    expect(apd(initialState, { type: 'ADD_APD_ACTIVITIES_REQUEST' })).toEqual({
      data: {
        id: '',
        activities: []
      },
      fetching: false,
      loaded: false,
      error: ''
    });
  });

  it('should handle a successful APD activity add', () => {
    const initialWithActivity = {
      data: {
        id: '',
        activities: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Christie' }]
      },
      fetching: false,
      loaded: false,
      error: ''
    };

    expect(
      apd(initialWithActivity, {
        type: 'ADD_APD_ACTIVITIES_SUCCESS',
        data: [{ id: 1, name: 'Bob' }]
      })
    ).toEqual({
      data: {
        id: '',
        activities: [{ id: 1, name: 'Bob' }]
      },
      fetching: false,
      loaded: false,
      error: ''
    });
  });

  it('should handle an unsuccessful APD activity add', () => {
    expect(
      apd(initialState, {
        type: 'ADD_APD_ACTIVITIES_FAILURE',
        error: 'some error'
      })
    ).toEqual({
      data: {
        id: '',
        activities: []
      },
      fetching: false,
      loaded: false,
      error: 'some error'
    });
  });

  it('should handle a request to update an APD activity', () => {
    expect(apd(initialState, { type: 'UPDATE_APD_ACTIVITY_REQUEST' })).toEqual({
      data: {
        id: '',
        activities: []
      },
      fetching: false,
      loaded: false,
      error: ''
    });
  });

  it('should handle a successful APD activity update', () => {
    const initialWithActivity = {
      data: {
        id: '',
        activities: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Christie' }]
      },
      fetching: false,
      loaded: false,
      error: ''
    };

    expect(
      apd(initialWithActivity, {
        type: 'UPDATE_APD_ACTIVITY_SUCCESS',
        data: { id: 1, name: 'Bob' }
      })
    ).toEqual({
      data: {
        id: '',
        activities: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Christie' }]
      },
      fetching: false,
      loaded: false,
      error: ''
    });
  });

  it('should handle an unsuccessful APD activity update', () => {
    expect(
      apd(initialState, {
        type: 'UPDATE_APD_ACTIVITY_FAILURE',
        error: 'some error'
      })
    ).toEqual({
      data: {
        id: '',
        activities: []
      },
      fetching: false,
      loaded: false,
      error: 'some error'
    });
  });
});
