import React from 'react';
import { plain as HeaderSaveMessage } from './HeaderSaveMessage';

export default {
  title: 'Layout/Header/Header Save Message',
  component: HeaderSaveMessage,
  parameters: {
    jest: ['HeaderSaveMessage.test.js']
  }
};

const date = new Date(2020, 0, 1);

const Template = args => <HeaderSaveMessage {...args} />;

export const Saving = Template.bind({});
Saving.args = {
  isSaving: true,
  lastSaved: null
};

export const JustSaved = Template.bind({});
JustSaved.args = {
  isSaving: false,
  lastSaved: date.toLocaleString()
};

export const PreviouslySaved = Template.bind({});
PreviouslySaved.args = {
  isSaving: false,
  lastSaved: new Date(date - 1000 * 60 * 3).toLocaleString()
};
