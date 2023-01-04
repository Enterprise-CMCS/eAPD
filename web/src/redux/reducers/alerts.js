import { CREATE_APD_SUCCESS } from '../actions/app';
import { APD_CREATE_SUCCESS_MSG } from '../actions/aria';

const initialState = {
  alerts: []
};

const apdSuccess = {
  message: APD_CREATE_SUCCESS_MSG,
  variation: 'success'
};

const reducer = (state = initialState, action) => {
  let tempMessages = state.tempMessages,
    tempMsgIndex = tempMessages.indexOf(apdSuccess);

  switch (action.type) {
    case CREATE_APD_SUCCESS:
      if (tempMsgIndex === -1) {
        state.tempMessages.push(apdSuccess);
      }
      return state;
    default:
      return state;
  }
};

export const getTempMessages = state => state.errors.tempMessages;

export default reducer;
