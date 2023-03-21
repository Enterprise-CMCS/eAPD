import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import ConditionsForEnhancedFunding, {
  mapStateToProps,
  mapDispatchToProps
} from './ConditionsForEnhancedFunding';
import {
  setEnhancedFundingQualification,
  setEnhancedFundingJustification
} from '../../../../redux/actions/editActivity/conditionsForEnhancedFunding';

const defaultProps = {
  setQualification: jest.fn(),
  setJustification: jest.fn()
};

const setup = async (props = {}, options = {}) => {
  renderWithConnection(
    <ConditionsForEnhancedFunding
      activityIndex={0}
      {...defaultProps}
      {...props}
    />,
    options
  );
  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: 'Conditions for Enhanced Funding' })
    ).toBeInTheDocument();
  });
  const user = userEvent.setup();
  return { user };
};

describe('Conditions for Enhanced Funding', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders empty values correctly', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              activities: [
                {
                  conditionsForEnhancedFunding: {
                    enhancedFundingQualification: null,
                    enhancedFundingJustification: null
                  }
                }
              ]
            },
            adminCheck: {
              enabled: false
            }
          }
        }
      }
    );
    expect(
      screen.getByRole('heading', { name: 'Enhanced Funding Qualification' })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        /Yes, this activity is qualified for enhanced funding./i
      )
    ).not.toBeChecked();
    expect(
      screen.getByLabelText(
        /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
      )
    ).not.toBeChecked();
    expect(
      screen.queryByText(/Select an Enhanced Funding Qualification/i)
    ).toBeNull();
    expect(
      screen.queryByText(/Select an Enhanced Funding Qualification/i)
    ).toBeNull();
    expect(
      screen.queryByText(/Provide an Enhanced Funding Justification/i)
    ).toBeNull();
  });

  test('renders qualification error correctly', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              activities: [
                {
                  conditionsForEnhancedFunding: {
                    enhancedFundingQualification: null,
                    enhancedFundingJustification: null
                  }
                }
              ]
            },
            adminCheck: {
              enabled: true
            }
          }
        }
      }
    );
    expect(
      screen.getAllByText(/Select an Enhanced Funding Qualification/i).length
    ).toEqual(2);
  });

  test('renders correctly for no qualification', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              activities: [
                {
                  conditionsForEnhancedFunding: {
                    enhancedFundingQualification: false,
                    enhancedFundingJustification: null
                  }
                }
              ]
            },
            adminCheck: {
              enabled: true
            }
          }
        }
      }
    );
    expect(
      screen.getByLabelText(
        /Yes, this activity is qualified for enhanced funding./i
      )
    ).not.toBeChecked();
    expect(
      screen.getByLabelText(
        /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
      )
    ).toBeChecked();
    expect(
      screen.queryByRole('heading', { name: 'Enhanced Funding Justification' })
    ).toBeNull();
    expect(
      screen.queryByText(/Select an Enhanced Funding Qualification/i)
    ).toBeNull();
  });

  test('renders justification error correctly', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              activities: [
                {
                  conditionsForEnhancedFunding: {
                    enhancedFundingQualification: true,
                    enhancedFundingJustification: null
                  }
                }
              ]
            },
            adminCheck: {
              enabled: true
            }
          }
        }
      }
    );
    expect(
      screen.queryByText(/Select an Enhanced Funding Qualification/i)
    ).toBeNull();
    expect(
      screen.getByText(/Provide an Enhanced Funding Justification/i)
    ).toBeInTheDocument();
  });

  test('renders correctly for yes qualification', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              activities: [
                {
                  conditionsForEnhancedFunding: {
                    enhancedFundingQualification: true,
                    enhancedFundingJustification: null
                  }
                }
              ]
            },
            adminCheck: {
              enabled: false
            }
          }
        }
      }
    );
    expect(
      screen.getByLabelText(
        /Yes, this activity is qualified for enhanced funding./i
      )
    ).toBeChecked();
    expect(
      screen.getByLabelText(
        /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
      )
    ).not.toBeChecked();
    expect(
      screen.getByRole('heading', { name: 'Enhanced Funding Justification' })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Enhanced Funding Justification/i)
    ).toHaveValue('');
  });

  test('renders correctly for yes qualification and justification', async () => {
    await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              activities: [
                {
                  conditionsForEnhancedFunding: {
                    enhancedFundingQualification: true,
                    enhancedFundingJustification: 'This is a justification'
                  }
                }
              ]
            },
            adminCheck: {
              enabled: true
            }
          }
        }
      }
    );
    expect(
      screen.getByLabelText(
        /Yes, this activity is qualified for enhanced funding./i
      )
    ).toBeChecked();
    expect(
      screen.getByLabelText(
        /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
      )
    ).not.toBeChecked();
    expect(
      screen.getByRole('heading', { name: 'Enhanced Funding Justification' })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Enhanced Funding Justification/i)
    ).toHaveValue('This is a justification');
    expect(
      screen.queryByText(/Select an Enhanced Funding Qualification/i)
    ).toBeNull();
    expect(
      screen.queryByText(/Provide an Enhanced Funding Justification/i)
    ).toBeNull();
  });

  test('handles changing values', async () => {
    const { user } = await setup(
      {},
      {
        initialState: {
          apd: {
            data: {
              activities: [
                {
                  conditionsForEnhancedFunding: {
                    enhancedFundingQualification: null,
                    enhancedFundingJustification: null
                  }
                }
              ]
            },
            adminCheck: {
              enabled: true
            }
          }
        }
      }
    );
    // Nothing should be selected and errors messages should display
    expect(
      screen.getByLabelText(
        /Yes, this activity is qualified for enhanced funding./i
      )
    ).not.toBeChecked();
    expect(
      screen.getByLabelText(
        /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
      )
    ).not.toBeChecked();
    expect(
      screen.getAllByText(/Select an Enhanced Funding Qualification/i).length
    ).toEqual(2);
    expect(
      screen.queryByText(/Provide an Enhanced Funding Justification/i)
    ).toBeNull();

    // Select no and error messages are resolved
    user.click(
      screen.getByLabelText(
        /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
      )
    );
    await waitFor(() => {
      expect(
        screen.getByLabelText(
          /No, not applicable for enhanced funding, this activity has a 50\/50 federal state split./i
        )
      ).toBeChecked();
    });
    expect(
      screen.queryByText(/Select an Enhanced Funding Qualification/i)
    ).toBeNull();

    // Select yes and justification error should display
    user.click(
      screen.getByLabelText(
        /Yes, this activity is qualified for enhanced funding./i
      )
    );
    await waitFor(() => {
      expect(
        screen.getByLabelText(
          /Yes, this activity is qualified for enhanced funding./i
        )
      ).toBeChecked();
    });
    expect(
      screen.getByLabelText(/Enhanced Funding Justification/i)
    ).toHaveValue('');
    expect(
      screen.queryByText(/Select an Enhanced Funding Qualification/i)
    ).toBeNull();
    await waitFor(() => {
      expect(
        screen.getByText(/Provide an Enhanced Funding Justification/i)
      ).toBeInTheDocument();
    });

    // Enter Justification
    user.type(
      screen.getByLabelText(/Enhanced Funding Justification/i),
      'This is a justification'
    );
    await waitFor(() => {
      expect(
        screen.getByLabelText(/Enhanced Funding Justification/i)
      ).toHaveValue('This is a justification');
    });
    // await waitFor(() => {
    //   expect(
    //     screen.queryByText(/Provide an Enhanced Funding Justification/i)
    //   ).toBeNull();
    // });
  });
});
