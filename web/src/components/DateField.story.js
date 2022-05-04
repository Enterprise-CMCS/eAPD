import React from 'react';
import DateField from './DateField';

export default {
  title: 'DateField',
  component: DateField,
  parameters: {
    jest: ['DateField.test.js']
  },
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'onChange' }
  }
};

export const Basic = args => <DateField {...args} />;

Basic.args = {
  value: '2021-1-1'
};
