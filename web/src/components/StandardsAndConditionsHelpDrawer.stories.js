import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import StandardsAndConditionsHelpDrawer from './StandardsAndConditionsHelpDrawer';

export default {
  title: 'Components/Standards and Conditions Help Drawer',
  component: StandardsAndConditionsHelpDrawer,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['StandardAndConditionsHelpDrawer.test.js'],
    controls: {
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <StandardsAndConditionsHelpDrawer {...args} />;

export const DrawerOpenStory = Template.bind({});
DrawerOpenStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=8%3A10504&t=IATWLOb2vrqtiGfG-1'
  }
};
DrawerOpenStory.args = {};
