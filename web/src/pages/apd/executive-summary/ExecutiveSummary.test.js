import { shallow } from 'enzyme';
import React from 'react';
import Router from 'react-router-dom';

import { plain as ExecutiveSummary, mapStateToProps } from './ExecutiveSummary';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
  useRouteMatch: jest.fn(),
  useParams: jest.fn()
}));

describe('executive summary component', () => {
  const props = {
    apdId: '0123456789abcdef01234567',
    data: [
      {
        activityId: 'a1',
        name: 'activity 1',
        summary: 'first activity',
        combined: 950,
        federal: 1050,
        medicaid: 1150,
        ffys: {
          1: {
            total: 5232,
            federal: 2883,
            medicaid: 23626
          },
          2: {
            total: 848622,
            federal: 826,
            medicaid: 2468252
          }
        }
      },
      {
        activityId: 'a2',
        name: '',
        summary: 'second activity',
        combined: 310,
        federal: 2050,
        medicaid: 2150,
        ffys: {
          1: {
            total: 26926,
            federal: 2356,
            medicaid: 989264
          },
          2: {
            total: 54634738,
            federal: 643,
            medicaid: 73
          }
        }
      }
    ],
    jumpAction: jest.fn(),
    total: {
      combined: 10,
      federal: 20,
      medicaid: 30,
      ffys: {
        1: {
          total: 5232,
          federal: 2883,
          medicaid: 23626
        },
        2: {
          total: 848622,
          federal: 826,
          medicaid: 2468252
        }
      }
    },
    years: ['1', '2']
  };

  it('renders correctly', () => {
    jest
      .spyOn(Router, 'useHistory')
      .mockReturnValue({ push: () => mockPush() });
    jest.spyOn(Router, 'useRouteMatch').mockReturnValue({ path: '---path---' });
    jest
      .spyOn(Router, 'useParams')
      .mockReturnValue({ apdId: '0123456789abcdef01234560' });
    const component = shallow(<ExecutiveSummary {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('maps state to props', () => {
    const state = {
      apd: {
        data: {
          activities: [
            {
              activityId: 'a1',
              name: 'activity 1',
              activityOverview: {
                summary: 'first activity'
              },
              activitySchedule: {
                // Shirley Chisholm is seated to the United States House of Representatives
                plannedStartDate: '1969-01-03',
                // Hiram Revels is seated to the United States Senate
                plannedEndDate: '1870-02-25'
              }
            },
            {
              activityId: 'a2',
              name: '',
              activityOverview: {
                summary: 'second activity'
              }
            }
          ],
          years: ['1', '2']
        }
      },
      budget: {
        activities: {
          a1: {
            costsByFFY: {
              1: 'a1 ffy 1 costs',
              2: 'a1 ffy 2 costs',
              total: { federal: 1050, medicaid: 1150, total: 950 }
            }
          },
          a2: {
            costsByFFY: {
              1: 'a2 ffy 1 costs',
              2: 'a2 ffy 2 costs',
              total: { federal: 410, medicaid: 510, total: 310 }
            }
          }
        },
        combined: {
          1: 'ffy 1 combined costs',
          2: 'ffy 2 combined costs',
          total: { federal: 1360, medicaid: 1460, total: 1260 }
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      data: [
        {
          activityId: 'a1',
          dateRange: '1/3/1969 - 2/25/1870',
          name: 'activity 1',
          summary: 'first activity',
          combined: 950,
          federal: 1050,
          medicaid: 1150,
          ffys: {
            1: 'a1 ffy 1 costs',
            2: 'a1 ffy 2 costs'
          }
        },
        {
          activityId: 'a2',
          dateRange: 'Date not specified - Date not specified',
          name: '',
          summary: 'second activity',
          combined: 310,
          federal: 410,
          medicaid: 510,
          ffys: {
            1: 'a2 ffy 1 costs',
            2: 'a2 ffy 2 costs'
          }
        }
      ],
      total: {
        combined: 1260,
        federal: 1360,
        medicaid: 1460,
        ffys: {
          1: 'ffy 1 combined costs',
          2: 'ffy 2 combined costs'
        }
      },
      years: ['1', '2']
    });
  });
});
