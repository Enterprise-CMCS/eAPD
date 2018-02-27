// import MockAdapter from 'axios-mock-adapter';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';

import * as actions from './user';
// import axios from '../util/api';

// const mockStore = configureStore([thunk]);
// const fetchMock = new MockAdapter(axios);

describe('user actions', () => {
  it('requestUser should create GET_USER_REQUEST action', () => {
    expect(actions.requestUser()).toEqual({ type: actions.GET_USER_REQUEST });
  });

  it('receiveUser should create GET_USER_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveUser(data)).toEqual({
      type: actions.GET_USER_SUCCESS,
      data
    });
  });

  it('failUser should create GET_USER_FAILURE action', () => {
    expect(actions.failUser('foo')).toEqual({
      type: actions.GET_USER_FAILURE,
      error: 'foo'
    });
  });

  it('requestUserUpdate should create UPDATE_USER_REQUEST action', () => {
    expect(actions.requestUserUpdate()).toEqual({
      type: actions.UPDATE_USER_REQUEST
    });
  });

  it('receiveUserUpdate should create UPDATE_USER_SUCCESS action', () => {
    const data = { name: 'foo' };
    expect(actions.receiveUserUpdate(data)).toEqual({
      type: actions.UPDATE_USER_SUCCESS,
      data
    });
  });

  it('failUserUpdate should create GET_USER_FAILURE action', () => {
    expect(actions.failUserUpdate('foo')).toEqual({
      type: actions.UPDATE_USER_FAILURE,
      error: 'foo'
    });
  });
});
