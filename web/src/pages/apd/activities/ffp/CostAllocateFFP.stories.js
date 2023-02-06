import React from 'react';
import CostAllocateFFP from './CostAllocateFFP';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProvider } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/Activities/FFP/Cost Allocate FFP',
  component: CostAllocateFFP,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['CostAllocateFFP.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {
    activityIndex: 0
  }
};

const Template = args => <CostAllocateFFP {...args} />;

export const DefaultCostAllocateFFPStory = Template.bind({});
DefaultCostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=601%3A12578&t=kQLtdXv0QLAfe7eb-1'
  }
};
DefaultCostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: 'HITECH',
            id: '63dd7bff09f7e000e87e41e8',
            state: 'ak',
            keyStatePersonnel: {
              keyPersonnel: [
                {
                  costs: {
                    2023: 80000,
                    2024: 80000
                  },
                  email: 'tommyshelby@cms.gov',
                  expanded: true,
                  hasCosts: true,
                  isPrimary: true,
                  fte: {
                    2023: 0.5,
                    2024: 0.5
                  },
                  split: {
                    2023: {
                      federal: 90,
                      state: 10
                    },
                    2024: {
                      federal: 90,
                      state: 10
                    }
                  },
                  medicaidShare: {
                    2023: 0,
                    2024: 0
                  },
                  name: 'Tommy Shelby',
                  position: 'Manager',
                  key: 'c9bb3d3e'
                },
                {
                  costs: {
                    2023: 60000,
                    2024: 60000
                  },
                  email: 'pollyshelby@cms.gov',
                  expanded: true,
                  hasCosts: true,
                  isPrimary: false,
                  fte: {
                    2023: 0.5,
                    2024: 0.5
                  },
                  split: {
                    2023: {
                      federal: 90,
                      state: 10
                    },
                    2024: {
                      federal: 90,
                      state: 10
                    }
                  },
                  medicaidShare: {
                    2023: 0,
                    2024: 0
                  },
                  name: 'Polly Shelby',
                  position: 'Product Owner',
                  key: '329d4294'
                }
              ]
            },
            years: ['2023', '2024'],
            yearOptions: ['2023', '2024', '2025'],
            activities: [
              {
                fundingSource: 'HIT',
                name: 'Program Administration',
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 0,
                      state: 100
                    },
                    other: 105000
                  },
                  2024: {
                    ffp: {
                      federal: 0,
                      state: 100
                    },
                    other: 75000
                  }
                },
                id: null,
                key: '2100103b',
                activityId: '2100103b',
                milestones: [],
                outcomes: [],
                statePersonnel: [
                  {
                    key: '4a391555',
                    title: 'Developers',
                    description: 'Developers for the project',
                    years: {
                      2023: {
                        amt: 80000,
                        perc: 4
                      },
                      2024: {
                        amt: 80000,
                        perc: 4
                      }
                    }
                  }
                ],
                expenses: [
                  {
                    key: 'e42d8828',
                    category: 'Hardware, software, and licensing',
                    description: 'New hardware to support the project',
                    years: {
                      2023: 400,
                      2024: 500
                    }
                  }
                ],
                contractorResources: [
                  {
                    key: '2fc3f695',
                    name: 'We Build Software',
                    description: '<p>Contracting company</p>',
                    start: '2022-01-01',
                    end: '2023-12-31',
                    files: [],
                    totalCost: 100000,
                    years: {
                      2023: 50000,
                      2024: 50000
                    },
                    useHourly: false,
                    hourly: {
                      2023: {
                        hours: null,
                        rate: null
                      },
                      2024: {
                        hours: null,
                        rate: null
                      }
                    }
                  }
                ]
              }
            ]
          },
          byId: {}
        },
        budget: {
          combined: {
            2023: {
              total: 440400,
              federal: 0,
              medicaid: 335400,
              state: 335400
            },
            2024: {
              total: 440500,
              federal: 0,
              medicaid: 365500,
              state: 365500
            },
            total: {
              total: 880900,
              federal: 0,
              medicaid: 700900,
              state: 700900
            }
          },
          activityTotals: [
            {
              id: '2100103b',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 440400,
                  2024: 440500,
                  total: 880900
                },
                contractors: {
                  2023: 50000,
                  2024: 50000,
                  total: 100000
                },
                expenses: {
                  2023: 400,
                  2024: 500,
                  total: 900
                },
                otherFunding: {
                  2023: {
                    contractors: 11921,
                    expenses: 95,
                    statePersonnel: 92984,
                    total: 105000
                  },
                  2024: {
                    contractors: 8513,
                    expenses: 85,
                    statePersonnel: 66402,
                    total: 75000
                  }
                },
                statePersonnel: {
                  2023: 390000,
                  2024: 390000,
                  total: 780000
                }
              }
            }
          ],
          activities: {
            '2100103b': {
              costsByFFY: {
                2023: {
                  federal: 0,
                  medicaid: 335400,
                  state: 335400,
                  total: 440400
                },
                2024: {
                  federal: 0,
                  medicaid: 365500,
                  state: 365500,
                  total: 440500
                },
                total: {
                  federal: 0,
                  medicaid: 700900,
                  state: 700900,
                  total: 880900
                }
              }
            }
          },
          years: ['2023', '2024'],
          __t: 'HITECHBudget'
        },
        user: {
          data: {
            id: '00u4nbo8e9BoctLWI297',
            name: 'Regular User',
            username: 'em@il.com',
            role: 'eAPD State Admin',
            state: {
              id: 'ak',
              name: 'Alaska'
            },
            states: {
              ak: 'approved'
            }
          }
        }
      },
      story
    })
];
