import admin, { selectUsers, selectUsersSorted } from './admin';
import {
  ADMIN_GET_ACTIVITIES_SUCCESS,
  ADMIN_GET_ROLES_SUCCESS,
  ADMIN_GET_AFFILIATIONS_SUCCESS,
  ADMIN_GET_USERS_SUCCESS
} from '../actions/admin';

describe('admin reducer', () => {
  const initialState = {
    activities: [],
    affiliations: [],
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
      affiliations: [],
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
      affiliations: [],
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
      affiliations: [],
      roles: [],
      users: ['user 1', 'user 2']
    });
  });

  it('should handle successfully getting affiliations', () => {
    expect(
      admin(initialState, {
        type: ADMIN_GET_AFFILIATIONS_SUCCESS,
        data: [
          {
            id: 1,
            userId: '00u4bbbp8sl6vtG3y297',
            stateId: 'md',
            status: 'approved',
            role_id: 21
          },
          {
            id: 2,
            userId: '00u4cccp8sl6vtG3y297',
            stateId: 'ar',
            status: 'pending',
            role_id: 21
          }
        ]
      })
    ).toEqual({
      activities: [],
      affiliations: [
        {
          id: 1,
          userId: '00u4bbbp8sl6vtG3y297',
          stateId: 'md',
          status: 'approved',
          role_id: 21
        },
        {
          id: 2,
          userId: '00u4cccp8sl6vtG3y297',
          stateId: 'ar',
          status: 'pending',
          role_id: 21
        }
      ],
      roles: [],
      users: []
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
