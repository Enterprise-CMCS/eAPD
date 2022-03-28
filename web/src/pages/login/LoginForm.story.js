import React from 'react';
import LoginForm from './LoginForm';
import * as CardFormStory from '../../components/CardForm.story';

export default {
  title: 'LoginForm',
  component: LoginForm,
  decorators: CardFormStory.decorators,
  parameters: {
    jest: ['LoginForm.test.js']
  }
};

export const Basic = args => <LoginForm {...args} />;
Basic.args = {
  ...CardFormStory.Basic.args
};

const Template = args => (
  <LoginForm {...args}>
    <CardFormStory.Form />
  </LoginForm>
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
