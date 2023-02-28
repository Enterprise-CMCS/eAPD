import React from 'react';
import { decoratorWithProviderAndRouter } from 'apd-storybook-library';
import { renderWithProvider } from 'apd-storybook-library';
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

export const mmisEnabledStory = Template.bind({});
mmisEnabledStory.parameters = {
  launchdarkly: {
    flags: {
      enableMmis: true
    }
  }
};
mmisEnabledStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        user: {
          data: {
            state: {
              id: 'ak',
              state: 'Alaska'
            },
            states: {
              ak: 'requested'
            }
          }
        }
      },
      story
    })
];

export const mmisDisabledStory = Template.bind({});
mmisDisabledStory.parameters = {
  launchdarkly: {
    flags: {
      enableMmis: false
    }
  }
};
mmisDisabledStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        user: {
          data: {
            state: {
              id: 'ak',
              state: 'Alaska'
            },
            states: {
              ak: 'requested'
            }
          }
        }
      },
      story
    })
];
