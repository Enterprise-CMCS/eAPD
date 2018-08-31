import sidebar from './sidebar';
import { SIDEBAR_TOGGLE_EXPAND } from '../actions/sidebar';

describe('sidebar reducer', () => {
  const initialState = {
    expanded: {
      'apd-state-profile': false,
      'apd-summary': false,
      'prev-activities': false,
      activities: false,
      'schedule-summary': false,
      budget: false,
      'assurances-compliance': false,
      'executive-summary': false,
      'certify-submit': false
    }
  };

  it('should handle initial state', () => {
    expect(sidebar(undefined, {})).toEqual(initialState);
  });

  it('should handle SIDEBAR_TOGGLE_EXPAND', () => {
    const toggle = sidebar(initialState, {
      type: SIDEBAR_TOGGLE_EXPAND,
      id: 'budget'
    });
    expect(toggle).toEqual({
      expanded: {
        'apd-state-profile': false,
        'apd-summary': false,
        'prev-activities': false,
        activities: false,
        'schedule-summary': false,
        budget: true,
        'assurances-compliance': false,
        'executive-summary': false,
        'certify-submit': false
      }
    });

    expect(
      sidebar(toggle, { type: SIDEBAR_TOGGLE_EXPAND, id: 'budget' })
    ).toEqual({
      expanded: {
        'apd-state-profile': false,
        'apd-summary': false,
        'prev-activities': false,
        activities: false,
        'schedule-summary': false,
        budget: false,
        'assurances-compliance': false,
        'executive-summary': false,
        'certify-submit': false
      }
    });
  });
});
