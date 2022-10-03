export const UPDATE_FLAGS = 'UPDATE_FLAGS';

export const updateFlags = flags => dispatch => {
  dispatch({
    type: UPDATE_FLAGS,
    flags
  });
};
