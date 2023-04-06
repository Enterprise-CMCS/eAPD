import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProvider } from 'apd-storybook-library';
import ConditionsForEnhancedFunding from './ConditionsForEnhancedFunding';

export default {
  title: 'Pages/Apd/Activities/Conditions for Enhanced Funding',
  component: ConditionsForEnhancedFunding,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['ConditionsForEnhancedFunding.test.js'],
    controls: {
      hideNoControlsWarning: true
    }
  }
};

const Template = args => (
  <ConditionsForEnhancedFunding activityIndex={0} {...args} />
);

export const NoQualificationStory = Template.bind({});
NoQualificationStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=8%3A10833&t=2PuF2isVMdkoXymb-1'
  }
};
NoQualificationStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            activities: [
              {
                conditionsForEnhancedFunding: {
                  enhancedFundingQualification: false,
                  enhancedFundingJustification: null
                }
              }
            ]
          }
        }
      },
      story
    })
];

export const YesQualificationStory = Template.bind({});
YesQualificationStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=8%3A10686&t=2PuF2isVMdkoXymb-1'
  }
};
YesQualificationStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            activities: [
              {
                conditionsForEnhancedFunding: {
                  enhancedFundingQualification: true,
                  enhancedFundingJustification: null
                }
              }
            ]
          }
        }
      },
      story
    })
];

export const HelpDrawerOpenStory = Template.bind({});
HelpDrawerOpenStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=8%3A10504&t=2PuF2isVMdkoXymb-1'
  }
};
HelpDrawerOpenStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            activities: [
              {
                conditionsForEnhancedFunding: {
                  enhancedFundingQualification: true,
                  enhancedFundingJustification: null
                }
              }
            ]
          }
        }
      },
      story
    })
];

export const QualificationErrorStory = Template.bind({});
QualificationErrorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=5129%3A21533&t=2PuF2isVMdkoXymb-1'
  }
};
QualificationErrorStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            activities: [
              {
                conditionsForEnhancedFunding: {
                  enhancedFundingQualification: null,
                  enhancedFundingJustification: null
                }
              }
            ]
          },
          adminCheck: {
            enabled: true
          }
        }
      },
      story
    })
];

export const JustificationErrorStory = Template.bind({});
JustificationErrorStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=5129%3A21206&t=2PuF2isVMdkoXymb-1'
  }
};
JustificationErrorStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            activities: [
              {
                conditionsForEnhancedFunding: {
                  enhancedFundingQualification: true,
                  enhancedFundingJustification: null
                }
              }
            ]
          },
          adminCheck: {
            enabled: true
          }
        }
      },
      story
    })
];
