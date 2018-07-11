import * as actions from './sidebar';

describe('sidebar actions actions', () => {
  it('toggleExpand should create SIDEBAR_TOGGLE_EXPAND action', () => {
    expect(actions.toggleExpand('my id')).toEqual({
      type: actions.SIDEBAR_TOGGLE_EXPAND,
      id: 'my id'
    });
  });
});
