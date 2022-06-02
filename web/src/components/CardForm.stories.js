import React from 'react';
import { decoratorWithProviderAndRouter } from 'apd-storybook-library';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
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
  title: 'Components/CardForm',
  component: CardForm,
  decorators,
  includeStories: /.*Story$/,
  parameters: {
    jest: ['CardForm.test.js']
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
export const Footer = () => (
  <p className="ds-u-padding-top--2">This is a footer</p>
);

const Template = args => (
  <CardForm {...args}>
    <Form />
  </CardForm>
);

export const BasicFormStory = Template.bind({});
BasicFormStory.args = {
  cancelable: true,
  canSubmit: true,
  success: false,
  error: false,
  primaryButtonText: ['Save changes', 'Working'],
  sectionName: '',
  working: false,
  hasEverLoggedOn: false,
  onSave: action('onSave')
};

export const FormWithFooterStory = Template.bind({});
FormWithFooterStory.args = {
  ...BasicFormStory.args,
  footer: <Footer />
};
