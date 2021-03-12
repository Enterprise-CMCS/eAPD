import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import NumberField from './NumberField';

export default {
  title: 'NumberField',
  components: NumberField,
  parameters: {
    jest: ['NumberField.test.js']
  },
  argTypes: {
    mask: {
      control: { type: 'select', options: ['currency', 'phone', 'ssn', 'zip'] }
    }
  }
};

const Template = args => <NumberField {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  mask: null,
  min: null,
  round: false,
  value: '',
  onBlur: action('onBlur'),
  onChange: action('onChange')
};

export const Currency = Template.bind({});
Currency.args = {
  ...Basic.args,
  mask: 'currency',
  min: 0,
  value: '100'
};

export const Phone = Template.bind({});
Phone.args = {
  ...Basic.args,
  mask: 'phone',
  value: '5555555555'
};

export const SSN = Template.bind({});
SSN.args = {
  ...Basic.args,
  mask: 'ssn',
  value: '123456789'
};

export const Zip = Template.bind({});
Zip.args = {
  ...Basic.args,
  mask: 'zip',
  value: '123456789'
};
