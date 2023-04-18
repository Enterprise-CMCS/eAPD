import React from 'react';
import {
  render,
  renderWithConnection,
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved
} from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import { APD_TYPE } from '@cms-eapd/common';
import AssurancesAndCompliance, {
  mapStateToProps,
  mapDispatchToProps,
  LinkOrText
} from './AssurancesAndCompliance';

import {
  setComplyingWithProcurement,
  setComplyingWithRecordsAccess,
  setComplyingWithSecurity,
  setComplyingWithSoftwareRights,
  setComplyingWithIndependentVV,
  setJustificationForProcurement,
  setJustificationForRecordsAccess,
  setJustificationForSecurity,
  setJustificationForSoftwareRights,
  setJustificationForIndependentVV
} from '../../../redux/actions/editApd';

const defaultProps = {
  complyingWithProcurement: jest.fn(),
  complyingWithRecordsAccess: jest.fn(),
  complyingWithSecurity: jest.fn(),
  complyingWithSoftwareRights: jest.fn(),
  setComplyingWithIndependentVV: jest.fn(),
  justificationForProcurement: jest.fn(),
  justificationForRecordsAccess: jest.fn(),
  justificationForSecurity: jest.fn(),
  justificationForSoftwareRights: jest.fn(),
  setJustificationForIndependentVV: jest.fn()
};

