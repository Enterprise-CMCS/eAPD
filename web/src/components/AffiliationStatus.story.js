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
  options: {
    status: 'Approval Pending From Administrator',
    src: '../static/icons/puzzle.svg',
    alt: 'Puzzle Piece Icon',
    width: 57
  },
  mailTo: 'mail@mail.com'
};

export const Denied = Template.bind({});
Denied.args = {
  options: {
    status: 'Approval Has Been Denied',
    src: '../static/icons/alert.svg',
    alt: 'Alert Icon',
    width: 51
  },
  mailTo: 'mail@mail.com'
};

export const Revoked = Template.bind({});
Revoked.args = {
  options: {
    status: 'Approval Permissions Revoked',
    src: '../static/icons/alert.svg',
    alt: 'Alert Icon',
    width: 51
  },
  mailTo: 'mail@mail.com'
};
