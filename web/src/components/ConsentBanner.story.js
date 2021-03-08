import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import ConsentBanner from './ConsentBanner';

export default {
  title: 'ConsentBanner',
  component: ConsentBanner,
  parameters: {
    jest: ['ConsentBanner.test.js']
  },
  argTypes: {
    onAgree: () => {}
  }
};

export const Basic = args => <ConsentBanner {...args} />;

Basic.args = {
  onAgree: action('agreed')
};
