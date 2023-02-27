import React from 'react';
import ApdPreviousActivityTable from './ApdPreviousActivityTable';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/Tables/ApdPreviousActivityTable',
  component: ApdPreviousActivityTable,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['ApdPreviousActivityTable.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => <ApdPreviousActivityTable {...args} />;

export const ApdPreviousActivityTableStory = Template.bind({});
ApdPreviousActivityTableStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            previousActivities: {
              actualExpenditures: {
                2019: {
                  hithie: {
                    federalActual: 140000,
                    totalApproved: 280000
                  },
                  mmis: {
                    50: {
                      federalActual: 23445,
                      totalApproved: 82545
                    },
                    75: {
                      federalActual: 23440,
                      totalApproved: 75340
                    },
                    90: {
                      federalActual: 235720,
                      totalApproved: 262460
                    }
                  }
                },
                2020: {
                  hithie: {
                    federalActual: 146346,
                    totalApproved: 234526
                  },
                  mmis: {
                    50: {
                      federalActual: 129387,
                      totalApproved: 375445
                    },
                    75: {
                      federalActual: 413246,
                      totalApproved: 654455
                    },
                    90: {
                      federalActual: 614544,
                      totalApproved: 863455
                    }
                  }
                },
                2021: {
                  hithie: {
                    federalActual: 320000,
                    totalApproved: 540000
                  },
                  mmis: {
                    50: {
                      federalActual: 0,
                      totalApproved: 0
                    },
                    75: {
                      federalActual: 0,
                      totalApproved: 0
                    },
                    90: {
                      federalActual: 0,
                      totalApproved: 0
                    }
                  }
                }
              }
            },
            apdType: 'HITECH',
            id: 'abc123',
            years: ['2019', '2020'],
            activities: []
          }
        }
      },
      story
    })
];
