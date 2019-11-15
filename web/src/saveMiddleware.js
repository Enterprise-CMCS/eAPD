import {
  ADD_APD_ITEM,
  ADD_APD_YEAR,
  EDIT_APD,
  REMOVE_APD_ITEM,
  REMOVE_APD_YEAR
} from './actions/editApd';
import { saveApd } from './actions/apd';

const saveMiddleware = store => next => action => {
  const result = next(action);
  switch (action.type) {
    case ADD_APD_ITEM:
    case ADD_APD_YEAR:
    case EDIT_APD:
    case REMOVE_APD_ITEM:
    case REMOVE_APD_YEAR:
      store.dispatch(saveApd());
      break;
    default:
      break;
  }
  return result;
};

export default saveMiddleware;
