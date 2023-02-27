import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import FedStateSelector from './FedStateSelector';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Pages/Apd/Activities/FFP/Federal State Split Selector',
  component: FedStateSelector,
  includeStories: /.*Story$/,
  parameters: {
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {}
};

const Template = args => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <FedStateSelector {...args} />
    </FormProvider>
  );
};

export const DefaultFedStateSelectorStory = Template.bind({});
DefaultFedStateSelectorStory.args = {
  ffp: {
    federal: 0,
    state: 100
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed90State10SelectorStory = Template.bind({});
Fed90State10SelectorStory.args = {
  ffp: {
    federal: 90,
    state: 10
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed75State25SelectorStory = Template.bind({});
Fed75State25SelectorStory.args = {
  ffp: {
    federal: 75,
    state: 25
  },
  setFederalStateSplit: action('setFederalStateSplit')
};

export const Fed50State50SelectorStory = Template.bind({});
Fed50State50SelectorStory.args = {
  ffp: {
    federal: 50,
    state: 50
  },
  setFederalStateSplit: action('setFederalStateSplit')
};
