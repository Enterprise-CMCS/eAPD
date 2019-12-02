import admin, { selectUsers, selectUsersSorted } from './admin';
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

  describe('selectors', () => {
    const users = [
      { name: 'Barbara', username: 'barbara@yahoo.com' },
      { name: 'Xander', username: 'xander@sunnydale.org' },
      { name: null, username: 'george@weasleygags.co.uk' },
      { name: 'Elizabeth', username: 'queen@uk' },
      { name: null, username: 'devilbaby@hotmail.com' }
    ];

    it('selectUsers selector returns users', () => {
      expect(selectUsers({ admin: { users } })).toEqual(users);
    });

    it('selectUsersSorted returns users in a sorted order', () => {
      expect(selectUsersSorted({ admin: { users } })).toEqual([
        { name: 'Barbara', username: 'barbara@yahoo.com' },
        { name: null, username: 'devilbaby@hotmail.com' },
        { name: 'Elizabeth', username: 'queen@uk' },
        { name: null, username: 'george@weasleygags.co.uk' },
        { name: 'Xander', username: 'xander@sunnydale.org' }
      ]);
    });
  });
});
