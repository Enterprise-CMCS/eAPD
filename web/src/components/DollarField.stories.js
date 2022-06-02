import React from 'react';
import DollarField from './DollarField';

export default {
  title: 'Components/DollarField',
  component: DollarField,
  argTypes: {
    value: { control: 'number' }
  },
  includeStories: /.*Story$/,
  parameters: {
    jest: ['DollarField.test.js']
  }
};

export const DefaultStory = args => <DollarField {...args} />;
