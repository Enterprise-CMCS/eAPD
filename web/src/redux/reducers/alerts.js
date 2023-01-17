import { ALERT_RESOLVE, ALERT_SUCCESS } from '../actions/alert';

const initialState = {
  messages: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALERT_SUCCESS:
      return {
        ...state,
        messages: [
          ...new Set(
            state.messages.concat({
              message: action.message,
              variation: 'success'
            })
          )
        ]
      };
    case ALERT_RESOLVE:
      console.log('HIIIIII');
      return state;
    default:
      return state;
  }
};

export const getTempAlerts = state => state.alerts.messages;

export default reducer;
