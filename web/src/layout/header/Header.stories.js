import React from 'react';
import { renderWithProviderAndRouter } from 'apd-storybook-library';
import Header from './Header';

export default {
  title: 'Layout/Header/Header',
  component: Header,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['Header.test.js'],
    controls: {
      include: ['showSiteTitle']
    }
  }
};

export const Template = args => <Header {...args} />;

export const UnauthenticatedUserStory = Template.bind({});
UnauthenticatedUserStory.args = {
  showSiteTitle: false
};
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

export const StateStaffUserStory = Template.bind({});
StateStaffUserStory.args = {
  showSiteTitle: true
};
StateStaffUserStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        auth: {
          authenticated: true
        },
        user: {
          data: {
            activities: [
              'create-draft',
              'view-document',
              'edit-document',
              'export-document'
            ],
            affiliation: {
              id: 399,
              user_id: '123',
              state_id: 'na',
              role_id: 58,
              status: 'approved',
              username: 'statestaff'
            },
            id: '123',
            name: 'State Staff',
            permissions: [
              {
                na: [
                  'create-draft',
                  'view-document',
                  'edit-document',
                  'export-document'
                ]
              }
            ],
            role: 'eAPD State Staff',
            state: {
              id: 'na',
              name: 'New Apdland'
            },
            states: {
              na: 'approved'
            },
            username: 'statestaff'
          },
          fetching: false,
          loaded: true,
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

export const StateAdminUserStory = Template.bind({});
StateAdminUserStory.args = {
  showSiteTitle: true
};
StateAdminUserStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        auth: {
          authenticated: true
        },
        user: {
          data: {
            activities: [
              'view-roles',
              'view-affiliations',
              'edit-affiliations',
              'create-draft',
              'view-document',
              'edit-document',
              'export-document'
            ],
            affiliation: {
              id: 396,
              user_id: '123',
              state_id: 'na',
              status: 'approved',
              username: 'stateadmin'
            },
            id: '123',
            name: 'State Staff',
            permissions: [
              {
                na: [
                  'view-roles',
                  'view-affiliations',
                  'edit-affiliations',
                  'create-draft',
                  'view-document',
                  'edit-document',
                  'export-document'
                ]
              }
            ],
            role: 'eAPD State Admin',
            state: {
              id: 'na',
              name: 'New Apdland'
            },
            states: {
              na: 'approved'
            },
            username: 'stateadmin'
          },
          fetching: false,
          loaded: true,
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
