import React from 'react';
import { plain as HeaderSaveMessage } from './HeaderSaveMessage';

export default {
  title: 'Header Save Message',
  component: HeaderSaveMessage,
  parameters: {
    jest: ['HeaderSaveMessage.test.js']
  }
};

const Template = args => <HeaderSaveMessage {...args} />;

export const Saving = Template.bind({});
Saving.args = {
  isSaving: true,
  lastSaved: null
};

export const JustSaved = Template.bind({});
JustSaved.args = {
  isSaving: false,
  lastSaved: new Date().toLocaleString()
};

export const PreviouslySaved = Template.bind({});
PreviouslySaved.args = {
  isSaving: false,
  lastSaved: new Date(Date.now() - 1000 * 60 * 3).toLocaleString()
};
