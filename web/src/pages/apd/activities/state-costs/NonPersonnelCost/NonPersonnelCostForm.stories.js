import React from 'react';
import NonPersonnelCostForm from './NonPersonnelCostForm';
import { renderWithProvider } from 'apd-storybook-library';
import { action } from '@storybook/addon-actions';
import { APD_TYPE } from '@cms-eapd/common';

export default {
  title: 'Pages/Apd/Activities/StateCosts',
  component: NonPersonnelCostForm,
  decorators: [],
  includeStories: /.*Story$/,
  parameters: {
    jest: ['NonPersonnelCostForm.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {
    index: 123,
    activityIndex: 42,
    item: {
      category: 'Hardware, software, and licensing',
      description: 'Test description',
      years: {
        2022: '100',
        2023: '200'
      },
      key: '123abc23'
    },
    setFormValid: action('setFormValid')
  }
};

const Template = args => <NonPersonnelCostForm {...args} />;

export const HitechNonPersonnelCostFormStory = Template.bind({});
HitechNonPersonnelCostFormStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            years: ['2022', '2023']
          }
        }
      },
      story
    })
];
