import React from 'react';
import {
  decoratorWithProviderAndRouter,
  renderWithProvider
} from 'apd-storybook-library';
import ApdNew from './ApdNew';

export const { history, decorators } = decoratorWithProviderAndRouter({
  initialState: {
    router: {
      location: {
        pathname: '/'
      }
    }
  },
  initialHistory: ['/']
});

export default {
  title: 'Pages/Apd/New',
  component: ApdNew,
  decorators,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['ApdNew.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <ApdNew {...args} />;

export const BasicStory = Template.bind({});
BasicStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        user: {
          data: {
            state: {
              id: 'na',
              state: 'New Apdland'
            },
            states: {
              na: 'requested'
            }
          }
        }
      },
      story
    })
];