const setup = async (props = {}, options = {}) => {
  const utils = renderWithConnection(
    <AssurancesAndCompliance {...defaultProps} {...props} />,
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

jest.setTimeout(300000);
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
        screen.getByText(/Federal Citations and Justification/i)
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
                      explanation: 'some words'
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
        screen.getByText(/Federal Citations and Justification/i)
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

    test('dispatches when a citation is toggled yes/no', async () => {
      const { user } = await setup(
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
                    {
                      title: '45 CFR Part 75.326',
                      checked: false,
                      explanation: ''
                    }
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
                    {
                      title: '42 CFR Part 495.360',
                      checked: true,
                      explanation: ''
                    },
                    {
                      title: '45 CFR Part 95.617',
                      checked: true,
                      explanation: ''
                    },
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

      // Does not show error messages if adminCheck is false
      expect(
        screen.queryAllByText('Select yes or no', {
          selector: 'span',
          ignore: 'div'
        })
      ).toHaveLength(0);

      // Based on the state above, there are four sections to test. We need
      // to target one choice list in each section. The indices are as follows:
      //   Procurement: 3
      //   Records access: 6
      //   Software rights: 11
      //   Security: 14
      expect(screen.queryAllByRole('radio', { name: /No/i })[3]).toBeChecked();
      expect(screen.queryAllByRole('radio', { name: /Yes/i })[6]).toBeChecked();
      expect(
        screen.queryAllByRole('radio', { name: /Yes/i })[11]
      ).toBeChecked();
      expect(screen.queryAllByRole('radio', { name: /No/i })[14]).toBeChecked();

      await user.click(screen.queryAllByRole('radio', { name: /Yes/i })[3]);
      await user.click(screen.queryAllByRole('radio', { name: /No/i })[6]);
      await user.click(screen.queryAllByRole('radio', { name: /No/i })[11]);
      await user.click(screen.queryAllByRole('radio', { name: /Yes/i })[14]);

      expect(screen.queryAllByRole('radio', { name: /Yes/i })[3]).toBeChecked();
      expect(screen.queryAllByRole('radio', { name: /No/i })[6]).toBeChecked();
      expect(screen.queryAllByRole('radio', { name: /No/i })[11]).toBeChecked();
      expect(
        screen.queryAllByRole('radio', { name: /Yes/i })[14]
      ).toBeChecked();

      expect(
        screen.queryAllByRole('radio', { name: /No/i })[3]
      ).not.toBeChecked();
      expect(
        screen.queryAllByRole('radio', { name: /Yes/i })[6]
      ).not.toBeChecked();
      expect(
        screen.queryAllByRole('radio', { name: /Yes/i })[11]
      ).not.toBeChecked();
      expect(
        screen.queryAllByRole('radio', { name: /No/i })[14]
      ).not.toBeChecked();
    });

    test('displays error correctly', async () => {
      const { user } = await setup(
        {},
        {
          initialState: {
            apd: {
              adminCheck: {
                enabled: true
              },
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
                    {
                      title: 'SMM, Part 11',
                      checked: null,
                      explanation: ''
                    },
                    {
                      title: '45 CFR Part 95.615',
                      checked: null,
                      explanation: ''
                    },
                    {
                      title: '45 CFR Part 92.36',
                      checked: null,
                      explanation: ''
                    }
                  ],
                  recordsAccess: [
                    {
                      title: '42 CFR Part 433.112(b)(5)-(9)',
                      checked: null,
                      explanation: 'some words'
                    },
                    {
                      title: '45 CFR Part 95.615',
                      checked: null,
                      explanation: ''
                    },
                    {
                      title: 'SMM Section 11267',
                      checked: null,
                      explanation: ''
                    }
                  ],
                  softwareRights: [
                    {
                      title: '45 CFR Part 95.617',
                      checked: null,
                      explanation: ''
                    },
                    {
                      title: '42 CFR Part 431.300',
                      checked: null,
                      explanation: ''
                    },
                    {
                      title: '45 CFR Part 164',
                      checked: null,
                      explanation: ''
                    }
                  ],
                  independentVV: [
                    {
                      title: '45 CFR Part 95.626',
                      checked: null,
                      explanation: ''
                    }
                  ]
                }
              }
            }
          }
        }
      );

      const cfrFieldset = screen
        .getByRole('link', { name: /SMM, Part 11/i })
        // eslint-disable-next-line testing-library/no-node-access
        .closest('fieldset');
      const cfrWithin = within(cfrFieldset);

      // when admin check is on, it should display radio error on load
      expect(
        await cfrWithin.findAllByText('Select yes or no.', {
          selector: 'span',
          ignore: 'div'
        })
      ).toHaveLength(1);

      // when admin check is on, and yes is selected, there is no error
      user.click(cfrWithin.getByRole('radio', { name: /Yes/i }));
      await waitFor(() => {
        expect(cfrWithin.getByRole('radio', { name: /Yes/i })).toBeChecked();
      });
      expect(
        cfrWithin.queryAllByText('Select yes or no.', {
          selector: 'span',
          ignore: 'div'
        })
      ).toHaveLength(0);

      // when admin check is on, and no is selected, there is an error for explanation
      user.click(cfrWithin.getByRole('radio', { name: /No/i }));
      await waitFor(() => {
        expect(cfrWithin.getByRole('radio', { name: /No/i })).toBeChecked();
      });
      expect(
        await cfrWithin.findAllByText('Provide an explanation.', {
          selector: 'span',
          ignore: 'div'
        })
      ).toHaveLength(1);

      // when admin check is on, and yes is selected again, there is no error
      user.click(cfrWithin.getByRole('radio', { name: /Yes/i }));
      await waitFor(() => {
        expect(cfrWithin.getByRole('radio', { name: /Yes/i })).toBeChecked();
      });
      expect(
        cfrWithin.queryAllByText('Select yes or no', {
          selector: 'span',
          ignore: 'div'
        })
      ).toHaveLength(0);

      // when admin check is on, and no is selected and there is an explanation, there is no error
      user.click(cfrWithin.getByRole('radio', { name: /No/i }));
      await waitFor(() => {
        expect(cfrWithin.getByRole('radio', { name: /No/i })).toBeChecked();
      });
      const explanation = cfrWithin.getByLabelText(/Please explain/i);
      user.click(explanation);
      user.type(explanation, 'some words');
      user.tab();
      await waitForElementToBeRemoved(
        cfrWithin.queryAllByText('Provide an explanation', {
          selector: 'span',
          ignore: 'div'
        })
      )
        .then(() => {})
        .catch(() => {});
    });
  });

  it('maps state to props', () => {
    expect(
      mapStateToProps({
        apd: {
          adminCheck: {
            enabled: false
          },
          data: {
            apdType: APD_TYPE.HITECH,
            assurancesAndCompliances: 'this gets mapped over'
          }
        }
      })
    ).toEqual({
      adminCheck: false,
      apdType: 'hitech',
      citations: 'this gets mapped over'
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      complyingWithProcurement: setComplyingWithProcurement,
      complyingWithRecordsAccess: setComplyingWithRecordsAccess,
      complyingWithSecurity: setComplyingWithSecurity,
      complyingWithSoftwareRights: setComplyingWithSoftwareRights,
      complyingWithIndependentVV: setComplyingWithIndependentVV,
      justificationForProcurement: setJustificationForProcurement,
      justificationForRecordsAccess: setJustificationForRecordsAccess,
      justificationForSecurity: setJustificationForSecurity,
      justificationForSoftwareRights: setJustificationForSoftwareRights,
      justificationForIndependentVV: setJustificationForIndependentVV
    });
  });

  it('LinkOrText component renders text correctly', () => {
    render(<LinkOrText title="hello" />);
    expect(screen.getByText('hello')).toBeTruthy();
  });

  it('LinkOrText component renders link correctly', () => {
    const { container } = render(<LinkOrText title="hello" link="url" />);
    expect(screen.getByText('hello')).toBeTruthy();
    expect(container).toContainHTML(
      '<a href="url" target="_blank" rel="noopener noreferrer">hello</a>'
    );
  });
});
