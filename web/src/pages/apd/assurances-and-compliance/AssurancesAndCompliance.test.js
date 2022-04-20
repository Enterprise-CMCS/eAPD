import React from 'react';
import {
  renderWithConnection,
  act,
  screen,
  within,
  waitFor
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

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
} from '../../../actions/editApd';

const defaultProps = {
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

// const setup = async (props = {}) => {
//   const renderUtils = await act(async () => {
//     renderWithConnection(
//       <AssurancesAndCompliance {...defaultProps} {...props} />
//     );
//   });
//   return renderUtils;
// };

const setup = (props = {}) => {
  renderWithConnection(
    <AssurancesAndCompliance {...defaultProps} {...props} />
  );
};

xdescribe('the assurances and compliance component', () => {
  beforeEach(() => {
    defaultProps.complyingWithProcurement.mockClear();
    defaultProps.complyingWithRecordsAccess.mockClear();
    defaultProps.complyingWithSecurity.mockClear();
    defaultProps.complyingWithSoftwareRights.mockClear();
    defaultProps.justificationForProcurement.mockClear();
    defaultProps.justificationForRecordsAccess.mockClear();
    defaultProps.justificationForSecurity.mockClear();
    defaultProps.justificationForSoftwareRights.mockClear();
  });

  test('renders correctly', async () => {
    await setup();
  });
});
