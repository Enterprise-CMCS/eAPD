import {
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  UPDATE_APD_ACTIVITY_REQUEST,
  UPDATE_APD_ACTIVITY_SUCCESS,
  UPDATE_APD_ACTIVITY_FAILURE
} from '../actions/apd';

const initialState = {
  data: {
    id: '',
    activities: []
  },
  fetching: false,
  loaded: false,
  error: ''
};

const apdReducer = (apd = initialState, action) => {
  switch (action.type) {
    case GET_APD_REQUEST:
      return { ...apd, fetching: true, error: '' };
    case GET_APD_SUCCESS:
      return {
        ...apd,
        fetching: false,
        loaded: true,
        data: { ...action.data[0] }
      };
    case GET_APD_FAILURE:
      return { ...apd, fetching: false, error: action.error };
    case UPDATE_APD_ACTIVITY_REQUEST:
      return { ...apd, error: '' };
    case UPDATE_APD_ACTIVITY_SUCCESS: {
      const newState = { ...apd };
      const updatedActivity = action.data;

      newState.data.activities = newState.data.activities.map(activity => {
        if (activity.id === updatedActivity.id) {
          return updatedActivity;
        }
        return activity;
      });

      return newState;
    }
    case UPDATE_APD_ACTIVITY_FAILURE:
      return { ...apd, error: action.error };
    default:
      return apd;
  }
};

export default apdReducer;
