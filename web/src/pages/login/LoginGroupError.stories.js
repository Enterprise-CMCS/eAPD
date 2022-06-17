import React from 'react';
import { action } from '@storybook/addon-actions';
import LoginGroupError from './LoginGroupError';

export default {
  title: 'Pages/Login/LoginGroupError',
  component: LoginGroupError,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['LoginGroupError.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <LoginGroupError {...args} />;

export const JobCodeMissingStory = Template.bind({});
JobCodeMissingStory.args = {
  onCancel: action('canceled')
};
