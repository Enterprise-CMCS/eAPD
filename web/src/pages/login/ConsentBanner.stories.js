import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import ConsentBanner from './ConsentBanner';

export default {
  title: 'Pages/Login/ConsentBanner',
  component: ConsentBanner,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['ConsentBanner.test.js'],
    controls: {
      exclude: ['onAgree'],
      hideNoControlsWarning: true
    }
  }
};

export const ConsentBannerStory = args => <ConsentBanner {...args} />;

ConsentBannerStory.args = {
  onAgree: action('agreed')
};
