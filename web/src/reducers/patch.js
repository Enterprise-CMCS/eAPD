import u from 'updeep';

import { SAVE_APD_SUCCESS } from '../actions/apd';
import { EDIT_APD } from '../actions/editApd';

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_APD_SUCCESS:
      return initialState;

    case EDIT_APD: {
      const existingIndex = state.findIndex(
        ({ op, path }) => op === 'replace' && path === action.path
      );
      if (existingIndex < 0) {
        return [
          ...state,
          { op: 'replace', path: action.path, value: action.value }
        ];
      }
      return u({ [existingIndex]: { value: action.value } }, state);
    }

    default:
      return state;
  }
};

export default reducer;

export const getHasChanges = ({ patch }) => patch.length > 0;
