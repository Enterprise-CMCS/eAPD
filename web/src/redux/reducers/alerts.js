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
              apdId: action.apdId,
              variation: 'success'
            })
          )
        ]
      };
    case ALERT_RESOLVE:
      return removeMsg(action.message_index, state);
    default:
      return state;
  }
};

export const removeMsg = (index, state) => state.messages.splice(index, 1);

export const getTempAlerts = state => state.alerts.messages;

export default reducer;
