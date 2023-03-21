import React from 'react';
import IncentivePayments from './IncentivePayments';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleBudget = {
  years: ['2022', '2023']
};

export default {
  title: 'Pages/Apd/Tables/IncentivePayments',
  component: IncentivePayments,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['IncentivePayments.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => <IncentivePayments {...args} />;

export const IncentivePaymentsStory = Template.bind({});
IncentivePaymentsStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        router: {
          location: {
            pathname: '/'
          }
        },
        nav: {
          continueLink: {
            label: 'go forth',
            url: '/apd/abc123/go-forth',
            selected: false
          },
          previousLink: null
        },
        apd: {
          data: {
            years: ['2022', '2023'],
            proposedBudget: {
              incentivePayments: {
                ehAmt: {
                  2022: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  },
                  2023: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  }
                },
                ehCt: {
                  2022: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  },
                  2023: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  }
                },
                epAmt: {
                  2022: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  },
                  2023: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  }
                },
                epCt: {
                  2022: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  },
                  2023: {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0
                  }
                }
              }
            },
            activities: []
          }
        },
        budget: exampleBudget
      },
      story
    })
];
