import React from 'react';
import SecurityPlanningSummary from './SecurityPlanningReadOnly';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/SecurityPlanning/SecurityPlanningSummary',
  component: SecurityPlanningSummary,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['SecurityPlanningSummary']
  }
};
