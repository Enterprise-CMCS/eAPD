import React from 'react';
import SecurityPlanningSummary from './SecurityPlanningReadOnly';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProviderAndRouter } from 'apd-storybook-library';
import { APD_TYPE } from '@cms-eapd/common';

export default {
  title: 'Pages/Apd/SecurityPlanning',
  component: SecurityPlanningSummary,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['SecurityPlanningSummary.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {}
};

const Template = args => <SecurityPlanningSummary {...args} />;

export const IncompleteSecurityPlanningSummaryStory = Template.bind({});

IncompleteSecurityPlanningSummaryStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3725%3A25149&t=2Pbpmc5Nooy0Cy7r-1'
  }
};

IncompleteSecurityPlanningSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            securityPlanning: {
              securityAndInterfacePlan: '',
              businessContinuityAndDisasterRecovery: ''
            }
          }
        }
      },
      story
    })
];

export const CompleteSecurityPlanningSummaryStory = Template.bind({});

CompleteSecurityPlanningSummaryStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3674%3A23279&t=2Pbpmc5Nooy0Cy7r-1'
  }
};

CompleteSecurityPlanningSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            securityPlanning: {
              securityAndInterfacePlan:
                'From where I am sitting, I can see thousands of files. Many spread loosely around the place, others crushed into unmarked boxes. A few have dates on them or helpful labels such as 86-91 G/H. Not only that, but most of these appear to be handwritten or produced on a typewriter with no accompanying digital or audio versions of any sort. In fact, I believe the first computer to ever enter this room is the laptop that I brought in today. More importantly, it seems as though little of the actual investigations have been stored in the Archives, so the only thing in most of the files are the statements themselves.',
              businessContinuityAndDisasterRecovery:
                "It is going to take me a long, long time to organise this mess. I've managed to secure the services of two researchers to assist me. Well, technically three, but I don't count Martin as he's unlikely to contribute anything but delays. I plan to digitise the files as much as possible and record audio versions, though some will have to be on tape recorder, as my attempts to get them on my laptop have met with… significant audio distortions."
            }
          }
        }
      },
      story
    })
];
