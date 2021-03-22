import React from 'react';
import { plain as Header } from './Header';

export default {
  title: 'Header',
  component: Header,
  parameters: {
    jest: ['Header.test.js']
  }
};

export const Basic = args => <Header {...args} />;
Basic.args = {
  ariaExpanded: false,
  showSiteTile: true,
  authenticated: false,
  currentUser: { username: 'User', displayName: 'Test User' },
  isAdmin: false,
  currentState: { id: 'AK' },
  canViewStateAdmin: false,
  pathname: '/'
};
