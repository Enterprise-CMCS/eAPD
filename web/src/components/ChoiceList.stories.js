import React from 'react';
import Choice from './Choice';

export default {
  title: 'Components/Choice',
  component: Choice,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['Choice.test.js'],
    controls: {
      include: ['checked', 'size'],
      hideNoControlsWarning: true
    }
  },
  argTypes: {
    checked: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'medium'] }
  }
};

const Template = args => <Choice {...args} />;

export const CheckboxStory = Template.bind({});
CheckboxStory.args = {
  type: 'checkbox',
  value: 'checkbox-value',
  name: 'checkbox-name',
  label: 'Choice',
  size: 'medium'
};

export const RadioStory = Template.bind({});
RadioStory.args = {
  type: 'radio',
  value: 'radio-value',
  name: 'radio-name',
  label: 'Choice',
  size: 'medium'
};
