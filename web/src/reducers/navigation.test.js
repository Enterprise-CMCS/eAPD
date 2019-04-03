import { NAVIGATION_SCROLL_TO_WAYPOINT } from '../actions/navigation';
import reducer, { selectActiveSection } from './navigation';

describe('navigation reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, {})).toEqual({ activeSection: null });
  });

  it('handles waypoint updates', () => {
    const state = {
      activeSection: 'old'
    };

    expect(
      reducer(state, { type: NAVIGATION_SCROLL_TO_WAYPOINT, data: 'new' })
    ).toEqual({
      activeSection: 'new'
    });
  });

  describe('selectors...', () => {
    it('selects the current active section', () => {
      const state = {
        navigation: { activeSection: 'inactive... just kidding' }
      };

      expect(selectActiveSection(state)).toEqual('inactive... just kidding');
    });
  });
});
