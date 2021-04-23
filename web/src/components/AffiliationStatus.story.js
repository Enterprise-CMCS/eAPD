import React from 'react';

import { ApprovalStatus } from './AffiliationStatus';

export default {
  title: 'Affiliation Status',
  component: ApprovalStatus,
  parameters: {
    jest: ['AffiliationStatus.test.js']
  }
};

const Template = args => <ApprovalStatus {...args} />;

export const Requested = Template.bind({});
Requested.args = {
  status: 'REQUESTED',
  administratorType: 'State',
  mailTo: 'mail@mail.com'
};

export const Denied = Template.bind({});
Denied.args = {
  status: 'DENIED',
  administratorType: 'State',
  mailTo: 'mail@mail.com'
};

export const Revoked = Template.bind({});
Revoked.args = {
  status: 'REVOKED',
  administratorType: 'State',
  mailTo: 'mail@mail.com'
};
