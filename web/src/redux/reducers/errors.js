import { CREATE_APD_SUCCESS } from '../actions/app';

const initialState = {
  tempMessage: []
};

const apdSuccess = {
  message:
    'You have successfully created an APD. Select continue to fill out the rest of the APD',
  variation: 'success'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_APD_SUCCESS:
      state.tempMessage.push(apdSuccess);
      return state;
    default:
      return state;
  }
};

export const getTempMessage = state => state.tempMessage;

export default reducer;

// /**
//  * Gets an error message from resource files, based on raw API message
//  * @param {String} rawMessage - Raw message from the API
//  * @param {String} fallback - Fallback message in case there's not a match in the resource file
//  */
// const getError = (rawMessage, fallback) => {
//   let error = false;
//   if (rawMessage) {
//     const [errorFamily, message] = rawMessage.split('.');
//     error = t(`errors.${errorFamily}.${message}`, { defaultValue: false });

//     // If there's not a family-specific message, fall back to default errors
//     if (error === false) {
//       error = t(`errors.${message}`, { defaultValue: false });
//     }
//   }

//   // And if there's not one of those, use the fallback
//   return error === false ? fallback : error;
// };

// const initialState = {
//   addAccount: false,
//   editAccount: false,
//   editOwnAccount: false
// };

// // Maps action symbols to state properties.  When these actions happen, the
// // state properties will be set to false.  If you add anything to this Map,
// // you'll also need to add that symbol to the switch below.
// const successActions = {
//   [ADMIN_CREATE_USER_REQUEST]: 'addAccount',
//   [ADMIN_CREATE_USER_SUCCESS]: 'addAccount',
//   [ADMIN_EDIT_ACCOUNT_REQUEST]: 'editAccount',
//   [ADMIN_EDIT_ACCOUNT_SUCCESS]: 'editAccount',
//   [ADMIN_EDIT_ME_REQUEST]: 'editOwnAccount',
//   [ADMIN_EDIT_ME_SUCCESS]: 'editOwnAccount'
// };

// // When these actions happen, the state properties will be set to appropiate
// // error messages or the fallback listed here.  If you add anything to this
// // Map, you'll also need to add that symbol to the switch below.
// const errorActions = {
//   [ADMIN_CREATE_USER_ERROR]: ['addAccount', 'Unknown error creating account'],
//   [ADMIN_EDIT_ACCOUNT_ERROR]: ['editAccount', 'Unknown error editing account'],
//   [ADMIN_EDIT_ME_ERROR]: ['editOwnAccount', 'Unknown error editing account']
// };

// // eslint-disable-next-line default-param-last
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADMIN_CREATE_USER_REQUEST:
//     case ADMIN_CREATE_USER_SUCCESS:
//     case ADMIN_EDIT_ACCOUNT_REQUEST:
//     case ADMIN_EDIT_ACCOUNT_SUCCESS:
//     case ADMIN_EDIT_ME_REQUEST:
//     case ADMIN_EDIT_ME_SUCCESS:
//       return { ...state, [successActions[action.type]]: false };

//     case ADMIN_CREATE_USER_ERROR:
//     case ADMIN_EDIT_ACCOUNT_ERROR:
//     case ADMIN_EDIT_ME_ERROR: {
//       const [prop, fallback] = errorActions[action.type];
//       return {
//         ...state,
//         [prop]: getError(action.data, fallback)
//       };
//     }

//     default:
//       return state;
//   }
// };

// const getAddAccountError = state => state.errors.addAccount;
// const getEditAccountError = state => state.errors.editAccount;
// const getEditOwnAccountError = state => state.errors.editOwnAccount;

// export default reducer;

// export {
//   getAddAccountError,
//   getEditAccountError,
//   getEditOwnAccountError,
//   getError
// };
