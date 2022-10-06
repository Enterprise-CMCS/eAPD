import {
  SAVE_APD_FAILURE,
  SAVE_APD_REQUEST,
  SAVE_APD_SUCCESS,
  SELECT_APD_SUCCESS
} from '../actions/app';

const initialState = {
  error: false,
  lastSaved: '',
  saving: false
};

// eslint-disable-next-line default-param-last
export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_APD_FAILURE:
      return { ...state, error: action.data || true, saving: false };
    case SAVE_APD_REQUEST:
      return { ...state, saving: true };
    case SAVE_APD_SUCCESS:
      return {
        ...state,
        error: false,
        lastSaved: new Date(action.apd.updated).toLocaleString(),
        saving: false
      };
    case SELECT_APD_SUCCESS:
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
 * Selects whether there is an error.
 * @param {Object} state current redux state
 * @returns {boolean} Whether there is an error.
 */
export const selectHasError = ({ saving: { error } }) => !!error;

/**
 * Selects the error if there is one.
 * @param {Object} state current redux state
 * @returns {boolean} the error if there is one.
 */
export const selectError = ({ saving: { error = false } }) => error;

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
