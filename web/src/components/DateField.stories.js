import React from 'react';
import DateField from './DateField';

export default {
  title: 'Components/DateField',
  component: DateField,
  parameters: {
    jest: ['DateField.test.js'],
    controls: {
      exclude: /.*/,
      hideNoControlsWarning: true
    }
  }
};

export const DefaultStory = args => <DateField {...args} />;
DefaultStory.args = {
  value: '2020-01-01'
};

export const ErrorStory = args => <DateField {...args} />;
ErrorStory.args = {
  value: '1-1-1',
  errorMessage: 'Please enter a valid date'
};
