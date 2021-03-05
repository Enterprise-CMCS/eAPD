import React from 'react';
import { plain as LoginForm } from './LoginForm';
import * as CardFormStory from './CardForm.story';

export default {
  title: 'LoginForm',
  component: LoginForm,
  decorators: CardFormStory.decorators,
  parameters: {
    jest: ['LoginForm.test.js']
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

export const Basic = args => <LoginForm {...args} />;

Basic.args = {
  ...CardFormStory.Basic.args
};

export const TextField = args => (
  <LoginForm {...args}>
    <CardFormStory.Form />
  </LoginForm>
);

TextField.args = {
  ...Basic.args
};

export const TextFieldWithFooter = args => (
  <LoginForm {...args}>
    <CardFormStory.Form />
  </LoginForm>
);

TextFieldWithFooter.args = {
  ...Basic.args,
  footer: <p className="ds-u-padding-top--2">This is a footer</p>
};
