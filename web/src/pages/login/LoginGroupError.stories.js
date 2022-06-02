import React from 'react';
import LoginGroupError from './LoginGroupError';

export default {
  title: 'Pages/Login/LoginGroupError',
  component: LoginGroupError,
  parameters: {
    jest: ['LoginGroupError.test.js']
  }
};

export const Basic = args => <LoginGroupError {...args} />;
