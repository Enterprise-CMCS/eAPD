import React from 'react';
import NonPersonnelCosts from './NonPersonnelCosts';
import { renderWithProvider } from 'apd-storybook-library';
import { APD_TYPE } from '@cms-eapd/common';

export default {
  title: 'Pages/Apd/Activities/State Costs/Non-Personnel Costs',
  component: NonPersonnelCosts,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['NonPersonnelCosts.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {
    activityIndex: 0
  }
};

const Template = args => <NonPersonnelCosts {...args} />;

export const HitechNonPersonnelCostsStory = Template.bind({});
HitechNonPersonnelCostsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                expenses: []
              }
            ],
            years: ['3000', '3001']
          }
        }
      },
      story
    })
];

export const MmisNonPersonnelCostsStory = Template.bind({});
MmisNonPersonnelCostsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                expenses: []
              }
            ],
            years: ['3000', '3001']
          }
        }
      },
      story
    })
];
