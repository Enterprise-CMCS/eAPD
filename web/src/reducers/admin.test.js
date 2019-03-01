import admin from './admin';
import {
  ADMIN_GET_ACTIVITIES_SUCCESS,
  ADMIN_GET_ROLES_SUCCESS,
  ADMIN_GET_USERS_SUCCESS
} from '../actions/admin';

describe('admin reducer', () => {
  const initialState = {
    activities: [],
    roles: [],
    users: []
  };

  it('should handle initial state', () => {
    expect(admin(undefined, {})).toEqual(initialState);
  });

  it('should handle successfully getting activities', () => {
    expect(
      admin(initialState, {
        type: ADMIN_GET_ACTIVITIES_SUCCESS,
        data: ['activity 1', 'activity 2']
      })
    ).toEqual({
      activities: ['activity 1', 'activity 2'],
      roles: [],
      users: []
    });
  });

  it('should handle successfully getting roles', () => {
    expect(
      admin(initialState, {
        type: ADMIN_GET_ROLES_SUCCESS,
        data: ['role 1', 'role 2']
      })
    ).toEqual({
      activities: [],
      roles: ['role 1', 'role 2'],
      users: []
    });
  });

  it('should handle successfully getting users', () => {
    expect(
      admin(initialState, {
        type: ADMIN_GET_USERS_SUCCESS,
        data: ['user 1', 'user 2']
      })
    ).toEqual({
      activities: [],
      roles: [],
      users: ['user 1', 'user 2']
    });
  });
});
