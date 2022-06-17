import React from 'react';
import { decoratorWithProvider } from 'apd-storybook-library';

import AlertMissingFFY from './AlertMissingFFY';

export const { decorators } = decoratorWithProvider({
  initialState: {
    user: {
      displayName: 'Regular User'
    },
    apd: {
      data: {
        id: '123',
        years: []
      }
    }
  }
});

export default {
  title: 'Components/AlertMissingFFY (Redux)',
  component: AlertMissingFFY,
  decorators,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['AlertMissingFFY.test.js'],
    controls: {
      exclude: ['years', 'apdId'],
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <AlertMissingFFY {...args} />;

export const NoFFYsStory = Template.bind({});
