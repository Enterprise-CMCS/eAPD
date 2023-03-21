import React from 'react';
import ScheduleSummary from './ScheduleSummary';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleActivities = [
  {
    activityId: '152a1e2b',
    name: 'Implementation',
    milestones: [
      {
        endDate: '2020-09-07',
        milestone:
          'Implementation of Final Rule and Stage 3 System Developments'
      },
      {
        endDate: '2019-12-31',
        milestone: 'Environmental Scan Completion'
      },
      {
        endDate: '2022-05-30',
        milestone: 'HIT Roadmap Development'
      }
    ]
  },
  {
    activityId: '152a1e2b',
    name: 'Super',
    milestones: [
      {
        endDate: '2020-09-07',
        milestone:
          'Implementation of Final Rule and Stage 3 System Developments'
      },
      {
        endDate: '2019-12-31',
        milestone: 'Environmental Scan Completion'
      },
      {
        endDate: '2022-05-30',
        milestone: 'HIT Roadmap Development'
      }
    ]
  }
];

export default {
  title: 'Pages/Apd/Tables/ActivitySummary',
  component: ScheduleSummary,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['ScheduleSummary.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => <ScheduleSummary {...args} />;

export const ScheduleSummaryStory = Template.bind({});
ScheduleSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        router: {
          location: {
            pathname: '/'
          }
        },
        nav: {
          continueLink: {
            label: 'go forth',
            url: '/apd/abc123/go-forth',
            selected: false
          },
          previousLink: null
        },
        apd: {
          data: {
            id: 'abc123',
            years: ['2023', '2024'],
            activities: exampleActivities
          }
        }
      },
      story
    })
];
