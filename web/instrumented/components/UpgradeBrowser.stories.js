import React from 'react';
import UpgradeBrowser from './UpgradeBrowser';

export default {
  title: 'Components/UpgradeBrowser',
  component: UpgradeBrowser,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['UpgradeBrowser.test.js']
  },
  argTypes: {
    show: { type: 'boolean' }
  }
};

const Template = args => <UpgradeBrowser {...args} />;

export const UpgradeBrowserStory = Template.bind({});
UpgradeBrowserStory.args = {
  show: true
};
