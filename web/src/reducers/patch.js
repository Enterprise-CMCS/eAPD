import u from 'updeep';

import { getPatchesForAddingItem } from './apd';
import { SAVE_APD_SUCCESS } from '../actions/apd';
import { ADD_APD_ITEM, EDIT_APD, REMOVE_APD_ITEM } from '../actions/editApd';

const initialState = [];

const indexOfLastReplacePatch = (patches, path) => {
  for (let i = patches.length - 1; i >= 0; i -= 1) {
    if (patches[i].path === path) {
      if (patches[i].op === 'replace') {
        return i;
      }
      return false;
    }
  }

  return false;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_APD_SUCCESS:
      return initialState;

    case ADD_APD_ITEM: {
      const patches = getPatchesForAddingItem(action.state.apd, action.path);
      return [...state, ...patches];
    }

    case EDIT_APD: {
      // If the last patch for the given path is already a replace, we can just
      // update that patch instead of pushing a new one. If the last patch for
      // this path is anything else, then we need to add this as a new patch
      //
      // For example, modifying an array with 10 elements:
      //   1. update /some/array/3
      //   2. update /some/array/7
      //   3. update /some/array/3
      //
      // In this case, we can just replace the original patch with the new one
      // because the sequence of events doesn't matter. However:
      //
      //  1. update /some/array/3
      //  2. delete /some/array/3
      //  3. update /some/array/3
      //
      // In this case, the second update to element 3 is actually updating a
      // different element than the first update. The sequence matters, so
      // we need to push the second update as a separate patch.
      const indexToUpdate = indexOfLastReplacePatch(state, action.path);

      if (indexToUpdate !== false) {
        return u({ [indexToUpdate]: { value: action.value } }, state);
      }
      return [
        ...state,
        { op: 'replace', path: action.path, value: action.value }
      ];
    }

    case REMOVE_APD_ITEM:
      return [...state, { op: 'remove', path: action.path }];

    default:
      return state;
  }
};

export default reducer;

export const getHasChanges = ({ patch }) => patch.length > 0;
