import { ALERT_SUCCESS } from '../actions/alert';

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
    default:
      return state;
  }
};

export const removeAlert = (i, state) => {
  let messages = state.alerts.messages,
    newMessages;

  newMessages([...messages.slice(0, i), ...messages.slice(i + 1)]);

  return newMessages;
};

export const getTempAlerts = state => state.alerts.messages;

export default reducer;
