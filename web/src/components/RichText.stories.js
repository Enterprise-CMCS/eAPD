import React from 'react';
import { decoratorWithProvider } from 'apd-storybook-library';
import RichText from './RichText';

export const { decorators } = decoratorWithProvider({
  initialState: {}
});

export default {
  title: 'Components/RichText (Redux)',
  component: RichText,
  decorators,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['RichText.test.js'],
    controls: {
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <RichText {...args} />;

export const DefaultStory = Template.bind({});
