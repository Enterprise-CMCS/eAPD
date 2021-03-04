import React from 'react';
import { plain as AuthenticationForm } from './AuthenticationForm';
import * as CardFormStories from './CardForm.stories';

export default {
  title: 'AuthenticationForm',
  component: AuthenticationForm,
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
  ...CardFormStories.Basic.args
};

Basic.parameters = {
  jest: ['AuthenticationForm.test.js']
};

const Form = () => (
  <div className="ds-u-margin-bottom--4">
    <label
      htmlFor="textfield"
      id="textfield-label"
      className="ds-c-label ds-u-margin-y--2 ds-u-font-weight--normal"
    >
      Enter some text in this field
    </label>
    <input
      width="200px"
      aria-labelledby="textfield-label"
      className="ds-c-field ds-c-field--medium"
      id="textfield"
      type="text"
      name="textfield"
      defaultValue="Some Text"
    />
  </div>
);

export const TextField = args => (
  <AuthenticationForm {...args}>
    <Form />
  </AuthenticationForm>
);

TextField.args = {
  ...CardFormStories.Basic.args
};

TextField.parameters = {
  ...Basic.parameters
};

export const TextFieldWithFooter = args => (
  <AuthenticationForm {...args}>
    <Form />
  </AuthenticationForm>
);

TextFieldWithFooter.args = {
  ...CardFormStories.Basic.args,
  footer: <p className="ds-u-padding-top--2">This is a footer</p>
};

TextFieldWithFooter.parameters = {
  ...Basic.parameters
};
