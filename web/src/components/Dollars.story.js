import React from 'react';
import Dollars from './Dollars';

export default {
  title: 'Dollars',
  component: Dollars,
  parameters: {
    jest: ['Dollars.test.js']
  },
  argTypes: {
    amt: { control: 'text' }
  }
};

export const Basic = args => <Dollars {...args}>{args.amt}</Dollars>;
