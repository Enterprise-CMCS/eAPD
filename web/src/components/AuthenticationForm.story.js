import React from 'react';
import { plain as AuthenticationForm } from './AuthenticationForm';
import * as CardFormStory from './CardForm.story';

export default {
  title: 'AuthenticationForm',
  component: AuthenticationForm,
  parameters: {
    jest: ['AuthenticationForm.test.js']
  },
  argTypes: {
    cancelable: { control: 'boolean' },
    canSubmit: { control: 'boolean' },
    success: { control: 'text' },
    error: { control: 'text' },
    primaryButtonText: { control: 'array' },
    sectionName: { control: 'text' },
    working: { control: 'boolean' },
    hasEverLoggedOn: { control: 'boolean' }
  }
};

export const Basic = args => <AuthenticationForm {...args} />;

Basic.args = {
  ...CardFormStory.Basic.args
};

export const TextField = args => (
  <AuthenticationForm {...args}>
    <CardFormStory.Form />
  </AuthenticationForm>
);

TextField.args = {
  ...Basic.args
};

export const TextFieldWithFooter = args => (
  <AuthenticationForm {...args}>
    <CardFormStory.Form />
  </AuthenticationForm>
);

TextFieldWithFooter.args = {
  ...Basic.args,
  footer: <p className="ds-u-padding-top--2">This is a footer</p>
};
