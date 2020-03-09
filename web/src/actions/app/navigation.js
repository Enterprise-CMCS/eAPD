import { push } from 'connected-react-router';
import { NAVIGATION_SCROLL_TO_WAYPOINT, RESET } from './symbols';

let jumping = false;

export const goToDashboard = ({ pushRoute = push } = {}) => dispatch => {
  dispatch({ type: RESET });
  dispatch(pushRoute('/'));
};

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
