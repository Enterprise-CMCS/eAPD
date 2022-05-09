import React from 'react';
import DollarField from './DollarField';

export default {
  title: 'DollarField',
  component: DollarField,
  parameters: {
    jest: ['DollarField.test.js']
  }
};

export const Basic = args => <DollarField {...args} />;
