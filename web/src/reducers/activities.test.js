import activities from './activities';

describe('activities reducer', () => {
  const initialState = {
    byId: {},
    allIds: []
  };

  it('should handle initial state', () => {
    expect(activities(undefined, {})).toEqual(initialState);
  });
});
