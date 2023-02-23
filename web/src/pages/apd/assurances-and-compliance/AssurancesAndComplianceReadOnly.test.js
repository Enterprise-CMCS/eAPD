import React from 'react';
import { renderWithConnection, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { APD_TYPE } from '@cms-eapd/common';
import AssurancesAndComplianceReadOnly, {
  mapStateToProps
} from './AssurancesAndComplianceReadOnly';

const defaultProps = {
  complyingWithProcurement: jest.fn(),
  complyingWithRecordsAccess: jest.fn(),
  complyingWithSecurity: jest.fn(),
  complyingWithSoftwareRights: jest.fn(),
  complyingWithIndependentVV: jest.fn(),
  justificationForProcurement: jest.fn(),
  justificationForRecordsAccess: jest.fn(),
  justificationForSecurity: jest.fn(),
  justificationForSoftwareRights: jest.fn(),
  justificationForIndependentVV: jest.fn()
};

const setup = async (props = {}, options = {}) => {
  const utils = renderWithConnection(
    <AssurancesAndComplianceReadOnly {...defaultProps} {...props} />,
    options
  );
  expect(
    await screen.findByText(/Assurances and Compliance/i)
  ).toBeInTheDocument();
  const user = userEvent.setup();
  return {
    utils,
    user
  };
};

describe('assurances and compliance component', () => {
  describe('main component', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    test('renders HITECH correctly', async () => {
      await setup(
        {},
        {
          initialState: {
            apd: {
              adminCheck: false,
              data: {
                apdType: APD_TYPE.HITECH,
                years: [2020, 2021],
                activities: [
                  {
                    key: '1234',
                    name: 'Program Administration'
                  }
                ],
                assurancesAndCompliances: {
                  procurement: [
                    {
                      title: '42 CFR Part 495.348',
                      checked: true,
                      explanation: ''
                    },
                    {
                      title: 'SMM Section 11267',
                      checked: true,
                      explanation: ''
                    },
                    { title: '45 CFR 95.613', checked: '', explanation: '' },
                    { title: '45 CFR 75.326', checked: false, explanation: '' }
                  ],
                  recordsAccess: [
                    {
                      title: '42 CFR Part 495.350',
                      checked: false,
                      explanation: 'some words'
                    },
                    {
                      title: '42 CFR Part 495.352',
                      checked: true,
                      explanation: ''
                    },
                    {
                      title: '42 CFR Part 495.346',
                      checked: true,
                      explanation: ''
                    },
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
                    {
                      title: 'SMM Section 11267',
                      checked: true,
                      explanation: ''
                    }
                  ],
                  softwareRights: [
                    { title: '42 CFR 495.360', checked: true, explanation: '' },
                    { title: '45 CFR 95.617', checked: true, explanation: '' },
                    {
                      title: '42 CFR Part 431.300',
                      checked: false,
                      explanation: ''
                    },
                    {
                      title: '42 CFR Part 433.112',
                      checked: true,
                      explanation: ''
                    }
                  ],
                  security: [
                    {
                      title: '45 CFR 164 Security and Privacy',
                      checked: false,
                      explanation: ''
                    }
                  ]
                }
              }
            }
          }
        }
      );
      expect(
        screen.getByText(/Assurances and Compliance/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText('Procurement Standards (Competition / Sole Source)')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Access to Records, Reporting and Agency Attestations')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Software & Ownership Rights, Federal Licenses, Information Safeguarding, HIPAA Compliance, and Progress Reports'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Security and Interface Requirements to Be Employed for All State HIT Systems'
        )
      ).toBeInTheDocument();
    });

    test('renders MMIS correctly', async () => {
      await setup(
        {},
        {
          initialState: {
            apd: {
              adminCheck: false,
              data: {
                apdType: APD_TYPE.MMIS,
                years: [2020, 2021],
                activities: [
                  {
                    key: '1234',
                    name: 'Program Administration'
                  }
                ],
                assurancesAndCompliances: {
                  procurement: [
                    { title: 'SMM, Part 11', checked: true, explanation: '' },
                    {
                      title: '45 CFR Part 95.615',
                      checked: '',
                      explanation: ''
                    },
                    {
                      title: '45 CFR Part 92.36',
                      checked: false,
                      explanation: ''
                    }
                  ],
                  recordsAccess: [
                    {
                      title: '42 CFR Part 433.112(b)(5)-(9)',
                      checked: false,
                      explanation: ''
                    },
                    {
                      title: '45 CFR Part 95.615',
                      checked: true,
                      explanation: ''
                    },
                    {
                      title: 'SMM Section 11267',
                      checked: true,
                      explanation: ''
                    }
                  ],
                  softwareRights: [
                    {
                      title: '45 CFR Part 95.617',
                      checked: true,
                      explanation: 'other words'
                    },
                    {
                      title: '42 CFR Part 431.300',
                      checked: true,
                      explanation: ''
                    },
                    { title: '45 CFR Part 164', checked: true, explanation: '' }
                  ],
                  independentVV: [
                    {
                      title: '45 CFR Part 95.626',
                      checked: false,
                      explanation: ''
                    }
                  ]
                }
              }
            }
          }
        }
      );
      expect(
        screen.getByRole('heading', {
          name: /Assurances and Compliance/i,
          level: 2
        })
      ).toBeInTheDocument();
      expect(
        screen.getByText('Procurement Standards (Competition / Sole Source)')
      ).toBeInTheDocument();
      expect(
        screen.getByText('Access to Records, Reporting and Agency Attestations')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Software & Ownership Rights, Federal Licenses, Information Safeguarding, HIPAA Compliance, and Progress Reports'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText('Independent Verification and Validation (IV&V)')
      ).toBeInTheDocument();
    });
  });

  test('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            assurancesAndCompliances: 'this gets mapped over'
          }
        }
      })
    ).toEqual({ apdType: 'hitech', citations: 'this gets mapped over' });
  });
});
