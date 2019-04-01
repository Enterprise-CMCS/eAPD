import rootReducer from './index';

describe('root reducer', () => {
  test('should have proper state slices', () => {
    const stateKeys = Object.keys(rootReducer({ location: {} })(undefined, {}));
    expect(stateKeys).toEqual([
      'activities',
      'admin',
      'apd',
      'auth',
      'budget',
      'dirty',
      'errors',
      'notification',
      'user',
      'working',
      'router'
    ]);
  });
});
