import { NAVIGATION_SCROLL_TO_WAYPOINT } from './symbols';

let jumping = false;

export const jumpTo = waypoint => dispatch => {
  if (waypoint) {
    jumping = true;
    setTimeout(() => {
      jumping = false;
    }, 100);
    dispatch({ type: NAVIGATION_SCROLL_TO_WAYPOINT, data: waypoint });
  }
};

export const scrollTo = waypoint => dispatch => {
  if (!jumping && waypoint) {
    dispatch({
      type: NAVIGATION_SCROLL_TO_WAYPOINT,
      data: waypoint
    });
  }
};
