import React from 'react';
import Router from 'react-router-dom';
import { renderWithConnection, act, screen } from 'apd-testing-library';
import userEvent from '@testing-library/user-event';
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock';

import { plain as ExecutiveSummary } from './ExecutiveSummary';
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
    mmisByFFP: {
      '90-10': {
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
      },
      '75-25': {
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
      },
      '50-50': {
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
      },
      '0-100': {
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
      },
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
    }
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

const defaultMedicaidBusinessAreas = {
  waiverSupportSystems: false,
  assetVerificationSystem: false,
  claimsProcessing: true,
  decisionSupportSystemDW: false,
  electronicVisitVerification: false,
  encounterProcessingSystemMCS: false,
  financialManagement: true,
  healthInformationExchange: false,
  longTermServicesSupports: false,
  memberManagement: false,
  pharmacyBenefitManagementPOS: false,
  programIntegrity: true,
  providerManagement: false,
  thirdPartyLiability: false,
  other: true,
  otherMedicaidBusinessAreas:
    'This is another area! And here, and here, and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here,  and here'
};

const setup = async (props = {}, options = {}) => {
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
      options
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

  test('renders HITECH correctly', async () => {
    mockFlags({ enableMmis: false });
    await setup(
      {},
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
              activities: []
            }
          }
        }
      }
    );
    expect(
      screen.getByRole('heading', { name: 'Executive Summary' })
    ).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'APD Overview' })).toBeFalsy();
    expect(
      screen.queryByRole('heading', {
        name: 'State Priorities and Scope of APD'
      })
    ).toBeFalsy();
    expect(
      screen.getByRole('heading', { name: 'Activities Summary' })
    ).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: 'Program Budget Tables' })
    ).toBeTruthy();
    expect(
      screen.getByRole('table', { name: 'HIT + HIE executive summary' })
    ).toBeTruthy();
  });

  test('renders MMIS correctly', async () => {
    mockFlags({ enableMmis: true });
    await setup(
      { apdType: APD_TYPE.MMIS },
      {
        initialState: {
          apd: {
            data: {
              apdOverview: {
                updateStatus: {
                  isUpdateAPD: true,
                  annualUpdate: true,
                  asNeededUpdate: false
                },
                medicaidBusinessAreas: defaultMedicaidBusinessAreas
              },
              activities: [],
              statePrioritiesAndScope: {
                medicaidProgramAndPriorities:
                  '<p>Medicaid program and priorities</p>',
                mesIntroduction: '<p>Introduction</p>',
                scopeOfAPD: '<p>scope</p>'
              }
            }
          }
        }
      }
    );
    expect(
      screen.getByRole('heading', { name: 'Executive Summary' })
    ).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'APD Overview' })).toBeFalsy();
    expect(
      screen.queryByRole('heading', {
        name: 'State Priorities and Scope of APD'
      })
    ).toBeFalsy();
    expect(
      screen.getByRole('heading', { name: 'Activities Summary' })
    ).toBeTruthy();
    expect(
      screen.getByRole('heading', { name: 'Program Budget Tables' })
    ).toBeTruthy();
    expect(
      screen.getByRole('table', { name: 'HIT + HIE executive summary' })
    ).toBeTruthy();
  });
});
