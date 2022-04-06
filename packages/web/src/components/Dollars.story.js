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

export const Basic = (amt, ...args) => <Dollars {...args}>{amt}</Dollars>;
