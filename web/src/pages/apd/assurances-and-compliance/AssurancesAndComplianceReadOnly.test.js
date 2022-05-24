import { shallow } from 'enzyme';
import React from 'react';

import {
  plain as AssurancesAndComplianceReadOnly,
  mapStateToProps
} from './AssurancesAndComplianceReadOnly';

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
          { title: '42 CFR Part 433.112', checked: null }
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
      expect(
        shallow(<AssurancesAndComplianceReadOnly {...props} />)
      ).toMatchSnapshot();
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            assurancesAndCompliances: 'this gets mapped over'
          }
        }
      })
    ).toEqual({ citations: 'this gets mapped over' });
  });
});
