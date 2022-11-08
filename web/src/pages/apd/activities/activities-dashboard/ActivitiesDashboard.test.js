import React from 'react';
import { renderWithConnection, screen, fireEvent } from 'apd-testing-library';

import ActivitiesDashboard from './ActivitiesDashboard';

const initialState = {
  nav: {
    items: [
      {
        label: 'Activities',
        url: '/apd/1234asdf/activities',
        selected: false,
        items: [
          {
            label: 'Our Flag Means Death',
            url: '/apd/1234asdf/activity-1',
            selected: false
          }
        ]
      }
    ]
  },
  apd: {
    data: {
      keyStatePersonnel: {},
      years: ['2023'],
      activities: [
        {
          contractorResources: [
            {
              hourly: {
                2023: { hours: '', rate: '' }
              },
              years: {}
            }
          ],
          costAllocation: {
            2023: { ffp: { federal: 75, state: 25 }, other: 0 }
          },
          quarterlyFFP: {
            2023: {
              1: {},
              2: {},
              3: {},
              4: {}
            }
          },
          expenses: [],
          statePersonnel: [],
          name: 'Our Flag Means Death',
          alternatives: 'Pirates of the Caribbean is also a Pirate movie.',
          description:
            'Set in the early 1700s during the Golden Age of Piracy, the series follows the misadventures of aristocrat-turned-pirate Stede Bonnet and his crew aboard the Revenge as they try to make a name for themselves as pirates. The crew crosses paths with famed pirate captain Blackbeard and his right-hand-man Izzy Hands.',
          summary:
            'Our Flag Means Death is an American period romantic comedy television series created by David Jenkins.'
        }
      ]
    }
  }
};

const setup = (props = {}, options = {}) =>
  renderWithConnection(<ActivitiesDashboard {...props} />, options);

describe('ActivitiesDashboard component', () => {
  it('should render correctly', async () => {
    setup({}, { initialState });
    expect(screen).toMatchSnapshot();
  });

  it('should render activity name', async () => {
    setup({}, { initialState });
    expect(
      screen.getByText('Activity 1: Our Flag Means Death')
    ).toBeInTheDocument();
  });

  it('should render error message when there are no activities', async () => {
    setup(
      {},
      {
        initialState: {
          apd: {
            adminCheck: {
              enabled: true
            },
            data: {
              years: ['2022', '2023'],
              activities: []
            }
          }
        }
      }
    );
    expect(
      screen.getByText('Activities have not been added for this APD.')
    ).toBeInTheDocument();
  });

  // calls addActivity when the button component is clicked
  it('should add a new activity when Add Activity button is clicked', async () => {
    setup({}, { initialState });
    await fireEvent.click(screen.getByRole('button', { name: 'Add Activity' }));
    expect(screen.getByText('Activity 2: Untitled')).toBeInTheDocument();
  });
});
