import { push } from 'connected-react-router';
import { RESET } from './symbols';

export const goToDashboard = ({ pushRoute = push } = {}) => dispatch => {
  dispatch({ type: RESET });
  dispatch(pushRoute('/'));
};
