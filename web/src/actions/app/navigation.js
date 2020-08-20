import { push } from 'connected-react-router';
import { NAVIGATION_SCROLL_TO_WAYPOINT, RESET } from './symbols';

let jumping = false;

export const goToDashboard = ({ pushRoute = push } = {}) => dispatch => {
  dispatch({ type: RESET });
  dispatch(pushRoute('/'));
};

export const jumpTo = waypointId => dispatch => {
  if (waypointId) {
    jumping = true;
    setTimeout(() => {
      jumping = false;
    }, 100);
    dispatch({ type: NAVIGATION_SCROLL_TO_WAYPOINT, waypointId });
  }
};

export const scrollTo = waypointId => dispatch => {
  if (!jumping && waypointId) {
    dispatch({
      type: NAVIGATION_SCROLL_TO_WAYPOINT,
      waypointId
    });
  }
};
