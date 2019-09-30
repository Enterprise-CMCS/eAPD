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
                checked: true,
                explanation: 'other words'
              },
              { title: 'SMM Section 11267', checked: true, explanation: '' }
            ],
            softwareRights: [
              { title: '42 CFR Part 495.360', checked: true, explanation: '' },
              { title: '45 CFR Part 95.617', checked: true, explanation: '' },
              { title: '42 CFR Part 431.300', checked: false, explanation: '' },
              { title: '42 CFR Part 433.112', checked: true, explanation: '' }
            ],
            security: [
              {
                title: '45 CFR 164 Securities and Privacy',
                checked: false,
                explanation: ''
              }
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

    test('dispatches when a citation is toggled yes/no', () => {
      const component = mount(
        <Provider store={store}>
          <AssurancesAndCompliance />
        </Provider>
      );

      // Based on the state above, there are four sections to test. We need
      // to target one radio button in each section. There are two per
      // assurance item, so the indices we need to target are:
      //   Procurement: 0/1 (yes/no)
      //   Records access: 8/9
      //   Software rights: 20/21
      //   Security: 28/29

      component
        .find('Choice')
        .at(0)
        .prop('onChange')();
      component
        .find('Choice')
        .at(9)
        .prop('onChange')();
      component
        .find('Choice')
        .at(21)
        .prop('onChange')();
      component
        .find('Choice')
        .at(28)
        .prop('onChange')();

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/federalCitations/procurement/0/checked',
          value: true
        },
        {
          type: EDIT_APD,
          path: '/federalCitations/recordsAccess/0/checked',
          value: false
        },
        {
          type: EDIT_APD,
          path: '/federalCitations/softwareRights/0/checked',
          value: false
        },
        {
          type: EDIT_APD,
          path: '/federalCitations/security/0/checked',
          value: true
        }
      ]);
    });

    test('dispatches when text is changed', () => {
      const component = mount(
        <Provider store={store}>
          <AssurancesAndCompliance />
        </Provider>
      );

      // Based on the state above, there should be four textareas:
      // 1) 4th procurement item
      // 2) 1st records access item
      // 3) 3rd software rights item
      // 4) 1st security item

      component
        .find('TextArea')
        .at(0)
        .prop('onChange')({ target: { value: 'new text 1' } });
      component
        .find('TextArea')
        .at(1)
        .prop('onChange')({ target: { value: 'new text 2' } });
      component
        .find('TextArea')
        .at(2)
        .prop('onChange')({ target: { value: 'new text 3' } });
      component
        .find('TextArea')
        .at(3)
        .prop('onChange')({ target: { value: 'new text 4' } });

      expect(store.getActions()).toEqual([
        {
          type: EDIT_APD,
          path: '/federalCitations/procurement/3/explanation',
          value: 'new text 1'
        },
        {
          type: EDIT_APD,
          path: '/federalCitations/recordsAccess/0/explanation',
          value: 'new text 2'
        },
        {
          type: EDIT_APD,
          path: '/federalCitations/softwareRights/2/explanation',
          value: 'new text 3'
        },
        {
          type: EDIT_APD,
          path: '/federalCitations/security/0/explanation',
          value: 'new text 4'
        }
      ]);
    });
  });

  it('LinkOrText component renders correctly', () => {
    expect(shallow(<LinkOrText title="hello" />)).toMatchSnapshot();
    expect(shallow(<LinkOrText title="hello" link="url" />)).toMatchSnapshot();
  });
});
