import axios from '../../util/api';

export const STATES_SUCCESS = 'STATES_SUCCESS';

export const getStates = () => dispatch => {
  return axios.get('/states').then(res => {
    dispatch({ type: STATES_SUCCESS, data: res.data });
  });
};

export default { getStates };
