export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION';
export const PROCESS_QUEUE = 'PROCESS_QUEUE';

export const addNotification = message => ({ type: ADD_NOTIFICATION, message });
export const closeNotification = () => ({ type: CLOSE_NOTIFICATION });

const queueHasMessages = state => state.notification.queue.length > 0;
const isOpen = state => state.notification.open;

export const processQueue = () => (dispatch, getState) => {
  if (queueHasMessages(getState())) return dispatch({ type: PROCESS_QUEUE });
  return null;
};

export const notify = message => (dispatch, getState) => {
  dispatch(addNotification(message));
  if (isOpen(getState())) return dispatch(closeNotification());
  return dispatch(processQueue());
};
