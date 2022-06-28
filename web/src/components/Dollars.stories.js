import React from 'react';
import Dollars from './Dollars';

export default {
  title: 'Components/Dollars',
  component: Dollars,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['Dollars.test.js']
  },
  argTypes: {
    children: {
      control: { type: 'text' }
    }
  }
};

const Template = args => <Dollars {...args} />;

export const DollarStory = Template.bind({});
DollarStory.args = {};
