import React from 'react';
import { decoratorWithProviderAndRouter } from 'apd-storybook-library';
import ContinuePreviousButtons from './ContinuePreviousButtons';

const { decorators } = decoratorWithProviderAndRouter({
  initialState: {
    nav: {
      continueLink: {
        label: 'Key State Personnel',
        url: '/apd/state-profile',
        selected: false
      }
    }
  }
});

export default {
  title: 'ContinuePreviousButtons',
  component: ContinuePreviousButtons,
  decorators,
  parameters: {
    jest: ['ContinuePreviousButtons.test.js'],
    layout: 'padded'
  }
};

export const Basic = args => <ContinuePreviousButtons {...args} />;
