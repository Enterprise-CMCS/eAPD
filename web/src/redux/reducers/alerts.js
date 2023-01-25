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
      return {
        ...state,
        messages: state.messages.filter((_, i) => i !== action.message_index)
      };
    default:
      return state;
  }
};

export default reducer;
