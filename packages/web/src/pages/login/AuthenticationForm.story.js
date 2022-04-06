import React from 'react';
import AuthenticationForm from './AuthenticationForm';
import * as CardFormStory from '../../components/CardForm.story';

export default {
  title: 'AuthenticationForm',
  component: AuthenticationForm,
  decorators: CardFormStory.decorators,
  parameters: {
    jest: ['AuthenticationForm.test.js']
  }
};

export const Basic = args => <AuthenticationForm {...args} />;

Basic.args = {
  ...CardFormStory.Basic.args
};

const Template = args => (
  <AuthenticationForm {...args}>
    <CardFormStory.Form />
  </AuthenticationForm>
);

export const TextField = Template.bind({});
TextField.args = {
  ...Basic.args
};

export const TextFieldWithFooter = Template.bind({});
TextFieldWithFooter.args = {
  ...Basic.args,
  footer: <CardFormStory.Footer />
};
