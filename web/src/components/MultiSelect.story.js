import React from 'react';
import MultiSelect from './MultiSelect';

export default {
  title: 'MultiSelect',
  component: MultiSelect,
  parameters: {
    jest: ['MultiSelect.test.js']
  }
};

export const Basic = args => <MultiSelect {...args} />;
