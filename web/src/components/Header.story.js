import React from 'react';
import { plain as Header } from './Header';

export default {
  title: 'Header',
  component: Header,
  parameters: {
    jest: ['Header.test.js']
  }
};

const Basic = args => <Header {...args} />;
Basic.args = {
  ariaExpanded: false,
  showSiteTile: true,
  authenticated: false,
  currentUser: null,
  isAdmin: false,
  currentState: null,
  canViewStateAdmin: false,
  pathname: '/'
};
