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

export const EmptyEnhancedFundingReadOnlyStory = Template.bind({});
EmptyEnhancedFundingReadOnlyStory.args = {
  activityIndex: 0,
  activity: {
    name: 'Pharmacy Management',
    conditionsForEnhancedFunding: {
      enhancedFundingQualification: null,
      enhancedFundingJustification: null
    }
  }
};

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
NoQualificationReadOnlyStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3630%3A22212&t=Pd0Nmklvzmf133iE-1'
  }
};

export const YesQualificationEmptyJustificationReadOnlyStory = Template.bind(
  {}
);
YesQualificationEmptyJustificationReadOnlyStory.args = {
  activityIndex: 0,
  activity: {
    name: 'Pharmacy Management',
    conditionsForEnhancedFunding: {
      enhancedFundingQualification: true,
      enhancedFundingJustification: null
    }
  }
};

export const YesQualificationJustificationReadOnlyStory = Template.bind({});
YesQualificationJustificationReadOnlyStory.args = {
  activityIndex: 0,
  activity: {
    name: 'Pharmacy Management',
    conditionsForEnhancedFunding: {
      enhancedFundingQualification: true,
      enhancedFundingJustification:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at tellus elit. Pellentesque sed porttitor velit. In at dui vitae elit fringilla mattis. Fusce aliquet tincidunt arcu sit amet volutpat. Aenean maximus ultrices nulla, quis ultrices odio maximus eget. Duis blandit nisl libero, id hendrerit sem elementum nec. In est turpis, sodales sed nisl sed, pulvinar cursus tortor. Ut sit amet imperdiet velit. Ut maximus dui at purus tempor, et accumsan magna aliquam. Pellentesque vitae lorem elementum, eleifend turpis vitae, congue diam. Vestibulum in magna auctor, imperdiet sem vel, placerat sapien. Mauris facilisis neque metus, eu ultricies tortor tempor id.'
    }
  }
};
YesQualificationJustificationReadOnlyStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3630%3A22147&t=Pd0Nmklvzmf133iE-1'
  }
};
