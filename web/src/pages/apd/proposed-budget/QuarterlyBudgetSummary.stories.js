import React from 'react';
import QuarterlyBudgetSummary from './QuarterlyBudgetSummary';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleBudget = {
  federalShareByFFYQuarter: {
    hitAndHie: {
      years: {
        2022: {
          1: {
            inHouse: 568707,
            contractors: 464063,
            combined: 1032770
          },
          2: {
            inHouse: 568705,
            contractors: 464062,
            combined: 1032767
          },
          3: {
            inHouse: 568705,
            contractors: 464061,
            combined: 1032766
          },
          4: {
            inHouse: 568705,
            contractors: 464061,
            combined: 1032766
          },
          subtotal: {
            inHouse: 2274822,
            contractors: 1856247,
            combined: 4131069
          }
        },
        2023: {
          1: {
            inHouse: 438256,
            contractors: 235675,
            combined: 673931
          },
          2: {
            inHouse: 438255,
            contractors: 235675,
            combined: 673930
          },
          3: {
            inHouse: 438255,
            contractors: 235675,
            combined: 673930
          },
          4: {
            inHouse: 438255,
            contractors: 235675,
            combined: 673930
          },
          subtotal: {
            inHouse: 1753021,
            contractors: 942700,
            combined: 2695721
          }
        }
      },
      total: {
        inHouse: 4027843,
        contractors: 2798947,
        combined: 6826790
      }
    },
    mmis: {
      years: {
        2022: {
          1: {
            inHouse: 259425,
            contractors: 147375,
            combined: 406800
          },
          2: {
            inHouse: 259425,
            contractors: 147375,
            combined: 406800
          },
          3: {
            inHouse: 259425,
            contractors: 147375,
            combined: 406800
          },
          4: {
            inHouse: 259425,
            contractors: 147375,
            combined: 406800
          },
          subtotal: {
            inHouse: 1037700,
            contractors: 589500,
            combined: 1627200
          }
        },
        2023: {
          1: {
            inHouse: 251813,
            contractors: 142735,
            combined: 394548
          },
          2: {
            inHouse: 251813,
            contractors: 142735,
            combined: 394548
          },
          3: {
            inHouse: 251812,
            contractors: 142734,
            combined: 394546
          },
          4: {
            inHouse: 251812,
            contractors: 142734,
            combined: 394546
          },
          subtotal: {
            inHouse: 1007250,
            contractors: 570938,
            combined: 1578188
          }
        }
      },
      total: {
        inHouse: 2044950,
        contractors: 1160438,
        combined: 3205388
      }
    }
  }
};

export default {
  title: 'Pages/Apd/Tables/QuarterlyBudgetSummary',
  component: QuarterlyBudgetSummary,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['QuarterlyBudgetSummary.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => <QuarterlyBudgetSummary {...args} />;

export const QuarterlyBudgetSummaryStory = Template.bind({});
QuarterlyBudgetSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            years: ['2022', '2023'],
            activities: []
          }
        },
        budget: exampleBudget
      },
      story
    })
];
