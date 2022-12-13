import { CREATE_APD_SUCCESS } from '../actions/app';

const initialState = {
  tempMessages: []
};

const apdSuccess = {
  message:
    'You have successfully created an APD. Select continue to fill out the rest of the APD.',
  variation: 'success'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_APD_SUCCESS:
      state.tempMessages.push(apdSuccess);
      return state;
    default:
      return state;
  }
};

export const getTempMessages = state => state.errors.tempMessages;

export default reducer;
