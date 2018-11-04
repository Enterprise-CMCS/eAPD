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

  it('should handle a successful user fetch, user check, or login', () => {
    ['AUTH_CHECK_SUCCESS', 'LOGIN_SUCCESS'].forEach(action => {
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
    });
  });

  it('should handle a logout', () => {
    expect(user({ not: 'initial state' }, { type: 'LOGOUT_SUCCESS' })).toEqual(
      initialState
    );
  });
});
