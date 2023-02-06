import React from 'react';
import MatchRatePicker from './MatchRatePicker';
import { withDesign } from 'storybook-addon-designs';

export default {
  title: 'Pages/Apd/Activities/FFP/Match Rate Picker',
  component: MatchRatePicker,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {}
};

const Template = args => <MatchRatePicker {...args} />;

export const DefaultMatchRatePickerStory = Template.bind({});
DefaultMatchRatePickerStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=601%3A12578&t=3yR9pRvsMuvneKFi-1'
  }
};
