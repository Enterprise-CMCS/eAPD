import React from 'react';
import AuthenticationForm from './AuthenticationForm';
import * as CardFormStories from '../../components/CardForm.stories';

export default {
  title: 'Pages/Login/AuthenticationForm',
  component: AuthenticationForm,
  includeStories: /.*Story$/,
  argTypes: {
    success: { control: 'text' },
    error: { control: 'text' },
    cancelable: { control: 'boolean' }
  },
  parameters: {
    jest: ['AuthenticationForm.test.js'],
    controls: {
      exclude: ['children', 'onSave', 'onCancel', 'footer', 'id', 'legend']
    }
  }
};

const Template = args => (
  <AuthenticationForm {...args}>
    <CardFormStories.Form />
  </AuthenticationForm>
);

export const EmptyFormStory = Template.bind({});
EmptyFormStory.args = {
  ...CardFormStories.BasicFormStory.args,
  onCancel: null
};

export const FormStory = Template.bind({});
FormStory.args = {
  ...EmptyFormStory.args
};

export const FormWithFooterStory = Template.bind({});
FormWithFooterStory.args = {
  ...EmptyFormStory.args,
  footer: <CardFormStories.Footer />
};
