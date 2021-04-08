import React from 'react';
import { decoratorWithProviderAndRouter } from 'apd-storybook-library';
import CreateAPDForm from './CreateAPDForm';

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
  title: 'CreateAPDForm',
  component: CreateAPDForm,
  decorators,
  parameters: {
  },
  argTypes: {
  }
};

export const Basic = args => <CreateAPDForm {...args} />;
