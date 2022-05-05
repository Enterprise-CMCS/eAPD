import React from 'react';
import Dollars from './Dollars';

export default {
  title: 'Dollars',
  component: Dollars,
  parameters: {
    jest: ['Dollars.test.js']
  }
};

export const Basic = amt => <Dollars>{amt}</Dollars>;
