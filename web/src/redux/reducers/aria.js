import { ARIA_ANNOUNCE_CHANGE } from '../actions/aria';

const initialState = {
  ariaRegionMessage: ''
};

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ARIA_ANNOUNCE_CHANGE:
      return { ariaRegionMessage: action.message };
    default:
      return state;
  }
};

export const getAriaAnnouncement = state => state.aria.ariaRegionMessage;

export default reducer;
