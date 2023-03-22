import React from 'react';
import ConditionsForEnhancedFundingReadOnly from './ConditionsForEnhancedFundingReadOnly';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Pages/Apd/Activities/Conditions for Enhanced Funding Read-Only',
  components: ConditionsForEnhancedFundingReadOnly,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['ConditionsForEnhancedFundingReadOnly.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <ConditionsForEnhancedFundingReadOnly {...args} />;

export const NoQualificationReadOnlyStory = Template.bind({});
NoQualificationReadOnlyStory.args = {
  activityIndex: 0,
  activity: {
    name: 'Pharmacy Management',
    conditionsForEnhancedFunding: {
      enhancedFundingQualification: false,
      enhancedFundingJustification: null
    }
  }
};
