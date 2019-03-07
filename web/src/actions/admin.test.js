import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { ADD_NOTIFICATION } from './notification';
import * as actions from './admin';

import axios from '../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios);

describe('admin actions', () => {
  beforeEach(() => {
    fetchMock.reset();
  });

  describe('get activities and roles', () => {
    it('handles an error getting activities', async () => {
      const store = mockStore();

      const roles = {};

      fetchMock.onGet('/auth/activities').reply(500);
      fetchMock.onGet('/auth/roles').reply(200, roles);

      await store.dispatch(actions.getRoles());

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_GET_ROLES_REQUEST
          },
          { type: actions.ADMIN_GET_ACTIVITIES_REQUEST },
          { type: actions.ADMIN_GET_ACTIVITIES_ERROR },
          { type: actions.ADMIN_GET_ROLES_SUCCESS, data: roles }
        ])
      );
      expect(store.getActions().length).toEqual(4);
    });

    it('handles an error getting roles', async () => {
      const store = mockStore();

      const activities = {};

      fetchMock.onGet('/auth/activities').reply(200, activities);
      fetchMock.onGet('/auth/roles').reply(500);

      await store.dispatch(actions.getRoles());

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_GET_ROLES_REQUEST
          },
          { type: actions.ADMIN_GET_ACTIVITIES_REQUEST },
          { type: actions.ADMIN_GET_ACTIVITIES_SUCCESS, data: activities },
          { type: actions.ADMIN_GET_ROLES_ERROR }
        ])
      );
      expect(store.getActions().length).toEqual(4);
    });

    it('handles an error getting both', async () => {
      const store = mockStore();

      fetchMock.onGet('/auth/activities').reply(500);
      fetchMock.onGet('/auth/roles').reply(500);

      await store.dispatch(actions.getRoles());

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_GET_ROLES_REQUEST
          },
          { type: actions.ADMIN_GET_ACTIVITIES_REQUEST },
          { type: actions.ADMIN_GET_ACTIVITIES_ERROR },
          { type: actions.ADMIN_GET_ROLES_ERROR }
        ])
      );
      expect(store.getActions().length).toEqual(4);
    });

    it('handles receiving both', async () => {
      const store = mockStore();

      const activities = {};
      const roles = {};

      fetchMock.onGet('/auth/activities').reply(200, activities);
      fetchMock.onGet('/auth/roles').reply(200, roles);

      await store.dispatch(actions.getRoles());

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_GET_ROLES_REQUEST
          },
          { type: actions.ADMIN_GET_ACTIVITIES_REQUEST },
          { type: actions.ADMIN_GET_ACTIVITIES_SUCCESS, data: activities },
          { type: actions.ADMIN_GET_ROLES_SUCCESS, data: roles }
        ])
      );
      expect(store.getActions().length).toEqual(4);
    });
  });

  describe('get users', () => {
    it('handles an error', async () => {
      const store = mockStore();

      fetchMock.onGet('/users').reply(500);

      await store.dispatch(actions.getUsers());

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_GET_USERS_REQUEST },
          { type: actions.ADMIN_GET_USERS_ERROR }
        ])
      );
      expect(store.getActions().length).toEqual(2);
    });

    it('handles receiving users', async () => {
      const store = mockStore();

      const users = {};
      fetchMock.onGet('/users').reply(200, users);

      await store.dispatch(actions.getUsers());

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_GET_USERS_REQUEST },
          { type: actions.ADMIN_GET_USERS_SUCCESS, data: users }
        ])
      );
      expect(store.getActions().length).toEqual(2);
    });
  });

  describe('create a user account', () => {
    const user = {
      email: 'em@il.com',
      name: 'name',
      password: 'password',
      state: 'mo'
    };

    it('handles an invalid user', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPost('/users').reply(400, { error: 'add-user-invalid' });

      try {
        await store.dispatch(actions.createUser(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_CREATE_USER_REQUEST },
          { type: actions.ADMIN_CREATE_USER_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Error: Email and password are required'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles a conflicting email address', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPost('/users').reply(400, { error: 'add-user-email-exists' });

      try {
        await store.dispatch(actions.createUser(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_CREATE_USER_REQUEST },
          { type: actions.ADMIN_CREATE_USER_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Error: A user with this email already exists'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles a weak password', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPost('/users')
        .reply(400, { error: 'add-user-weak-password' });

      try {
        await store.dispatch(actions.createUser(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_CREATE_USER_REQUEST },
          { type: actions.ADMIN_CREATE_USER_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Error: The provided password is too weak'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles an invalid phone number', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPost('/users')
        .reply(400, { error: 'add-user-invalid-phone' });

      try {
        await store.dispatch(actions.createUser(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_CREATE_USER_REQUEST },
          { type: actions.ADMIN_CREATE_USER_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Error: The provided phone number is invalid'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles other errors', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPost('/users')
        .reply(400, { error: 'shrugging person made of symbols' });

      try {
        await store.dispatch(actions.createUser(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_CREATE_USER_REQUEST },
          { type: actions.ADMIN_CREATE_USER_ERROR },
          { type: ADD_NOTIFICATION, message: 'Unknown error creating user' }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles success', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPost('/users').reply(200);

      await store.dispatch(actions.createUser(user));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_CREATE_USER_REQUEST },
          { type: actions.ADMIN_CREATE_USER_SUCCESS },
          { type: ADD_NOTIFICATION, message: 'User created!' }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });
  });

  describe('edit a user account', () => {
    const user = { id: 7 };

    it('handles an invalid state (the political kind, not the logical kind', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPut('/users/7')
        .reply(400, { error: 'update-user-invalid-state' });

      try {
        await store.dispatch(actions.editAccount(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
          { type: actions.ADMIN_EDIT_ACCOUNT_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Error: the state selected for the account is invalid'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles an invalid auth role', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPut('/users/7')
        .reply(400, { error: 'update-user-invalid-role' });

      try {
        await store.dispatch(actions.editAccount(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
          { type: actions.ADMIN_EDIT_ACCOUNT_ERROR },
          {
            type: ADD_NOTIFICATION,
            message:
              'Error: the authorization role selected for the account is invalid'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles a conflicting email address', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPut('/users/7')
        .reply(400, { error: 'update-user-email-exists' });

      try {
        await store.dispatch(actions.editAccount(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
          { type: actions.ADMIN_EDIT_ACCOUNT_ERROR },
          {
            type: ADD_NOTIFICATION,
            message:
              'Error: another account already exists with that email address'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles an invalid phone number', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPut('/users/7')
        .reply(400, { error: 'update-user-invalid-phone' });

      try {
        await store.dispatch(actions.editAccount(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
          { type: actions.ADMIN_EDIT_ACCOUNT_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Error: phone number may not be more than 10 digits'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles other errors', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPut('/users/7')
        .reply(400, { error: 'shrugging person made of symbols' });

      try {
        await store.dispatch(actions.editAccount(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
          { type: actions.ADMIN_EDIT_ACCOUNT_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Unknown error editing account'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles success', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/users/7').reply(200);

      await store.dispatch(actions.editAccount(user));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
          { type: actions.ADMIN_EDIT_ACCOUNT_SUCCESS },
          { type: actions.ADMIN_GET_USERS_REQUEST },
          {
            type: ADD_NOTIFICATION,
            message: 'Account edited'
          }
        ])
      );
      expect(store.getActions().length).toEqual(4);
    });

    describe('cleans up incoming data', () => {
      it('removes empty properties and sets state and role to empty if falsey', async () => {
        const store = mockStore({ notification: { open: false, queue: [] } });

        fetchMock.onPut('/users/7').reply(200);

        await store.dispatch(
          actions.editAccount({
            id: 7,
            key: 'unchanged',
            removed: ''
          })
        );

        expect(JSON.parse(fetchMock.history.put[0].data)).toEqual({
          id: 7,
          key: 'unchanged',
          role: '',
          state: ''
        });
      });

      it('leaves state and role alone if not falsey', async () => {
        const store = mockStore({ notification: { open: false, queue: [] } });

        fetchMock.onPut('/users/7').reply(200);

        await store.dispatch(
          actions.editAccount({
            id: 7,
            key: 'unchanged',
            removed: '',
            role: 'hello',
            state: 'ma'
          })
        );

        expect(JSON.parse(fetchMock.history.put[0].data)).toEqual({
          id: 7,
          key: 'unchanged',
          role: 'hello',
          state: 'ma'
        });
      });
    });
  });

  describe('edit own account', () => {
    const user = { id: 7 };

    it('handles a conflicting email address', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/me').reply(400, { error: 'update-self-email-exists' });

      try {
        await store.dispatch(actions.editSelf(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ME_REQUEST },
          { type: actions.ADMIN_EDIT_ME_ERROR },
          {
            type: ADD_NOTIFICATION,
            message:
              'Error: another account already exists with that email address'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles an invalid phone number', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/me').reply(400, { error: 'update-self-invalid-phone' });

      try {
        await store.dispatch(actions.editSelf(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ME_REQUEST },
          { type: actions.ADMIN_EDIT_ME_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Error: phone number may not be more than 10 digits'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles a weak password', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/me').reply(400, { error: 'update-self-weak-password' });

      try {
        await store.dispatch(actions.editSelf(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ME_REQUEST },
          { type: actions.ADMIN_EDIT_ME_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Error: The provided password is too weak'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles other errors', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock
        .onPut('/me')
        .reply(400, { error: 'shrugging person made of symbols' });

      try {
        await store.dispatch(actions.editSelf(user));
      } catch (_) {} // eslint-disable-line no-empty

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ME_REQUEST },
          { type: actions.ADMIN_EDIT_ME_ERROR },
          {
            type: ADD_NOTIFICATION,
            message: 'Unknown error editing account'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('handles success', async () => {
      const data = {};
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/me').reply(200, data);

      await store.dispatch(actions.editSelf(user));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ME_REQUEST },
          { type: actions.ADMIN_EDIT_ME_SUCCESS, data },
          {
            type: ADD_NOTIFICATION,
            message: 'Account edited'
          }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });

    it('removes empty properties', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/me').reply(200);

      await store.dispatch(
        actions.editSelf({
          id: 7,
          key: 'unchanged',
          removed: ''
        })
      );

      expect(JSON.parse(fetchMock.history.put[0].data)).toEqual({
        id: 7,
        key: 'unchanged'
      });
    });
  });
});
