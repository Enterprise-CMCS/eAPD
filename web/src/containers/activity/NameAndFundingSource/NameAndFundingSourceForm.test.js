import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { UPDATE_BUDGET } from '../../../actions/apd';
import { EDIT_APD } from '../../../actions/editApd';

import NameAndFundingSource from './NameAndFundingSourceForm';

const mockStore = configureStore([thunk]);

describe('the activity name and funding source component', () => {
  const props = {
    index: 1,
    item: {
      fundingSource: 'Uncle Scrooge',
      key: 'key 1',
      name: 'Buying bikes for Huey, Dewey, and Louie'
    }
  };

  const store = mockStore('test state');

  beforeEach(() => {
    store.clearActions();
  });

  it('renders correctly', () => {
    const component = mount(
      <Provider store={store}>
        <NameAndFundingSource {...props} />
      </Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('handles changing the activity name', () => {
    const component = mount(
      <Provider store={store}>
        <NameAndFundingSource {...props} />
      </Provider>
    );

    component.find('TextField').prop('onChange')({
      target: { value: 'new value' }
    });

    expect(store.getActions()).toEqual([
      // The index that we pass via props is 1, but the name-and-funding-source
      // forms are built from a list of only the editable activities. Index 0
      // in the editable list is index 1 in the list of all activities. To
      // account for that, the form will increment the index by 1. Thus, when
      // 1 gets passed in, we expect that to become 2 when an edit happens.
      { type: EDIT_APD, path: '/activities/2/name', value: 'new value' }
    ]);
  });

  it('handles changing the funding source/program type', () => {
    const component = mount(
      <Provider store={store}>
        <NameAndFundingSource {...props} />
      </Provider>
    );

    component.find('ChoiceList').prop('onChange')({
      target: { value: 'new value' }
    });

    expect(store.getActions()).toEqual([
      {
        type: EDIT_APD,
        path: '/activities/2/fundingSource',
        value: 'new value'
      },
      { type: UPDATE_BUDGET, state: 'test state' }
    ]);
  });
});
