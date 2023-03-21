import React from 'react';
import { ActivityTotalCostTable } from './OtherFunding';

export default {
  title: 'Pages/Apd/Tables/ActivityTotalCostTable',
  component: ActivityTotalCostTable,
  includeStories: /.*Story$/,
  parameters: {
    controls: {}
  }
};

const Template = args => <ActivityTotalCostTable {...args} />;

export const ActivityTotalCostTableStory = Template.bind({});
ActivityTotalCostTableStory.args = {
  years: {
    2024: { totalCost: 100, otherFunding: 100, medicaidShare: 100 },
    2023: { totalCost: 100, otherFunding: 100, medicaidShare: 100 }
  },
  ffy: '2023'
};
