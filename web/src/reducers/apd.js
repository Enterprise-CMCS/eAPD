import u from 'updeep';

import {
  ADD_APD_KEY_PERSON,
  GET_APD_REQUEST,
  GET_APD_SUCCESS,
  GET_APD_FAILURE,
  REMOVE_APD_KEY_PERSON,
  UPDATE_APD
} from '../actions/apd';
import { nextSequence } from '../util';

const newPerson = id => ({
  id,
  title: '',
  desc: '',
  years: {
    2018: { amt: '', perc: '' },
    2019: { amt: '', perc: '' }
  }
});

const initialState = {
  data: {
    id: '',
    years: ['2018'],
    overview: '',
    keyPersonnel: [newPerson(1), newPerson(2), newPerson(3)],
    hitNarrative: '',
    hieNarrative: '',
    mmisNarrative: ''
  },
  fetching: false,
  loaded: false,
  error: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_APD_REQUEST:
      return { ...state, fetching: true, error: '' };
    case GET_APD_SUCCESS:
      return {
        ...state,
        fetching: false,
        loaded: true,
        data: {
          id: action.data.id,
          years: ['2018'], // TODO
          overview: action.data.programOverview,
          keyPersonnel: [], // TODO
          hitNarrative: action.data.narrativeHIT,
          hieNarrative: action.data.narrativeHIE,
          mmisNarrative: action.data.narrativeMMIS
        }
      };
    case GET_APD_FAILURE:
      return { ...state, fetching: false, error: action.error };
    case ADD_APD_KEY_PERSON:
      return u(
        {
          data: {
            keyPersonnel: people => [
              ...people,
              newPerson(nextSequence(people.map(p => p.id)))
            ]
          }
        },
        state
      );
    case REMOVE_APD_KEY_PERSON:
      return u(
        {
          data: {
            keyPersonnel: people => people.filter(p => p.id !== action.id)
          }
        },
        state
      );
    case UPDATE_APD:
      return u({ data: { ...action.updates } }, state);
    default:
      return state;
  }
};

export default reducer;
export { newPerson };
