import React from 'react';
import Router from 'react-router-dom';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import { plain as ExecutiveSummary, mapStateToProps } from './ExecutiveSummary';
import { APD_TYPE } from '@cms-eapd/common';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
  useRouteMatch: jest.fn(),
  useParams: jest.fn()
}));

const defaultProps = {
  apdType: APD_TYPE.HITECH,
  budget: {
    activities: {
      a1: {
        costsByFFY: {
          3000: 'a1 ffy 1 costs',
          3001: 'a1 ffy 2 costs',
          total: { federal: 0, medicaid: 0, total: 0 }
        }
      },
      a2: {
        costsByFFY: {
          3000: 'a2 ffy 1 costs',
          3001: 'a2 ffy 2 costs',
          total: { federal: 0, medicaid: 0, total: 0 }
        }
      }
    },
    combined: {
      3000: 'ffy 1 combined costs',
      3001: 'ffy 2 combined costs',
      total: { federal: 0, medicaid: 0, total: 0 }
    },
    hit: {
      combined: {
        3000: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        },
        3001: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        },
        total: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        }
      }
    },
    hie: {
      combined: {
        3000: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        },
        3001: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        },
        total: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        }
      }
    },
    hitAndHie: {
      combined: {
        3000: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        },
        3001: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        },
        total: {
          federal: 0,
          medicaid: 0,
          state: 0,
          total: 0
        }
      }
    },
    mmisByFFP: {}
  },
  data: [
    {
      activityId: 'a1',
      dateRange: '1/3/3000 - 2/25/3001',
      name: 'activity 1',
      summary: 'first activity',
      combined: 0,
      federal: 0,
      medicaid: 0,
      ffys: {
        3000: 'a1 ffy 1 costs',
        3001: 'a1 ffy 2 costs'
      }
    },
    {
      activityId: 'a2',
      dateRange: 'Date not specified - Date not specified',
      name: '',
      summary: 'second activity',
      combined: 0,
      federal: 0,
      medicaid: 0,
      ffys: {
        3000: 'a2 ffy 1 costs',
        3001: 'a2 ffy 2 costs'
      }
    }
  ],
  total: {
    combined: 0,
    federal: 0,
    medicaid: 0,
    ffys: {
      3000: 'ffy 1 combined costs',
      3001: 'ffy 2 combined costs'
    }
  },
  years: ['3000', '3001']
};

const setup = async (props = {}) => {
  jest.spyOn(Router, 'useHistory').mockReturnValue({ push: () => mockPush() });
  jest.spyOn(Router, 'useRouteMatch').mockReturnValue({ path: '---path---' });
  jest
    .spyOn(Router, 'useParams')
    .mockReturnValue({ apdId: '0123456789abcdef01234560' });
  let util;
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    util = renderWithConnection(
      <ExecutiveSummary {...defaultProps} {...props} />,
      {
        initialState: {
          apd: {
            data: {
              apdOverview: {
                updateStatus: {
                  isUpdateAPD: true,
                  annualUpdate: true,
                  asNeededUpdate: false
                }
              },
              activities: [],
              apdType: APD_TYPE.HITECH,
              years: ['3000', '3001']
            }
          }
        }
      }
    );
  });
  const user = userEvent.setup();
  return {
    util,
    user
  };
};

describe('<ExecutiveSummary />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    resetLDMocks();
  });

  test('renders correctly', async () => {
    mockFlags({ enableMmis: false });
    await setup();
  });
});
