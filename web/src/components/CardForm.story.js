import React from 'react';
import { decoratorWithProviderAndRouter } from 'apd-storybook-library';
import CardForm from './CardForm';

export const { history, decorators } = decoratorWithProviderAndRouter({
  initialState: {
    router: {
      location: {
        pathname: '/'
      }
    }
  },
  initialHistory: ['/']
});

export default {
  title: 'CardForm',
  component: CardForm,
  decorators,
  excludeStories: ['Form', 'history', 'decorators'],
  parameters: {
    jest: ['CardForm.test.js']
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

export const Form = () => (
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
  history,
  onSave: () => {}
};

export const TextField = args => (
  <CardForm {...args}>
    <Form />
  </CardForm>
);

TextField.args = {
  ...Basic.args
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
