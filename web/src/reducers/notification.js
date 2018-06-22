import {
  ADD_NOTIFICATION,
  CLOSE_NOTIFICATION,
  PROCESS_QUEUE
} from '../actions/notification';

const initialState = {
  open: false,
  messageInfo: {},
  queue: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            message: action.message,
            key: new Date().getTime()
          }
        ]
      };
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        open: false
      };
    case PROCESS_QUEUE:
      return {
        open: true,
        messageInfo: state.queue[0],
        queue: state.queue.slice(1)
      };
    default:
      return state;
  }
};

export default reducer;
