import React from 'react';
import ConsentBanner from './ConsentBanner';

export default {
  title: 'ConsentBanner',
  component: ConsentBanner,
  argTypes: {
    onAgree: () => {}
  }
};

export const defaultView = args => <ConsentBanner {...args} />;

defaultView.parameters = {
  jest: ['ConsentBanner.test.js']
};
