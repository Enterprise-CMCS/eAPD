import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import KeyPersonnel from './ApdStateKeyPersonnel';
import { ADD_APD_ITEM, REMOVE_APD_ITEM } from '../actions/editApd';
import { UPDATE_BUDGET } from '../actions/apd';

const mockStore = configureStore([thunk]);

describe('apd state profile, Medicaid office component', () => {
  const state = {
    apd: {
      data: {
        keyPersonnel: [
          {
            key: 'person1',
            name: 'person name',
            email: 'person1@theplace.gov',
            position: 'unobservable',
            percentTime: 27,
            hasCosts: true,
            costs: { '1': 100, '2': 200 }
          },
          {
            key: 'person2',
            name: '',
            email: 'person2@theplace.gov',
            position: '',
            percentTime: 72,
            hasCosts: false,
            costs: { '1': 0, '2': 0 }
          }
        ],
        years: ['1', '2']
      }
    }
  };

  const store = mockStore(state);

  // Deleting things causes a window.confirm call. Mock that to always return
  // true so we have something to test - we're not interested in testing that
  // the action obeys the confirm call here.
  jest.spyOn(window, 'confirm').mockImplementation(() => true);

  const component = mount(
    <Provider store={store}>
      <KeyPersonnel />
    </Provider>
  );

  beforeEach(() => {
    store.clearActions();
  });

  test('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  describe('events', () => {
    const list = component.find('FormAndReviewList');

    it('handles adding a new key person', () => {
      list.prop('onAddClick')();
      expect(store.getActions()).toEqual([
        {
          type: ADD_APD_ITEM,
          path: '/keyPersonnel/-'
        }
      ]);
    });

    it('handles deleting a key person', () => {
      list.prop('onDeleteClick')('person1');
      expect(store.getActions()).toEqual([
        { type: REMOVE_APD_ITEM, path: '/keyPersonnel/0' },
        { type: UPDATE_BUDGET, state }
      ]);
    });
  });
});
