import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as AssurancesAndCompliance,
  mapStateToProps,
  mapDispatchToProps,
  LinkOrText
} from './AssurancesAndCompliance';

import {
  setComplyingWithProcurement,
  setComplyingWithRecordsAccess,
  setComplyingWithSecurity,
  setComplyingWithSoftwareRights,
  setJustificationForProcurement,
  setJustificationForRecordsAccess,
  setJustificationForSecurity,
  setJustificationForSoftwareRights
} from '../actions/editApd';

describe('assurances and compliance component', () => {
  describe('main component', () => {
    const props = {
      citations: {
        procurement: [
          { title: '42 CFR Part 495.348', checked: true, explanation: '' },
          { title: 'SMM Section 11267', checked: true, explanation: '' },
          { title: '45 CFR 95.613', checked: '', explanation: '' },
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
            title: '42 CFR 433.112(b)',
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
            title: '45 CFR 164 Security and Privacy',
            checked: false,
            explanation: ''
          }
        ]
      },
      complyingWithProcurement: jest.fn(),
      complyingWithRecordsAccess: jest.fn(),
      complyingWithSecurity: jest.fn(),
      complyingWithSoftwareRights: jest.fn(),
      justificationForProcurement: jest.fn(),
      justificationForRecordsAccess: jest.fn(),
      justificationForSecurity: jest.fn(),
      justificationForSoftwareRights: jest.fn()
    };

    beforeEach(() => {
      props.complyingWithProcurement.mockClear();
      props.complyingWithRecordsAccess.mockClear();
      props.complyingWithSecurity.mockClear();
      props.complyingWithSoftwareRights.mockClear();
      props.justificationForProcurement.mockClear();
      props.justificationForRecordsAccess.mockClear();
      props.justificationForSecurity.mockClear();
      props.justificationForSoftwareRights.mockClear();
    });

    test('renders correctly', () => {
      expect(shallow(<AssurancesAndCompliance {...props} />)).toMatchSnapshot();
    });

    test('dispatches when a citation is toggled yes/no', () => {
      const component = shallow(<AssurancesAndCompliance {...props} />);

      // Based on the state above, there are four sections to test. We need
      // to target one radio button in each section. There are two per
      // assurance item, so the indices we need to target are:
      //   Procurement: 0/1 (yes/no)
      //   Records access: 8/9
      //   Software rights: 20/21
      //   Security: 28/29

      component
        .find('ChoiceComponent')
        .at(0)
        .simulate('change');
      component
        .find('ChoiceComponent')
        .at(9)
        .simulate('change');
      component
        .find('ChoiceComponent')
        .at(21)
        .simulate('change');
      component
        .find('ChoiceComponent')
        .at(28)
        .simulate('change');

      expect(props.complyingWithProcurement).toHaveBeenCalledWith(0, true);
      expect(props.complyingWithRecordsAccess).toHaveBeenCalledWith(0, false);
      expect(props.complyingWithSoftwareRights).toHaveBeenCalledWith(0, false);
      expect(props.complyingWithSecurity).toHaveBeenCalledWith(0, true);
    });

    test('dispatches when text is changed', () => {
      const component = shallow(<AssurancesAndCompliance {...props} />);

      // Choice component indices from above:
      //   Procurement: 0/1 (yes/no)
      //   Records access: 8/9
      //   Software rights: 20/21
      //   Security: 28/29
      // In this case, we only want the "no" choices, and we'll render the
      // "checkedChildren" prop to access the actual TextArea. Then we'll
      // simulate changing that.

      shallow(
        component
          .find('ChoiceComponent')
          .at(1)

          .prop('checkedChildren')
      )
        .find('TextArea')
        .simulate('change', { target: { value: 'new text 1' } });

      shallow(
        component
          .find('ChoiceComponent')
          .at(9)

          .prop('checkedChildren')
      )
        .find('TextArea')
        .simulate('change', { target: { value: 'new text 2' } });

      shallow(
        component
          .find('ChoiceComponent')
          .at(21)

          .prop('checkedChildren')
      )
        .find('TextArea')
        .simulate('change', { target: { value: 'new text 3' } });

      shallow(
        component
          .find('ChoiceComponent')
          .at(29)

          .prop('checkedChildren')
      )
        .find('TextArea')
        .simulate('change', { target: { value: 'new text 4' } });

      expect(props.justificationForProcurement).toHaveBeenCalledWith(
        0,
        'new text 1'
      );
      expect(props.justificationForRecordsAccess).toHaveBeenCalledWith(
        0,
        'new text 2'
      );
      expect(props.justificationForSoftwareRights).toHaveBeenCalledWith(
        0,
        'new text 3'
      );
      expect(props.justificationForSecurity).toHaveBeenCalledWith(
        0,
        'new text 4'
      );
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            federalCitations: 'this gets mapped over'
          }
        }
      })
    ).toEqual({ citations: 'this gets mapped over' });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      complyingWithProcurement: setComplyingWithProcurement,
      complyingWithRecordsAccess: setComplyingWithRecordsAccess,
      complyingWithSecurity: setComplyingWithSecurity,
      complyingWithSoftwareRights: setComplyingWithSoftwareRights,
      justificationForProcurement: setJustificationForProcurement,
      justificationForRecordsAccess: setJustificationForRecordsAccess,
      justificationForSecurity: setJustificationForSecurity,
      justificationForSoftwareRights: setJustificationForSoftwareRights
    });
  });

  it('LinkOrText component renders correctly', () => {
    expect(shallow(<LinkOrText title="hello" />)).toMatchSnapshot();
    expect(shallow(<LinkOrText title="hello" link="url" />)).toMatchSnapshot();
  });
});
