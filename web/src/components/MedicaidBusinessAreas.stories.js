import React from 'react';

import MedicaidBusinessAreas from './MedicaidBusinessAreas';

export default {
  title: 'Components/MedicaidBusinessAreas',
  component: MedicaidBusinessAreas,
  parameters: {
    jest: ['MedicaidBusinessAreas.test.js'],
    controls: {
      exclude: /.*/,
      hideNoControlsWarning: true
    }
  }
};

const Template = args => <MedicaidBusinessAreas {...args} />;

export const MedicaidBusinessAreasStory = Template.bind({});
