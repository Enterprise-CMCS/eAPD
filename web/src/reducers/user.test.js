import user from './user';

describe('user reducer', () => {
  const initialState = {
    error: '',
    fetching: false,
    loaded: false,
    data: { email: '', id: '', name: '', phone: '', position: '', state: '' }
  };

  it('should handle initial state', () => {
    expect(user(undefined, {})).toEqual(initialState);
  });

  it('should handle a request to get a user', () => {
    expect(user(initialState, { type: 'GET_USER_REQUEST' })).toEqual({
      ...initialState,
      fetching: true,
      error: ''
    });
  });

  it('should handle a successful user fetch, user check, or login', () => {
    ['AUTH_CHECK_SUCCESS', 'GET_USER_SUCCESS', 'LOGIN_SUCCESS'].forEach(
      action => {
        expect(
          user(initialState, {
            type: action,
            data: { this: 'is', my: 'user' }
          })
        ).toEqual({
          ...initialState,
          fetching: false,
          error: '',
          loaded: true,
          data: { this: 'is', my: 'user' }
        });
      }
    );
  });

  it('should handle an unsuccessful user fetch', () => {
    expect(
      user(initialState, { type: 'GET_USER_FAILURE', error: 'booped' })
    ).toEqual({
      ...initialState,
      fetching: false,
      loaded: false,
      error: 'booped'
    });
  });

  it('should handle a request to update a user', () => {
    expect(user(initialState, { type: 'UPDATE_USER_REQUEST' })).toEqual({
      ...initialState,
      fetching: true,
      error: ''
    });
  });

  it('should handle a successful user update', () => {
    expect(
      user(initialState, {
        type: 'UPDATE_USER_SUCCESS',
        data: { this: 'is', my: 'user' }
      })
    ).toEqual({
      ...initialState,
      fetching: false,
      data: { ...initialState.data, this: 'is', my: 'user' }
    });
  });

  it('should handle an unsuccessful user update', () => {
    expect(
      user(initialState, { type: 'UPDATE_USER_FAILURE', error: 'booped' })
    ).toEqual({
      ...initialState,
      fetching: false,
      loaded: false,
      error: 'booped'
    });
  });

  it('should handle a logout', () => {
    expect(user({ not: 'initial state' }, { type: 'LOGOUT_SUCCESS' })).toEqual(
      initialState
    );
  });
});
