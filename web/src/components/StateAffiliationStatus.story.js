import React from 'react';
import  axios from 'axios';
import  MockAdapter from 'axios-mock-adapter';

import { ApprovalStatus } from './StateAffiliationStatus';

export default {
  title: 'State Affiliation Status',
  component: ApprovalStatus,
  parameters: {
    jest: ['StateAffiliationStatus.test.js']
  }
};

const Template = args => <ApprovalStatus {...args} />;

export const Requested = Template.bind({});
Requested.args = {
  options: {
    status: 'Approval Pending From State Administrator',
    src: "../static/icons/puzzle.svg",
    alt: "Puzzle Piece Icon",
    width: 57
  },
  mailTo: "mail@mail.com"
};

export const Denied = Template.bind({});
Denied.args = {
  options: {
    status: 'Approval Has Been Denied',
    src: "../static/icons/alert.svg",
    alt: "Alert Icon",
    width: 51
  },
  mailTo: "mail@mail.com"
};

export const Revoked = Template.bind({});
Revoked.args = {
  options: {
    status: 'Approval Permissions Revoked',
    src: "../static/icons/alert.svg",
    alt: "Alert Icon",
    width: 51
  },
  mailTo: "mail@mail.com"
};
