import u from 'updeep';
import { SIDEBAR_TOGGLE_EXPAND } from '../actions/sidebar';

const initialState = {
  expanded: {
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

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case SIDEBAR_TOGGLE_EXPAND:
      return {
        ...state,
        expanded: {
          ...state.expanded,
          [action.id]: !state.expanded[action.id]
        }
      };
    default:
      return state;
  }
};

export default sidebar;
