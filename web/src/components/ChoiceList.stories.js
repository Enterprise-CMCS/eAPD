import React from 'react';
import ChoiceList from './ChoiceList';

export default {
  title: 'Components/ChoiceList',
  component: ChoiceList,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['ChoiceList.test.js'],
    controls: {
      include: ['size'],
      hideNoControlsWarning: true
    }
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium'] }
  }
};

const Template = args => <ChoiceList {...args} />;

export const CheckboxStory = Template.bind({});
CheckboxStory.args = {
  type: 'checkbox',
  choices: [
    {
      label: 'firstChoice',
      value: 'first',
      checked: false
    },
    {
      label: 'secondChoice',
      value: 'second',
      checked: false
    }
  ],
  name: 'checkboxList-name',
  label: 'ChoiceList',
  size: 'medium'
};

export const RadioStory = Template.bind({});
RadioStory.args = {
  type: 'radio',
  choices: [
    {
      label: 'firstChoice',
      value: 'first',
      checked: true
    },
    {
      label: 'secondChoice',
      value: 'second',
      checked: false
    }
  ],
  name: 'radioList-name',
  label: 'ChoiceList',
  size: 'medium'
};
