import React from 'react';
import { renderWithProvider } from 'apd-storybook-library';
import AffiliationStatus from './AffiliationStatus';

export default {
  title: 'Pages/Dashboard/Affiliation Status (Redux)',
  component: AffiliationStatus,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['AffiliationStatus.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <AffiliationStatus {...args} />;

export const RequestedStory = Template.bind({});
RequestedStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        user: {
          data: {
            state: {
              id: 'na',
              state: 'New Apdland'
            },
            states: {
              na: 'requested'
            }
          }
        }
      },
      story
    })
];

export const DeniedStory = Template.bind({});
DeniedStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        user: {
          data: {
            state: {
              id: 'na',
              state: 'New Apdland'
            },
            states: {
              na: 'denied'
            }
          }
        }
      },
      story
    })
];

export const RevokedStory = Template.bind({});
RevokedStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        user: {
          data: {
            state: {
              id: 'na',
              state: 'New Apdland'
            },
            states: {
              na: 'revoked'
            }
          }
        }
      },
      story
    })
];
