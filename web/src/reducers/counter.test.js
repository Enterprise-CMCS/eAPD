import counter from './counter';
import { INCREMENT_COUNT, DECREMENT_COUNT } from '../actions';

describe('counter reducer', () => {
  test('should provide the initial state', () => {
    expect(counter(undefined, {})).toBe(0);
  });

  test('should handle INCREMENT action', () => {
    expect(counter(1, { type: INCREMENT_COUNT })).toBe(2);
  });

  test('should handle DECREMENT action', () => {
    expect(counter(1, { type: DECREMENT_COUNT })).toBe(0);
  });

  test('should ignore unknown actions', () => {
    expect(counter(1, { type: 'unknown' })).toBe(1);
  });
});
