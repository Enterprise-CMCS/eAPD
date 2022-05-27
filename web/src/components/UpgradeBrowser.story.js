import React from 'react';
import UpgradeBrowser from './UpgradeBrowser';

export default {
  title: 'UpgradeBrowser',
  component: UpgradeBrowser,
  parameters: {
    jest: ['UpgradeBrowser.test.js']
  },
  argTypes: {
    show: { type: 'boolean' }
  }
};

const Template = args => <UpgradeBrowser {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  show: true
};
