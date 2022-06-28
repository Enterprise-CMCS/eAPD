import React from 'react';

import DeleteModal from './DeleteModal';

export default {
  title: 'Components/DeleteModal',
  component: DeleteModal,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['DeleteModal.test.js'],
    controls: {
      include: ['objType']
    }
  }
};

const Template = args => <DeleteModal {...args} />;

export const APDStory = Template.bind({});
APDStory.args = {
  objType: 'APD'
};

export const FFYStory = Template.bind({});
FFYStory.args = {
  objType: 'FFY'
};

export const KeyPersonnelStory = Template.bind({});
KeyPersonnelStory.args = {
  objType: 'Key Personnel'
};

export const ActivityStory = Template.bind({});
ActivityStory.args = {
  objType: 'Activity'
};

export const FundingSourceStory = Template.bind({});
FundingSourceStory.args = {
  objType: 'Funding Source'
};

export const OutcomeAndMetricsStory = Template.bind({});
OutcomeAndMetricsStory.args = {
  objType: 'Outcome and Metrics'
};

export const MetricStory = Template.bind({});
MetricStory.args = {
  objType: 'Metric'
};

export const MilestoneStory = Template.bind({});
MilestoneStory.args = {
  objType: 'Milestone'
};

export const StateStaffExpensesStory = Template.bind({});
StateStaffExpensesStory.args = {
  objType: 'State Staff Expenses'
};

export const StateExpenseStory = Template.bind({});
StateExpenseStory.args = {
  objType: 'Other State Expense'
};

export const PrivateContractorStory = Template.bind({});
PrivateContractorStory.args = {
  objType: 'Private Contractor'
};

export const CertificationStory = Template.bind({});
CertificationStory.args = {
  objType: 'Certification'
};

export const DefaultStory = Template.bind({});
DefaultStory.args = {
  objType: 'Foo'
};
