import React from 'react';
import { default as MmisBudgetSummary } from './MmisBudgetSummary';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/Tables/MmisBudgetSummary',
  component: MmisBudgetSummary,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const rowKeys = [
  {
    year: '2023',
    display: 'FFY 2023'
  },
  {
    year: '2024',
    display: 'FFY 2024'
  },
  {
    year: 'total',
    display: 'Total'
  }
];

const budget = {
  mmisByFFP: {
    '90-10': {
      2023: {
        total: 5157831,
        federal: 4547548,
        medicaid: 5052831,
        state: 505283
      },
      2024: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 5157831,
        federal: 4547548,
        medicaid: 5052831,
        state: 505283
      }
    },
    '75-25': {
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2024: {
        total: 4997245,
        federal: 3747934,
        medicaid: 4997245,
        state: 1249311
      },
      total: {
        total: 4997245,
        federal: 3747934,
        medicaid: 4997245,
        state: 1249311
      }
    },
    '50-50': {
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2024: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      }
    },
    '0-100': {
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2024: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      }
    },
    combined: {
      2023: {
        total: 5157831,
        federal: 4547548,
        medicaid: 5052831,
        state: 505283
      },
      2024: {
        total: 4997245,
        federal: 3747934,
        medicaid: 4997245,
        state: 1249311
      },
      total: {
        total: 10155076,
        federal: 8295482,
        medicaid: 10050076,
        state: 1754594
      }
    }
  }
};

const Template = args => (
  <MmisBudgetSummary {...args} budget={budget} rowKeys={rowKeys} />
);

export const MmisBudgetSummaryStory = Template.bind({});
MmisBudgetSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {}
        }
      },
      story
    })
];
