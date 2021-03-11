import React from 'react';
import LoginLocked from './LoginLocked';

export default {
  title: 'LoginLocked',
  component: LoginLocked,
  parameters: {
    jest: ['LoginLocked.test.js']
  }
};

export const Basic = args => <LoginLocked {...args} />;
