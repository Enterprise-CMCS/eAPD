import {
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS,
  SELECT_APD
} from '../actions/app';

const initialState = {
  error: false,
  lastSaved: '',
  saving: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_APD_FAILURE:
      return { ...state, error: true, saving: false };
    case SAVE_APD_REQUEST:
      return { ...state, error: false, saving: true };
    case SAVE_APD_SUCCESS:
      return {
        ...state,
        error: false,
        lastSaved: new Date(action.data.updated).toLocaleString(),
        saving: false
      };
    case SELECT_APD:
      return {
        ...state,
        error: false,
        lastSaved: new Date(action.apd.updated).toLocaleString(),
        saving: false
      };
    default:
      return state;
  }
};

/**
 * Selects the saving error message from the provided state.
 * @param {Object} state current redux state
 * @returns {String|boolean} The error message, or false if there is no error.
 */
export const selectErrorMessage = ({ saving: { error } }) => error;

/**
 * Selects whether or not the APD is currently being saved.
 * @param {Object} state current redux state
 * @returns {boolean} Whether the APD is currently being saved.
 */
export const selectIsSaving = ({ saving: { saving } }) => saving;

/**
 * Select the datestamp of the most recent successful save.
 * @param {Object} state current redux state
 * @returns {String} Locale-specific date string of the last successful save
 */
export const selectLastSaved = ({ saving: { lastSaved } }) => lastSaved;
