import { createSelector } from 'reselect';

import {
  ADMIN_GET_ACTIVITIES_SUCCESS,
  ADMIN_GET_ROLES_SUCCESS,
  ADMIN_GET_USERS_SUCCESS
} from '../actions/admin';

const initialState = {
  activities: [],
  roles: [],
  users: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_GET_ACTIVITIES_SUCCESS:
      return { ...state, activities: [...action.data] };
    case ADMIN_GET_ROLES_SUCCESS:
      return { ...state, roles: [...action.data] };
    case ADMIN_GET_USERS_SUCCESS:
      return { ...state, users: [...action.data] };
    default:
      return state;
  }
};

export default user;

export const selectUsers = ({ admin: { users } }) => users;

export const selectUsersSorted = createSelector(
  [selectUsers],
  users => {
    return [...users].sort(
      (
        { name: nameA, username: emailA },
        { name: nameB, username: emailB }
      ) => {
        const sortA = (nameA || emailA).toLowerCase();
        const sortB = (nameB || emailB).toLowerCase();

        if (sortA < sortB) {
          return -1;
        }
        if (sortA > sortB) {
          return 1;
        }
        return 0;
      }
    );
  }
);
