import { mount, shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import AssurancesAndCompliance, { LinkOrText } from './AssurancesAndCompliance';
import { EDIT_APD } from '../actions/editApd';

const mockStore = configureStore();

describe('assurances and compliance component', () => {
  describe('main component', () => {
    const state = {
      apd: {
        data: {
          federalCitations: {
            procurement: [
              { title: '42 CFR Part 495.348', checked: true, explanation: '' },
              { title: 'SMM Section 11267', checked: true, explanation: '' },
              { title: '45 CFR Part 95.615', checked: '', explanation: '' },
              { title: '45 CFR Part 75.326', checked: false, explanation: '' }
            ],
            recordsAccess: [
              {
                title: '42 CFR Part 495.350',
                checked: false,
                explanation: 'some words'
              },
              { title: '42 CFR Part 495.352', checked: true, explanation: '' },
              { title: '42 CFR Part 495.346', checked: true, explanation: '' },
              {
                title: '42 CFR Part 433.112(b)(5) - (9)',
                checked: true,
                explanation: ''
              },
              {
                title: '45 CFR Part 95.615',
                checked: false,
                explanation: 'other words'
              },
              { title: 'SMM Section 11267', checked: true, explanation: '' }
            ],
            security: [
              {
                title: '45 CFR 164 Securities and Privacy',
                checked: true,
                explanation: ''
              }
            ],
            softwareRights: [
              { title: '42 CFR Part 495.360', checked: true, explanation: '' },
              { title: '45 CFR Part 95.617', checked: true, explanation: '' },
              { title: '42 CFR Part 431.300', checked: true, explanation: '' },
              { title: '42 CFR Part 433.112', checked: true, explanation: '' }
            ]
          }
        }
      }
    };

    const store = mockStore(state);

    beforeEach(() => {
      store.clearActions();
    });

    test('renders correctly', () => {
      expect(
        mount(
          <Provider store={store}>
            <AssurancesAndCompliance />
          </Provider>
        )
      ).toMatchSnapshot();
    });

    test('dispatches when text is changed', () => {
      const component = mount(
        <Provider store={store}>
          <AssurancesAndCompliance />
        </Provider>
      );

      // Based on the state above, the first textarea should correspond to
      // the 4th procurement citation. 4 = 3 because 0-based indexes.

      component
        .find('TextArea')
        .at(0)
        .prop('onChange')({ target: { value: 'new text' } });

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/federalCitations/procurement/3/explanation',
          value: 'new text'
        }
      ]);
    });
  });

  it('LinkOrText component renders correctly', () => {
    expect(shallow(<LinkOrText title="hello" />)).toMatchSnapshot();
    expect(shallow(<LinkOrText title="hello" link="url" />)).toMatchSnapshot();
  });
});
