import React from 'react';
import LoginForm from './LoginForm';
import * as CardFormStories from '../../components/CardForm.stories';

export default {
  title: 'Pages/Login/LoginForm',
  component: LoginForm,
  includeStories: /.*Story$/,
  argTypes: {
    success: { control: 'text' },
    error: { control: 'text' },
    cancelable: { control: 'boolean' }
  },
  decorators: CardFormStories.decorators,
  parameters: {
    jest: ['LoginForm.test.js'],
    controls: {
      exclude: [
        'children',
        'onSave',
        'onCancel',
        'footer',
        'id',
        'legend',
        'hasEverLoggedOn'
      ]
    }
  }
};

const Template = args => (
  <LoginForm {...args}>
    <CardFormStories.Form />
  </LoginForm>
);

export const EmptyFormStory = Template.bind({});
EmptyFormStory.args = {
  ...CardFormStories.BasicFormStory.args
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
