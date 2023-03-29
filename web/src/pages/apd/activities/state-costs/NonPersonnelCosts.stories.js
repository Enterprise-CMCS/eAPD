import React from 'react';
import NonPersonnelCosts from './NonPersonnelCosts';
import { renderWithProvider } from 'apd-storybook-library';
import { APD_TYPE } from '@cms-eapd/common';

const oneExpense = [
  {
    description: 'Training and outreach',
    category: 'Training and outreach',
    years: {
      2022: 40000,
      2023: 40000
    },
    id: null,
    key: 'cb161b62'
  }
];

const multiExpenses = [
  {
    description: 'Training and outreach',
    category: 'Training and outreach',
    years: {
      2022: 40000,
      2023: 40000
    },
    id: null,
    key: 'cb161b62'
  },
  {
    description: 'Travel',
    category: 'Travel',
    years: {
      2022: 35000,
      2023: 35000
    },
    id: null,
    key: '1130e3ce'
  },
  {
    description: 'Hardware, software, and licensing',
    category: 'Hardware, software, and licensing',
    years: {
      2022: 700000,
      2023: 0
    },
    id: null,
    key: 'c4fcb70d'
  },
  {
    category: 'Administrative operations',
    description: 'Boom',
    years: {
      2022: 3000,
      2023: 2000
    },
    id: null,
    key: 'c614f263'
  }
];

export default {
  title: 'Pages/Apd/Activities/State Costs/Non-Personnel Costs',
  component: NonPersonnelCosts,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['NonPersonnelCosts.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {
    activityIndex: 0
  }
};

const Template = args => <NonPersonnelCosts {...args} />;

export const EmptyHitechNonPersonnelCostsStory = Template.bind({});
EmptyHitechNonPersonnelCostsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                expenses: []
              }
            ],
            years: ['3000', '3001']
          }
        }
      },
      story
    })
];

export const OneExpenseHitechNonPersonnelCostsStory = Template.bind({});
OneExpenseHitechNonPersonnelCostsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                expenses: oneExpense
              }
            ],
            years: ['3000', '3001']
          }
        }
      },
      story
    })
];

export const MultiExpenseHitechNonPersonnelCostsStory = Template.bind({});
MultiExpenseHitechNonPersonnelCostsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                expenses: multiExpenses
              }
            ],
            years: ['3000', '3001']
          }
        }
      },
      story
    })
];

export const EmptyMmisNonPersonnelCostsStory = Template.bind({});
EmptyMmisNonPersonnelCostsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                expenses: []
              }
            ],
            years: ['3000', '3001']
          }
        }
      },
      story
    })
];

export const OneExpenseMmisNonPersonnelCostsStory = Template.bind({});
OneExpenseMmisNonPersonnelCostsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                expenses: oneExpense
              }
            ],
            years: ['3000', '3001']
          }
        }
      },
      story
    })
];

export const MultiExpenseMmisNonPersonnelCostsStory = Template.bind({});
MultiExpenseMmisNonPersonnelCostsStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                expenses: multiExpenses
              }
            ],
            years: ['3000', '3001']
          }
        }
      },
      story
    })
];
