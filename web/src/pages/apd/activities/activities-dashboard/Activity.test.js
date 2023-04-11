import React from 'react';
import { APD_TYPE } from '@cms-eapd/common';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';

import {
  default as EntryDetails,
  mapStateToProps,
  mapDispatchToProps
} from './Activity';
import { removeActivity } from '../../../../redux/actions/editActivity';

const defaultProps = {
  remove: jest.fn()
};

const setup = async (props = {}, options = {}) => {
  renderWithConnection(<EntryDetails {...defaultProps} {...props} />, options);
  await waitFor(() => {
    expect(screen.getByRole('heading')).toHaveTextContent('Activity');
  });
  const user = userEvent.setup();
  return { user };
};

describe('the (Activity) EntryDetails component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('maps state to props', () => {
    const state = {
      apd: {
        data: {
          apdType: APD_TYPE.HITECH,
          activities: [
            {
              fundingSource: 'money pit',
              activityId: 'key1',
              name: 'that free money guy'
            },
            {
              fundingSource: 'black market kidneys',
              activityId: 'key2',
              name: 'scary alley'
            },
            {
              fundingSource: 'appropriations',
              activityId: 'key3',
              name: 'Congress Dollars'
            },
            {
              fundingSource: 'blackjack',
              activityId: 'key4',
              name: 'Lucky Pete'
            }
          ]
        }
      }
    };

    expect(mapStateToProps(state, { activityIndex: 2 })).toEqual({
      activityId: 'key3',
      apdType: APD_TYPE.HITECH,
      fundingSource: 'appropriations',
      name: 'Congress Dollars'
    });
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps).toEqual({
      remove: removeActivity
    });
  });

  it('renders the correct activity based on the activity index given', async () => {
    const props = {
      activityIndex: 2,
      apdId: '1234',
      key: '152a1e2b'
    };
    await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: 'MMIS',
                name: 'Cool Activity'
              },
              {
                activityId: '3110a314',
                fundingSource: 'MMIS',
                name: 'Extra Activity'
              },
              {
                activityId: '3110a314',
                fundingSource: 'MMIS',
                name: 'The Choose Me Activity'
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });
    expect(screen.getByRole('heading').textContent).toBe(
      'Activity 3: The Choose Me Activity'
    );
  });

  it('renders funding source in the heading for HITECH types', async () => {
    const props = {
      activityIndex: 0,
      apdId: '1234',
      key: '152a1e2b'
    };
    await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: 'HIE',
                name: 'Cool Activity'
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });
    expect(screen.getByRole('heading').textContent).toBe(
      'Activity 1: Cool Activity (HIE)'
    );
  });

  it('renders WITHOUT funding source in the heading for non-HITECH (e.g. MMIS) types', async () => {
    const props = {
      activityIndex: 0,
      apdId: '1234',
      key: '152a1e2b'
    };
    await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: 'MMIS',
                name: 'Cool Activity'
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });
    expect(screen.getByRole('heading').textContent).toBe(
      'Activity 1: Cool Activity'
    );
  });

  it('renders "Untitled" when there is no activity name', async () => {
    const props = {
      activityIndex: 0,
      apdId: '1234',
      key: '152a1e2b'
    };
    await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: 'HIE',
                name: null
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });
    expect(screen.getByRole('heading').textContent).toBe(
      'Activity 1: Untitled (HIE)'
    );
  });

  it('renders when there is no funding source', async () => {
    const props = {
      activityIndex: 0,
      apdId: '1234',
      key: '152a1e2b'
    };
    await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: null,
                name: 'Cool Activity'
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });
    expect(screen.getByRole('heading').textContent).toBe(
      'Activity 1: Cool Activity'
    );
  });

  it('renders when there is no name and no funding source', async () => {
    const props = {
      activityIndex: 0,
      apdId: '1234',
      key: '152a1e2b'
    };
    await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: null,
                name: null
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });
    expect(screen.getByRole('heading').textContent).toBe(
      'Activity 1: Untitled'
    );
  });

  it('renders the edit link', async () => {
    const props = {
      activityIndex: 0,
      apdId: '1234',
      key: '152a1e2b'
    };
    const { user } = await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: 'MMIS',
                name: 'Cool Activity'
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });

    await user.click(
      screen.getByRole('link', { name: 'Edit: Activity 1: Cool Activity' })
    );
  });

  it('renders the delete button', async () => {
    const props = {
      activityIndex: 0,
      apdId: '1234',
      key: '152a1e2b'
    };
    const { user } = await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: 'MMIS',
                name: 'Cool Activity'
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });

    await user.click(
      screen.getByRole('button', { name: 'Delete: Activity 1: Cool Activity' })
    );

    // Delete modal pop up displays
    await waitFor(() => {
      screen.getByText(/Do you want to delete this activity?/i);
    });
    screen.getByRole('button', { name: 'Delete Activity' });
    screen.getByRole('button', { name: 'Cancel' });
  });

  it('renders WITHOUT the delete button when activity index is 0 for HITECH APD type', async () => {
    const props = {
      activityIndex: 0,
      apdId: '1234',
      key: '152a1e2b'
    };
    await setup(props, {
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                activityId: '152a1e2b',
                fundingSource: 'MMIS',
                name: 'Cool Activity'
              },
              {
                activityId: '3110a314',
                fundingSource: 'MMIS',
                name: 'Extra Activity'
              }
            ]
          },
          adminCheck: {
            enabled: false
          }
        }
      }
    });
    expect(
      screen.queryByRole('button', {
        name: 'Delete: Activity 1: Cool Activity'
      })
    ).not.toBeInTheDocument();
  });
});
