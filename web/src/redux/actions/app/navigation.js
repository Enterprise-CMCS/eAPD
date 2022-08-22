import { push } from 'connected-react-router';
import { RESET } from './symbols';

// eslint-disable-next-line import/prefer-default-export
export const goToDashboard =
  ({ pushRoute = push } = {}) =>
  dispatch => {
    dispatch({ type: RESET });
    dispatch(pushRoute('/'));
  };
