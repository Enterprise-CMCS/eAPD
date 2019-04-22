import { NAVIGATION_SCROLL_TO_WAYPOINT } from '../actions/navigation';

const initialState = {
  activeSection: 'apd-state-profile-overview'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATION_SCROLL_TO_WAYPOINT:
      return { ...state, activeSection: action.data };
    default:
      return state;
  }
};

export const selectActiveSection = ({ navigation: { activeSection } }) =>
  activeSection;
