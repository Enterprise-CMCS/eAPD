import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import NonPersonnelCostForm from './NonPersonnelCostForm';
import { renderWithProviderAndRouter } from 'apd-storybook-library';
import { action } from '@storybook/addon-actions';
import { APD_TYPE } from '@cms-eapd/common';

const defaultItem = {
  category: 'Hardware, software, and licensing',
  description: 'Test description',
  years: {
    2022: '100',
    2023: '200'
  },
  key: '123abc23'
};

export default {
  title: 'Pages/Apd/SubForms/NonPersonnelCostForm',
  component: NonPersonnelCostForm,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['NonPersonnelCostForm.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {
    saveNonPersonnelCost: action('saveNonPersonnelCost'),
    setFormValid: action('setFormValid')
  }
};

const Template = args => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <NonPersonnelCostForm
        {...args}
        index={123}
        activityIndex={42}
        item={defaultItem}
      />
    </FormProvider>
  );
};

export const NonPersonnelCostFormStory = Template.bind({});

NonPersonnelCostFormStory.decorators = [
  story => {
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {}
        }
      },
      story
    });
  }
];
