import React from 'react';
import { renderWithProvider } from 'apd-storybook-library';
import HeaderSaveMessage from './HeaderSaveMessage';

export default {
  title: 'Layout/Header/Header Save Message (Redux)',
  component: HeaderSaveMessage,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['HeaderSaveMessage.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const date = new Date(2020, 0, 1);

const Template = args => <HeaderSaveMessage {...args} />;

export const SavingStory = Template.bind({});
SavingStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        saving: {
          saving: true
        }
      },
      story
    })
];

export const PreviouslySavedStory = Template.bind({});
PreviouslySavedStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        saving: {
          saving: false,
          lastSaved: new Date(date - 1000 * 60 * 3).toLocaleString()
        }
      },
      story
    })
];

export const ErrorSavingStory = Template.bind({});
ErrorSavingStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        saving: {
          saving: false,
          error: 'There was an issue saving'
        }
      },
      story
    })
];
