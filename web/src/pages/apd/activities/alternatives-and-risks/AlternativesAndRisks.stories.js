import React from 'react';
import AlternativesAndRisks from './AlternativesAndRisks';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/Activities/Alternatives and Risks (Redux)',
  component: AlternativesAndRisks,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['Alternatives.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const router = {
  location: {
    pathname: '/apd/640f5418f30a270090db1668/activity/0/alternatives-and-risks',
    search: '',
    hash: '',
    key: 'f1am94',
    query: {}
  },
  action: 'PUSH'
};

const nav = {
  apdId: '63dc42496379ad06919f1666',
  apdType: 'MMIS',
  activities: [],
  continueLink: {
    label: 'Activity Schedule and Milestones',
    url: '/apd/640f5418f30a270090db1668/activity/0/schedule-and-milestones',
    selected: false
  },
  previousLink: {
    label: 'Activity Overview',
    url: '/apd/640f5418f30a270090db1668/activity/0/overview',
    selected: false
  },
  items: []
};

const Template = args => <AlternativesAndRisks {...args} />;

export const DefaultAlternativesAndRisksStory = Template.bind({});
DefaultAlternativesAndRisksStory.args = {
  activityIndex: 0
};
DefaultAlternativesAndRisksStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=8%3A9073&t=mGt24KbjGnzNLsGJ-1'
  }
};
DefaultAlternativesAndRisksStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            activities: [
              {
                analysisOfAlternativesAndRisks: {
                  alternativeAnalysis: '',
                  costBenefitAnalysis: '',
                  feasibilityStudy: '',
                  requirementsAnalysis: '',
                  forseeableRisks: ''
                }
              }
            ]
          }
        },
        router,
        nav
      },
      story
    })
];

export const DataAlternativesAndRisksStory = Template.bind({});
DataAlternativesAndRisksStory.args = {
  activityIndex: 0
};
DataAlternativesAndRisksStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=8%3A9073&t=mGt24KbjGnzNLsGJ-1'
  }
};
DataAlternativesAndRisksStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            activities: [
              {
                analysisOfAlternativesAndRisks: {
                  alternativeAnalysis: 'Example of an alternative analysis',
                  costBenefitAnalysis: 'Example of a cost benefit analysis',
                  feasibilityStudy: 'Example of a feasibility study',
                  requirementsAnalysis: 'Example of a requirements analysis',
                  forseeableRisks: 'Example of forseeable risks'
                }
              }
            ]
          }
        },
        router,
        nav
      },
      story
    })
];
