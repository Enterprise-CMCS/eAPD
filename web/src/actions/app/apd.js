import { push } from 'connected-react-router';

import { SELECT_APD } from './symbols';
import { updateBudget } from '../budget';
import { EDIT_APD } from '../editApd/symbols';
import axios from '../../util/api';
import { fromAPI, initialAssurances } from '../../util/serialization/apd';

const LAST_APD_ID_STORAGE_KEY = 'last-apd-id';

export const selectApd = (
  id,
  { deserialize = fromAPI, global = window, pushRoute = push } = {}
) => dispatch =>
  axios.get(`/apds/${id}`).then(req => {
    const apd = deserialize(req.data);

    dispatch({ type: SELECT_APD, apd });

    if (Object.keys(req.data.federalCitations).length === 0) {
      dispatch({
        type: EDIT_APD,
        path: '/federalCitations',
        value: initialAssurances
      });
    }

    dispatch(updateBudget());
    dispatch(pushRoute('/apd'));

    if (global.localStorage) {
      global.localStorage.setItem(LAST_APD_ID_STORAGE_KEY, id);
    }
  });

export default selectApd;
