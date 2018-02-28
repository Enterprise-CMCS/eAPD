import user from './user';

describe('user reducer', () => {
  const initialState = {
    error: '',
    fetching: false,
    loaded: false,
    profile: { email: '', id: '', name: '', phone: '', position: '', state: '' }
  };

  it('should handle initial state', () => {
    expect(user(undefined, {})).toEqual(initialState);
  });
});
