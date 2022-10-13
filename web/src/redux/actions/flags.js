export const FLAGS_UPDATED = 'FLAGS_UPDATED';

export const updateFlags = flags => dispatch => {
  dispatch({
    type: FLAGS_UPDATED,
    flags
  });
};
