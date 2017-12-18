import * as actions from './index';

describe('counter actions', () => {
  test('increment should create INCREMENT_COUNT action', () => {
    expect(actions.increment()).toEqual({ type: actions.INCREMENT_COUNT });
  });

  test('decrement should create DECREMENT_COUNT action', () => {
    expect(actions.decrement()).toEqual({ type: actions.DECREMENT_COUNT });
  });
});
