import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import DateField from './DateField';

export default {
  title: 'DateField',
  component: DateField,
  parameters: {
    jest: ['DateField.test.js']
  }
};

export const Basic = args => <DateField {...args} />;

Basic.args = {
  value: '2021-1-1',
  onChange: action('onChange')
};
