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
  status: 'requested',
  mailTo: 'mail@mail.com',
  administratorType: 'State'
};

export const Denied = Template.bind({});
Denied.args = {
  status: 'denied',
  mailTo: 'mail@mail.com',
  administratorType: 'State'
};

export const Revoked = Template.bind({});
Revoked.args = {
  status: 'revoked',
  mailTo: 'mail@mail.com',
  administratorType: 'State'
};
