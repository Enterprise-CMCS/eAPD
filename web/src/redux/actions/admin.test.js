import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from './admin';

import axios from '../../util/api';

const mockStore = configureStore([thunk]);
const fetchMock = new MockAdapter(axios, { onNoMatch: 'throwException' });

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

    it('handles an error', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPost('/users').reply(400, { error: 'this-is-the-error' });

      await store.dispatch(actions.createUser(user));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_CREATE_USER_REQUEST },
          {
            type: actions.ADMIN_CREATE_USER_ERROR,
            data: 'this-is-the-error'
          }
        ])
      );
      expect(store.getActions().length).toEqual(2);
    });

    it('handles success', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });
      const dispatchGetUsers = jest.fn().mockReturnValue({ type: 'get users' });

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

    it('handles an error', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/users/7').reply(400, { error: 'this-is-the-error' });

      await store.dispatch(actions.editAccount(user));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ACCOUNT_REQUEST },
          {
            type: actions.ADMIN_EDIT_ACCOUNT_ERROR,
            data: 'this-is-the-error'
          }
        ])
      );
      expect(store.getActions().length).toEqual(2);
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

    it('handles an error', async () => {
      const store = mockStore({ notification: { open: false, queue: [] } });

      fetchMock.onPut('/me').reply(400, { error: 'this-is-the-error' });

      await store.dispatch(actions.editSelf(user));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_EDIT_ME_REQUEST },
          {
            type: actions.ADMIN_EDIT_ME_ERROR,
            data: 'this-is-the-error'
          }
        ])
      );
      expect(store.getActions().length).toEqual(2);
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

  describe('get state affiliations', () => {
    it('handles an error', async () => {
      const store = mockStore();

      fetchMock
        .onGet('/states/md/affiliations?status=pending')
        .reply(400, { error: 'this-is-the-error' });

      await store.dispatch(actions.getAffiliations('md', 'pending'));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_GET_AFFILIATIONS_ERROR,
            data: 'this-is-the-error'
          }
        ])
      );
      expect(store.getActions().length).toEqual(1);
    });

    it('handles receiving affiliations', async () => {
      const store = mockStore();

      const affiliations = {};

      fetchMock
        .onGet('/states/md/affiliations?status=pending')
        .reply(200, affiliations);

      await store.dispatch(actions.getAffiliations('md', 'pending'));

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_GET_AFFILIATIONS_SUCCESS,
            data: affiliations
          }
        ])
      );
      expect(store.getActions().length).toEqual(1);
    });
  });

  describe('update a state affiliation', () => {
    const stateId = 'md';
    const affiliationId = 1;

    it('handles an error', async () => {
      const store = mockStore();

      fetchMock
        .onPatch(`/states/${stateId}/affiliations/${affiliationId}`)
        .reply(400, { error: 'this-is-the-error' });

      await store.dispatch(
        actions.updateAffiliation(stateId, affiliationId, 21, 'approved')
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_UPDATE_AFFILIATION_ERROR,
            data: 'this-is-the-error'
          }
        ])
      );
      expect(store.getActions().length).toEqual(1);
    });

    it('handles success', async () => {
      const store = mockStore();

      fetchMock
        .onPatch(`/states/${stateId}/affiliations/${affiliationId}`)
        .reply(200);

      await store.dispatch(
        actions.updateAffiliation(stateId, affiliationId, 21, 'approved')
      );

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          { type: actions.ADMIN_UPDATE_AFFILIATION_SUCCESS }
        ])
      );
      expect(store.getActions().length).toEqual(1);
    });
  });

  describe('get role types', () => {
    it('handles an error', async () => {
      const store = mockStore();

      fetchMock.onGet('/roles').reply(400, { error: 'this-is-the-error' });

      await store.dispatch(actions.getRoleTypes());

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_GET_ROLE_TYPES_ERROR,
            data: 'this-is-the-error'
          }
        ])
      );
      expect(store.getActions().length).toEqual(1);
    });

    it('handles setting the role types', async () => {
      const store = mockStore();

      const roleTypes = {};

      fetchMock.onGet('/roles').reply(200, roleTypes);

      await store.dispatch(actions.getRoleTypes());

      expect(store.getActions()).toEqual(
        expect.arrayContaining([
          {
            type: actions.ADMIN_GET_ROLE_TYPES_SUCCESS,
            data: roleTypes
          }
        ])
      );
      expect(store.getActions().length).toEqual(1);
    });
  });
});
