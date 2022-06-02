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

export const UnauthenticatedUserStory = Template.bind({});
UnauthenticatedUserStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        auth: {
          authenticated: false
        },
        user: null,
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
