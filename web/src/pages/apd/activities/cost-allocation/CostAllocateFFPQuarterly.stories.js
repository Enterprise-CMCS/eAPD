import React from 'react';
import CostAllocateFFPQuarterly from './CostAllocateFFPQuarterly';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleBudget = {
  years: ['2022', '2023'],
  __t: 'HITECHBudget',
  activities: {
    '152a1e2b': {
      _id: '63f7ce43a104d6032e367071',
      costsByFFY: {
        2022: {
          federal: 3014848,
          medicaid: 3349831,
          state: 334983,
          total: 3454831
        },
        2023: {
          federal: 1803821,
          medicaid: 2004245,
          state: 200424,
          total: 2004245
        },
        total: {
          federal: 4818669,
          medicaid: 5354076,
          state: 535407,
          total: 5459076
        }
      },
      quarterlyFFP: {
        years: {
          2022: {
            1: {
              combined: {
                dollars: 753714,
                percent: 0
              },
              contractors: {
                dollars: 290757,
                percent: 0.25
              },
              inHouse: {
                dollars: 462957,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 753712,
                percent: 0
              },
              contractors: {
                dollars: 290757,
                percent: 0.25
              },
              inHouse: {
                dollars: 462955,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 753711,
                percent: 0
              },
              contractors: {
                dollars: 290756,
                percent: 0.25
              },
              inHouse: {
                dollars: 462955,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 753711,
                percent: 0
              },
              contractors: {
                dollars: 290756,
                percent: 0.25
              },
              inHouse: {
                dollars: 462955,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 3014848,
                percent: 0
              },
              contractors: {
                dollars: 1163026,
                percent: 1
              },
              inHouse: {
                dollars: 1851822,
                percent: 1
              }
            }
          },
          2023: {
            1: {
              combined: {
                dollars: 450956,
                percent: 0
              },
              contractors: {
                dollars: 122050,
                percent: 0.25
              },
              inHouse: {
                dollars: 328906,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 450955,
                percent: 0
              },
              contractors: {
                dollars: 122050,
                percent: 0.25
              },
              inHouse: {
                dollars: 328905,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 450955,
                percent: 0
              },
              contractors: {
                dollars: 122050,
                percent: 0.25
              },
              inHouse: {
                dollars: 328905,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 450955,
                percent: 0
              },
              contractors: {
                dollars: 122050,
                percent: 0.25
              },
              inHouse: {
                dollars: 328905,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 1803821,
                percent: 0
              },
              contractors: {
                dollars: 488200,
                percent: 1
              },
              inHouse: {
                dollars: 1315621,
                percent: 1
              }
            }
          }
        },
        total: {
          combined: 4818669,
          contractors: 1651226,
          inHouse: 3167443
        }
      }
    }
  },
  __v: 0
};

export default {
  title: 'Pages/Apd/Tables/CostAllocateFFPQuarterly',
  component: CostAllocateFFPQuarterly,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['CostAllocateFFPQuarterly.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => (
  <CostAllocateFFPQuarterly
    {...args}
    activityIndex={0}
    activityId={'152a1e2b'}
    isViewOnly={false}
    year={'2022'}
  />
);

export const CostAllocateFFPQuarterlyStory = Template.bind({});
CostAllocateFFPQuarterlyStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {}
        },
        budget: exampleBudget
      },
      story
    })
];
