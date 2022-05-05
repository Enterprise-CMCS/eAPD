import React from 'react';
import Dollars from './Dollars';

export default {
  title: 'Dollars',
  component: Dollars,
  parameters: {
    jest: ['Dollars.test.js']
  }
};

const Template = args => <Dollars {...args} />;

export const Basic = Template.bind({});
