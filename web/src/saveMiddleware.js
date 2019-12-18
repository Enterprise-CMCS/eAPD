import {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} from './actions/editApd';
import { saveApd } from './actions/app';

const saveMiddleware = (store, { save = saveApd } = {}) => next => action => {
  const result = next(action);
  switch (action.type) {
    case ADD_APD_ITEM:
    case ADD_APD_YEAR:
    case EDIT_APD:
    case REMOVE_APD_ITEM:
    case REMOVE_APD_YEAR:
      store.dispatch(save());
      break;
    default:
      break;
  }
  return result;
};

export default saveMiddleware;
