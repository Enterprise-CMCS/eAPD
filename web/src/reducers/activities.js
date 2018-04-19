import { ADD_ACTIVITY, UPDATE_ACTIVITY } from '../actions/activities';

const newActivity = id => ({
  id,
  name: '',
  types: ['HIT'],
  descShort: '',
  descLong: '',
  altApproach: ''
});

const updateEntry = (state, action) => {
  const { id, name, value } = action.data;
  const prior = state.byId[id];

  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: { ...prior, [name]: value }
    }
  };
};

const initialState = {
  byId: { 1: newActivity(1) },
  allIds: [1]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACTIVITY: {
      const id = Math.max(...state.allIds, 0) + 1;
      return {
        byId: {
          ...state.byId,
          [id]: newActivity(id)
        },
        allIds: [...state.allIds, id]
      };
    }
    case UPDATE_ACTIVITY:
      return updateEntry(state, action);
    default:
      return state;
  }
};

export default reducer;
