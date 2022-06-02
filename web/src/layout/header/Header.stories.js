import React from 'react';
import { renderWithProviderAndRouter } from 'apd-storybook-library';
import Header from './Header';

export default {
  title: 'Layout/Header/Header',
  component: Header,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['Header.test.js']
  }
};

export const Template = args => <Header {...args} />;

// auth: {
//   authenticated: false,
//   error: null,
//   fetching: false,
//   initialCheck: true,
//   hasEverLoggedOn: true,
//   factorsList: [],
//   mfaPhoneNumber: '',
//   mfaEnrollType: '',
//   verifyData: {},
//   latestActivity: null,
//   isLoggingOut: false,
//   isSessionEnding: false,
//   isExtendingSession: false,
//   expiresAt: null
// }

export const UnauthenticatedUserStory = Template.bind({});
UnauthenticatedUserStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        auth: {
          authenticated: false
        },
        user: {
          data: {
            id: '',
            email: '',
            name: '',
            position: '',
            phone: '',
            state: ''
          },
          fetching: false,
          loaded: false,
          error: false
        },
        router: {
          location: {
            pathname: '/'
          }
        }
      },
      story
    })
];

// Basic.args = {
//   ariaExpanded: false,
//   showSiteTile: true,
//   authenticated: false,
//   currentUser: { username: 'User', displayName: 'Test User' },
//   isAdmin: false,
//   currentState: { id: 'AK' },
//   canViewStateAdmin: false,
//   pathname: '/'
// };
