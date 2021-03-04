import React from 'react';
import { plain as CardForm } from './CardForm';

export default {
  title: 'CardForm',
  component: CardForm,
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

export const Basic = args => <CardForm {...args} />;

Basic.args = {
  cancelable: true,
  canSubmit: true,
  success: false,
  error: false,
  primaryButtonText: ['Save changes', 'Working'],
  sectionName: '',
  working: false,
  hasEverLoggedOn: false,
  history: { goBack: () => {} },
  onSave: () => {}
};

Basic.parameters = {
  jest: ['CardForm.test.js']
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
  <CardForm {...args}>
    <Form />
  </CardForm>
);

TextField.args = {
  ...Basic.args
};

TextField.parameters = {
  ...Basic.parameters
};

export const TextFieldWithFooter = args => (
  <CardForm {...args}>
    <Form />
  </CardForm>
);

TextFieldWithFooter.args = {
  ...Basic.args,
  footer: <p className="ds-u-padding-top--2">This is a footer</p>
};

TextFieldWithFooter.parameters = {
  ...Basic.parameters
};
