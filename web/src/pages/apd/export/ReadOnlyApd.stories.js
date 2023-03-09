import React from 'react';
import ApdSummary from './ReadOnlyApd';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/Export/ApdSummary',
  component: ApdSummary,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['ApdSummary.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => <ApdSummary {...args} />;

export const MMISApdSummaryStory = Template.bind();
// MMISApdSummaryStory.args = {
//   apdType: 'MMIS'
// };

MMISApdSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            apdType: 'MMIS',
            name: 'My Fancy APD',
            apdOverview: {
              narrativeHIE: '',
              narrativeHIT: '',
              narrativeMMIS: '',
              programOverview: 'mmis overview'
            }
          }
        }
      },
      story
    })
];

export const HITECHApdSummaryStory = Template.bind();
// HitechApdSummaryStory.args = {
//   apdType: 'HITECH'
// };

HITECHApdSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            apdType: 'HITECH',
            apdOverview: {
              narrativeHIE: '',
              narrativeHIT: '',
              narrativeMMIS: '',
              programOverview: 'hitech overview'
            }
          }
        }
      },
      story
    })
];
