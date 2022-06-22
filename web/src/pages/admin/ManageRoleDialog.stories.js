import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

import ManageRoleDialog from './ManageRoleDialog';

export default {
  title: 'Pages/Admin/ManageRoleDialog',
  component: ManageRoleDialog,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['ManageRoleDialog.test.js']
  }
};

const Template = args => <ManageRoleDialog {...args} />;

export const ManageRoleStory = Template.bind({});
ManageRoleStory.args = {
  roleTypes: [
    { id: 1, name: 'eAPD State Staff' },
    { id: 2, name: 'eAPD State Contractor' }
  ],
  selectedAffiliation: {
    displayName: 'Test User',
    primaryPhone: '555-555-5555',
    email: 'user@email.com'
  },
  hideManageModal: action('close'),
  handleAffiliationUpdate: action('update')
};
