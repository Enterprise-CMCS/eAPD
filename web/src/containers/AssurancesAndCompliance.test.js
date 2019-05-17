import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';

import {
  plain as AssurancesAndCompliance,
  mapStateToProps,
  mapDispatchToProps,
  LinkOrText
} from './AssurancesAndCompliance';
import { updateApd } from '../actions/apd';

describe('assurances and compliance component', () => {
  describe('main component', () => {
    const sandbox = sinon.createSandbox();

    const props = {
      sections: {
        procurement: [
          { title: '42 CFR Part 495.348', checked: false, explanation: '' },
          { title: 'SMM Section 11267', checked: true, explanation: '' },
          { title: '45 CFR Part 95.615', checked: '', explanation: '' },
          { title: '45 CFR Part 75.326', checked: true, explanation: '' }
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
      },
      updateApd: sandbox.spy()
    };

    beforeEach(() => {
      sandbox.resetHistory();
    });

    test('renders correctly', () => {
      expect(shallow(<AssurancesAndCompliance {...props} />)).toMatchSnapshot();
    });

    test('dispatches when text is changed', () => {
      const component = shallow(<AssurancesAndCompliance {...props} />);

      component
        .find('Choice')
        .at(1) // choice 0 is yes, choice 1 is no
        .dive()
        .find('TextField')
        .simulate('change', { target: { value: 'new text' } });

      expect(
        props.updateApd.calledWith({
          federalCitation: { procurement: { 0: { explanation: 'new text' } } }
        })
      );
    });

    test('maps state to props', () => {
      const state = {
        apd: {
          data: {
            federalCitations: 'this is here'
          }
        }
      };

      expect(mapStateToProps(state)).toEqual({
        sections: 'this is here'
      });
    });

    test('maps dispatch to props', () => {
      expect(mapDispatchToProps).toEqual({ updateApd });
    });
  });

  it('LinkOrText component renders correctly', () => {
    expect(shallow(<LinkOrText title="hello" />)).toMatchSnapshot();
    expect(shallow(<LinkOrText title="hello" link="url" />)).toMatchSnapshot();
  });
});
