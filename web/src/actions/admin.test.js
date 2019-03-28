import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

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

    [
      [
        'handles an invalid user',
        'add-user-invalid',
        'Email and password are required'
      ],
      [
        'handles a conflicting email address',
        'add-user-email-exists',
        'A user with this email already exists'
      ],
      [
        'handles a weak password',
        'add-user-weak-password',
        'The provided password is too weak'
      ],
      [
        'handles an invalid phone number',
        'add-user-invalid-phone',
        'The provided phone number is invalid'
      ],
      [
        'handles other errors',
        'shrugging person made of symbols',
        'Unknown error creating user'
      ]
    ].forEach(([testName, apiError, userError]) => {
      it(testName, async () => {
        const store = mockStore({ notification: { open: false, queue: [] } });

        fetchMock.onPost('/users').reply(400, { error: apiError });

        try {
          await store.dispatch(actions.createUser(user));
        } catch (e) {
          expect(e).toEqual(userError);
        }

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { type: actions.ADMIN_CREATE_USER_REQUEST },
            {
              type: actions.ADMIN_CREATE_USER_ERROR,
              data: userError
            }
          ])
        );
        expect(store.getActions().length).toEqual(2);
      });
    });

    it('handles success', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });
      const dispatchGetUsers = sinon.stub().returns({ type: 'get users' });

      fetchMock.onPost('/users').reply(200);

      await store.dispatch(actions.createUser(user, { dispatchGetUsers }));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_CREATE_USER_REQUEST },
          { type: actions.ADMIN_CREATE_USER_SUCCESS },
          { type: 'get users' }
        ])
      );
      expect(store.getActions().length).toEqual(3);
    });
  });

  describe('edit a user account', () => {
    const user = { id: 7 };

    [
      [
        'handles an invalid state (the political kind, not the logical kind)',
        'update-user-invalid-state',
        'The state selected for the account is invalid'
      ],
      [
        'handles an invalid auth role',
        'update-user-invalid-role',
        'The authorization role selected for the account is invalid'
      ],
      [
        'handles a conflicting email address',
        'update-user-email-exists',
        'Another account already exists with that email address'
      ],
      [
        'handles an invalid phone number',
        'update-user-invalid-phone',
        'Phone number may not be more than 10 digits'
      ],
      [
        'handles other errors',
        'shrugging person made of symbols',
        'Unknown error editing account'
      ]
    ].forEach(([testName, apiError, userError]) => {
      it(testName, async () => {
        const store = mockStore({ notification: { open: false, queue: [] } });

        fetchMock.onPut('/users/7').reply(400, { error: apiError });

        try {
          await store.dispatch(actions.editAccount(user));
        } catch (e) {
          expect(e).toEqual(userError);
        }

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
            { type: actions.ADMIN_EDIT_ACCOUNT_ERROR, data: userError }
          ])
        );
        expect(store.getActions().length).toEqual(2);
      });
    });

    it('handles success', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/users/7').reply(200);

      await store.dispatch(actions.editAccount(user));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
          { type: actions.ADMIN_EDIT_ACCOUNT_SUCCESS },
          { type: actions.ADMIN_GET_USERS_REQUEST }
        ])
      );
      expect(store.getActions().length).toEqual(3);
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

    [
      [
        'handles a conflicting email address',
        'update-self-email-exists',
        'Another account already exists with that email address'
      ],
      [
        'handles an invalid phone number',
        'update-self-invalid-phone',
        'Phone number may not be more than 10 digits'
      ],
      [
        'handles a weak password',
        'update-self-weak-password',
        'The provided password is too weak'
      ],
      [
        'handles other errors',
        'shrugging person made of symbols',
        'Unknown error editing account'
      ]
    ].forEach(([testName, apiError, userError]) => {
      it(testName, async () => {
        const store = mockStore({ notification: { open: false, queue: [] } });

        fetchMock.onPut('/me').reply(400, { error: apiError });

        try {
          await store.dispatch(actions.editSelf(user));
        } catch (e) {
          expect(e).toEqual(userError);
        }

        expect(store.getActions()).toEqual(
          expect.arrayContaining([
            { type: actions.ADMIN_EDIT_ME_REQUEST },
            { type: actions.ADMIN_EDIT_ME_ERROR, data: userError }
          ])
        );
        expect(store.getActions().length).toEqual(2);
      });
    });

    it('handles success', async () => {
      const data = {};
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/me').reply(200, data);

      await store.dispatch(actions.editSelf(user));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ME_REQUEST },
          { type: actions.ADMIN_EDIT_ME_SUCCESS, data }
        ])
      );
      expect(store.getActions().length).toEqual(2);
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
