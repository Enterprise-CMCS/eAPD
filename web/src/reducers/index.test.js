import rootReducer from './index';

describe('root reducer', () => {
  test('should have proper state slices', () => {
    const stateKeys = Object.keys(rootReducer(undefined, {}));
    expect(stateKeys).toEqual([
      'activities',
      'apd',
      'auth',
      'budget',
      'dirty',
      'notification',
      'sidebar',
      'state',
      'user',
      'router'
    ]);
  });
});
