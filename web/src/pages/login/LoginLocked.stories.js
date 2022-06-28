import React from 'react';
import { action } from '@storybook/addon-actions';
import LoginLocked from './LoginLocked';

export default {
  title: 'Pages/Login/LoginLocked',
  component: LoginLocked,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['LoginLocked.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <LoginLocked {...args} />;

export const AccountLockedStory = Template.bind({});
AccountLockedStory.args = {
  onCancel: action('canceled')
};
