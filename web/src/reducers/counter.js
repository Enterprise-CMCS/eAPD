import { INCREMENT_COUNT, DECREMENT_COUNT } from '../actions';

const counter = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return state + 1;
    case DECREMENT_COUNT:
      return state - 1;
    default:
      return state;
  }
};

export default counter;
