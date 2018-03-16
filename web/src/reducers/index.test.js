import rootReducer from './index';

describe('root reducer', () => {
  test('should have proper state slices', () => {
    const stateKeys = Object.keys(rootReducer(undefined, {}));
    expect(stateKeys).toEqual([
      'apd',
      'auth',
      'counter',
      'state',
      'user',
      'router',
      'form'
    ]);
  });
});
