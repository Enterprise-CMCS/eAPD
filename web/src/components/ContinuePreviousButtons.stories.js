import React from 'react';
import { renderWithProviderAndRouter } from 'apd-storybook-library';
import ContinuePreviousButtons from './ContinuePreviousButtons';

export default {
  title: 'Components/ContinuePreviousButtons',
  component: ContinuePreviousButtons,
  includedStories: /.*Story$/,
  // decorators,
  parameters: {
    jest: ['ContinuePreviousButtons.test.js'],
    layout: 'padded'
  }
};

const Template = args => <ContinuePreviousButtons {...args} />;

export const ContinueStory = Template.bind({});
ContinueStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        nav: {
          continueLink: {
            label: 'Key State Personnel',
            url: '/apd/628ebbac6cce3b0096537173/state-profile',
            selected: false
          }
        }
      },
      story
    })
];

export const PreviousContinueStory = Template.bind({});
PreviousContinueStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        nav: {
          continueLink: {
            label: 'Results of Previous Activities',
            url: '/apd/123/previous-activities',
            selected: false
          },
          previousLink: {
            label: 'APD Overview',
            url: '/apd/123/apd-overview',
            selected: false
          }
        }
      },
      story
    })
];

export const PreviousStory = Template.bind({});
PreviousStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        nav: {
          previousLink: {
            label: 'Executive Summary',
            url: '/apd/628ebbac6cce3b0096537173/executive-summary',
            selected: false
          }
        }
      },
      story
    })
];
