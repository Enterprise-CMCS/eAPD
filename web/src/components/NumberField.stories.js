import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import NumberField from './NumberField';

export default {
  title: 'Components/NumberField',
  components: NumberField,
  includeStories: /.*Story$/,
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

export const NoMaskStory = Template.bind({});
NoMaskStory.args = {
  mask: null,
  min: null,
  round: false,
  value: '',
  onBlur: action('onBlur'),
  onChange: action('onChange')
};

export const CurrencyStory = Template.bind({});
CurrencyStory.args = {
  ...NoMaskStory.args,
  mask: 'currency',
  min: 0,
  value: '100'
};

export const PhoneStory = Template.bind({});
PhoneStory.args = {
  ...NoMaskStory.args,
  mask: 'phone',
  value: '5555555555'
};

export const SSNStory = Template.bind({});
SSNStory.args = {
  ...NoMaskStory.args,
  mask: 'ssn',
  value: '123456789'
};

export const ZipStory = Template.bind({});
ZipStory.args = {
  ...NoMaskStory.args,
  mask: 'zip',
  value: '123456789'
};
