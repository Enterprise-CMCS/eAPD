import axios from '../../util/api';

export const ADMIN_GET_USERS_REQUEST = 'ADMIN_GET_USERS_REQUEST';
export const ADMIN_GET_USERS_SUCCESS = 'ADMIN_GET_USERS_SUCCESS';
export const ADMIN_GET_USERS_ERROR = 'ADMIN_GET_USERS_ERROR';

export const getUsers = () => dispatch => {
  dispatch({ type: ADMIN_GET_USERS_REQUEST });

  return axios
    .get('/users')
    .then(res => {
      dispatch({ type: ADMIN_GET_USERS_SUCCESS, data: res.data });
    })
    .catch(() => {
      dispatch({ type: ADMIN_GET_USERS_ERROR });
    });
};

export const ADMIN_GET_ACTIVITIES_REQUEST = 'ADMIN_GET_ACTIVITIES_REQUEST';
export const ADMIN_GET_ACTIVITIES_SUCCESS = 'ADMIN_GET_ACTIVITIES_SUCCESS';
export const ADMIN_GET_ACTIVITIES_ERROR = 'ADMIN_GET_ACTIVITIES_ERROR';

export const ADMIN_GET_ROLES_REQUEST = 'ADMIN_GET_ROLES_REQUEST';
export const ADMIN_GET_ROLES_SUCCESS = 'ADMIN_GET_ROLES_SUCCESS';
export const ADMIN_GET_ROLES_ERROR = 'ADMIN_GET_ROLES_ERROR';

export const getRoles = () => dispatch => {
  dispatch({ type: ADMIN_GET_ROLES_REQUEST });
  dispatch({ type: ADMIN_GET_ACTIVITIES_REQUEST });

  const rolesPromise = axios
    .get('/auth/roles')
    .then(res => {
      dispatch({ type: ADMIN_GET_ROLES_SUCCESS, data: res.data });
    })
    .catch(() => {
      dispatch({ type: ADMIN_GET_ROLES_ERROR });
    });

  const activitiesPromise = axios
    .get('/auth/activities')
    .then(res => {
      dispatch({ type: ADMIN_GET_ACTIVITIES_SUCCESS, data: res.data });
    })
    .catch(() => {
      dispatch({ type: ADMIN_GET_ACTIVITIES_ERROR });
    });

  return Promise.all([rolesPromise, activitiesPromise]);
};

export const ADMIN_CREATE_USER_REQUEST = 'ADMIN_CREATE_USER_REQUEST';
export const ADMIN_CREATE_USER_SUCCESS = 'ADMIN_CREATE_USER_SUCCESS';
export const ADMIN_CREATE_USER_ERROR = 'ADMIN_CREATE_USER_ERROR';

export const createUser =
  (
    { email, name, password, role, state },
    { dispatchGetUsers = getUsers } = {}
  ) =>
  dispatch => {
    dispatch({ type: ADMIN_CREATE_USER_REQUEST });

    return axios
      .post('/users', { email, name, password, role, state })
      .then(() => {
        dispatch({ type: ADMIN_CREATE_USER_SUCCESS });
        dispatch(dispatchGetUsers());
      })
      .catch(e => {
        let error = null;
        if (e.response.data) {
          ({ error } = e.response.data);
        }

        dispatch({ type: ADMIN_CREATE_USER_ERROR, data: error });
      });
  };

export const ADMIN_EDIT_ACCOUNT_REQUEST = 'ADMIN_EDIT_ACCOUNT_REQUEST';
export const ADMIN_EDIT_ACCOUNT_SUCCESS = 'ADMIN_EDIT_ACCOUNT_SUCCESS';
export const ADMIN_EDIT_ACCOUNT_ERROR = 'ADMIN_EDIT_ACCOUNT_ERROR';

export const editAccount = (user, changingPassword) => dispatch => {
  dispatch({ type: ADMIN_EDIT_ACCOUNT_REQUEST });

  const putData = Object.entries(user).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
    {}
  );
  if (!user.state) {
    putData.state = '';
  }
  if (!user.role) {
    putData.role = '';
  }

  if (changingPassword) {
    if (!putData.password || putData.password.length === 0) {
      dispatch({
        type: ADMIN_EDIT_ACCOUNT_ERROR,
        data: 'edit-account.no-password'
      });
      return null;
    }
  } else {
    delete putData.password;
  }

  return axios
    .put(`/users/${user.id}`, putData)
    .then(() => {
      dispatch({ type: ADMIN_EDIT_ACCOUNT_SUCCESS });
      dispatch(getUsers());
    })
    .catch(e => {
      let error = null;
      if (e.response.data) {
        ({ error } = e.response.data);
      }

      dispatch({ type: ADMIN_EDIT_ACCOUNT_ERROR, data: error });
    });
};

export const ADMIN_EDIT_ME_REQUEST = 'ADMIN_EDIT_ME_REQUEST';
export const ADMIN_EDIT_ME_SUCCESS = 'ADMIN_EDIT_ME_SUCCESS';
export const ADMIN_EDIT_ME_ERROR = 'ADMIN_EDIT_ME_ERROR';

export const editSelf = (user, changingPassword) => dispatch => {
  dispatch({ type: ADMIN_EDIT_ME_REQUEST });

  const putData = Object.entries(user).reduce(
    (acc, [key, value]) => (value ? { ...acc, [key]: value } : acc),
    {}
  );

  if (changingPassword) {
    if (!putData.password || putData.password.length === 0) {
      dispatch({ type: ADMIN_EDIT_ME_ERROR, data: 'edit-self.no-password' });
      return null;
    }
  } else {
    delete putData.password;
  }

  return axios
    .put(`/me`, putData)
    .then(res => {
      dispatch({ type: ADMIN_EDIT_ME_SUCCESS, data: res.data });
    })
    .catch(e => {
      let error = null;
      if (e.response.data) {
        ({ error } = e.response.data);
      }

      dispatch({ type: ADMIN_EDIT_ME_ERROR, data: error });
    });
};

export const ADMIN_GET_AFFILIATIONS_SUCCESS = 'ADMIN_GET_AFFILIATIONS_SUCCESS';
export const ADMIN_GET_AFFILIATIONS_ERROR = 'ADMIN_GET_AFFILIATIONS_ERROR';

export const getAffiliations =
  (stateId, status, options = {}) =>
  dispatch => {
    return axios
      .get(`/states/${stateId}/affiliations?status=${status}`, options)
      .then(res => {
        dispatch({ type: ADMIN_GET_AFFILIATIONS_SUCCESS, data: res.data });
      })
      .catch(e => {
        let error = null;
        if (e.response.data) {
          ({ error } = e.response.data);
        }
        dispatch({ type: ADMIN_GET_AFFILIATIONS_ERROR, data: error });
      });
  };

export const ADMIN_UPDATE_AFFILIATION_SUCCESS =
  'ADMIN_UPDATE_AFFILIATION_SUCCESS';
export const ADMIN_UPDATE_AFFILIATION_ERROR = 'ADMIN_UPDATE_AFFILIATION_ERROR';

export const updateAffiliation =
  (stateId, affiliationId, roleId, status) => dispatch => {
    return axios
      .patch(`/states/${stateId}/affiliations/${affiliationId}`, {
        roleId,
        status
      })
      .then(() => {
        dispatch({ type: ADMIN_UPDATE_AFFILIATION_SUCCESS });
      })
      .catch(e => {
        let error = null;
        if (e.response.data) {
          ({ error } = e.response.data);
        }
        dispatch({ type: ADMIN_UPDATE_AFFILIATION_ERROR, data: error });
      });
  };
export const ADMIN_GET_ROLE_TYPES_SUCCESS = 'ADMIN_GET_ROLE_TYPES_SUCCESS';
export const ADMIN_GET_ROLE_TYPES_ERROR = 'ADMIN_GET_ROLE_TYPES_ERROR';

export const getRoleTypes = () => dispatch => {
  return axios
    .get(`/roles`)
    .then(res => {
      dispatch({ type: ADMIN_GET_ROLE_TYPES_SUCCESS, data: res.data });
    })
    .catch(e => {
      let error = null;
      if (e.response.data) {
        ({ error } = e.response.data);
      }
      dispatch({ type: ADMIN_GET_ROLE_TYPES_ERROR, data: error });
    });
};
