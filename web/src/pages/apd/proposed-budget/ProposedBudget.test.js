import React from 'react';
import { renderWithConnection, screen, waitFor } from 'apd-testing-library';
import { APD_TYPE } from '@cms-eapd/common/utils';

import ProposedBudget from './ProposedBudget';

const hitechApd = {
  initialState: {
    budget: {
      combined: {
        2022: { federal: 4, state: 5, medicaid: 4000, total: 9 },
        2023: { federal: 40, state: 50, medicaid: 5000, total: 90 }
      },
      activities: [
        {
          fundingSource: 'HIT',
          name: 'Program Administration',
          statePersonnel: [
            {
              title: 'Project Assistant',
              description:
                'Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.',
              years: {
                2022: { amt: 86000, perc: 1 },
                2023: { amt: 88000, perc: 1 }
              }
            }
          ],
          expenses: [
            {
              description: 'Training and outreach',
              category: 'Training and outreach',
              years: { 2022: 40000, 2023: 40000 }
            },
            {
              description: 'Travel',
              category: 'Travel',
              years: { 2022: 35000, 2023: 35000 }
            },
            {
              description: 'Hardware, software, and licensing',
              category: 'Hardware, software, and licensing',
              years: { 2022: 700000, 2023: 0 }
            }
          ],
          contractorResources: [
            {
              description: 'Maintain SLR',
              end: '2022-05-31',
              hourly: {
                2022: { hours: '', rate: '' },
                2023: { hours: '', rate: '' }
              },
              useHourly: false,
              name: 'Super SLR Incorporated',
              start: '2022-01-01',
              totalCost: 32423,
              years: { 2022: 999756, 2023: 342444 }
            },
            {
              description: 'Technology consulting and planning services.',
              end: '2022-05-31',
              hourly: {
                2022: { hours: '', rate: '' },
                2023: { hours: '', rate: '' }
              },
              useHourly: false,
              name: 'Tech Consulting Inc.',
              start: '2022-01-01',
              totalCost: 473573,
              years: { 2022: 333000, 2023: 200000 }
            }
          ],
          costAllocation: {
            2022: { ffp: { federal: 90, state: 10 }, other: 105000 },
            2023: { ffp: { federal: 90, state: 10 }, other: 0 }
          },
          costAllocationNarrative: {
            years: {
              2022: {
                otherSources:
                  '<p>No other funding is provided for this activity for FFY 2022.</p>'
              },
              2023: {
                otherSources:
                  '<p>No other funding is provided for this activity for FFY 2023.</p>'
              }
            },
            methodology:
              '<p>No cost allocation is necessary for this activity.</p>'
          },
          quarterlyFFP: {
            2022: {
              1: { combined: 25, contractors: 25, inHouse: 25 },
              2: { combined: 25, contractors: 25, inHouse: 25 },
              3: { combined: 25, contractors: 25, inHouse: 25 },
              4: { combined: 25, contractors: 25, inHouse: 25 }
            },
            2023: {
              1: { combined: 25, contractors: 25, inHouse: 25 },
              2: { combined: 25, contractors: 25, inHouse: 25 },
              3: { combined: 25, contractors: 25, inHouse: 25 },
              4: { combined: 25, contractors: 25, inHouse: 25 }
            }
          }
        },
        {
          fundingSource: 'MMIS',
          name: 'Claims Data Analytics',
          statePersonnel: [
            {
              title: 'Project Assistant',
              description: 'Assist with stuff',
              years: {
                2022: { amt: 98000, perc: 1 },
                2023: { amt: 99000, perc: 1 }
              }
            }
          ],
          expenses: [
            {
              description: 'Travel',
              category: 'Travel',
              years: { 2022: 0, 2023: 0 }
            }
          ],
          contractorResources: [
            {
              description: 'Hosting and development support.',
              end: '2022-05-31',
              hourly: {
                2022: { hours: '', rate: '' },
                2023: { hours: '', rate: '' }
              },
              useHourly: false,
              name: 'Interface Vendor Inc.',
              start: '2022-01-01',
              totalCost: 26453574,
              years: { 2022: 650000, 2023: 750000 }
            },
            {
              description: 'Interface M&O contractor.',
              end: '2022-05-31',
              hourly: {
                2022: { hours: '100', rate: '50' },
                2023: { hours: '150', rate: '75' }
              },
              useHourly: true,
              name: 'TBD',
              start: '2022-01-01',
              totalCost: 16250,
              years: { 2022: 5000, 2023: 11250 }
            }
          ],
          costAllocation: {
            2022: { ffp: { federal: 90, state: 10 }, other: 0 },
            2023: { ffp: { federal: 75, state: 25 }, other: 0 }
          },
          costAllocationNarrative: {
            years: {
              2022: {
                otherSources:
                  '<p>No other funding is provided for this activity for FFY 2022.</p>'
              },
              2023: {
                otherSources:
                  '<p>No other funding is provided for this activity for FFY 2023.</p>\n'
              }
            },
            methodology:
              '<p>No cost allocation is necessary for this activity.</p>\n'
          },
          quarterlyFFP: {
            2022: {
              1: { combined: 25, contractors: 25, inHouse: 25 },
              2: { combined: 25, contractors: 25, inHouse: 25 },
              3: { combined: 25, contractors: 25, inHouse: 25 },
              4: { combined: 25, contractors: 25, inHouse: 25 }
            },
            2023: {
              1: { combined: 25, contractors: 25, inHouse: 25 },
              2: { combined: 25, contractors: 25, inHouse: 25 },
              3: { combined: 25, contractors: 25, inHouse: 25 },
              4: { combined: 25, contractors: 25, inHouse: 25 }
            }
          }
        }
      ],
      activityTotals: [
        {
          data: {
            otherFunding: {
              2022: {
                statePersonnel: 100,
                expenses: 200,
                contractors: 350,
                total: 650
              },
              2023: {
                statePersonnel: 400,
                expenses: 700,
                contractors: 150,
                total: 1250
              }
            }
          }
        },
        {
          data: {
            otherFunding: {
              2022: {
                statePersonnel: 200,
                expenses: 400,
                contractors: 150,
                total: 750
              },
              2023: {
                statePersonnel: 600,
                expenses: 1000,
                contractors: 250,
                total: 1850
              }
            }
          }
        }
      ]
    },
    apd: {
      data: {
        apdType: APD_TYPE.HITECH,
        years: ['2022', '2023'],
        keyStatePersonnel: {
          keyPersonnel: [
            {
              description: 'key person (APD Key Personnel)',
              totalCost: 1002,
              unitCost: null,
              units: '100% time'
            }
          ]
        },
        activities: [
          {
            fundingSource: 'HIT',
            name: 'Program Administration',
            statePersonnel: [
              {
                title: 'Project Assistant',
                description:
                  'Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.',
                years: {
                  2022: { amt: 86000, perc: 1 },
                  2023: { amt: 88000, perc: 1 }
                }
              }
            ],
            expenses: [
              {
                description: 'Training and outreach',
                category: 'Training and outreach',
                years: { 2022: 40000, 2023: 40000 }
              },
              {
                description: 'Travel',
                category: 'Travel',
                years: { 2022: 35000, 2023: 35000 }
              },
              {
                description: 'Hardware, software, and licensing',
                category: 'Hardware, software, and licensing',
                years: { 2022: 700000, 2023: 0 }
              }
            ],
            contractorResources: [
              {
                description: 'Maintain SLR',
                end: '2022-05-31',
                hourly: {
                  2022: { hours: '', rate: '' },
                  2023: { hours: '', rate: '' }
                },
                useHourly: false,
                name: 'Super SLR Incorporated',
                start: '2022-01-01',
                totalCost: 32423,
                years: { 2022: 999756, 2023: 342444 }
              },
              {
                description: 'Technology consulting and planning services.',
                end: '2022-05-31',
                hourly: {
                  2022: { hours: '', rate: '' },
                  2023: { hours: '', rate: '' }
                },
                useHourly: false,
                name: 'Tech Consulting Inc.',
                start: '2022-01-01',
                totalCost: 473573,
                years: { 2022: 333000, 2023: 200000 }
              }
            ],
            costAllocation: {
              2022: { ffp: { federal: 90, state: 10 }, other: 105000 },
              2023: { ffp: { federal: 90, state: 10 }, other: 0 }
            },
            costAllocationNarrative: {
              years: {
                2022: {
                  otherSources:
                    '<p>No other funding is provided for this activity for FFY 2022.</p>'
                },
                2023: {
                  otherSources:
                    '<p>No other funding is provided for this activity for FFY 2023.</p>'
                }
              },
              methodology:
                '<p>No cost allocation is necessary for this activity.</p>'
            },
            quarterlyFFP: {
              2022: {
                1: { combined: 25, contractors: 25, inHouse: 25 },
                2: { combined: 25, contractors: 25, inHouse: 25 },
                3: { combined: 25, contractors: 25, inHouse: 25 },
                4: { combined: 25, contractors: 25, inHouse: 25 }
              },
              2023: {
                1: { combined: 25, contractors: 25, inHouse: 25 },
                2: { combined: 25, contractors: 25, inHouse: 25 },
                3: { combined: 25, contractors: 25, inHouse: 25 },
                4: { combined: 25, contractors: 25, inHouse: 25 }
              }
            }
          },
          {
            fundingSource: 'MMIS',
            name: 'Claims Data Analytics',
            statePersonnel: [
              {
                title: 'Project Assistant',
                description: 'Assist with stuff',
                years: {
                  2022: { amt: 98000, perc: 1 },
                  2023: { amt: 99000, perc: 1 }
                }
              }
            ],
            expenses: [
              {
                description: 'Travel',
                category: 'Travel',
                years: { 2022: 0, 2023: 0 }
              }
            ],
            contractorResources: [
              {
                description: 'Hosting and development support.',
                end: '2022-05-31',
                hourly: {
                  2022: { hours: '', rate: '' },
                  2023: { hours: '', rate: '' }
                },
                useHourly: false,
                name: 'Interface Vendor Inc.',
                start: '2022-01-01',
                totalCost: 26453574,
                years: { 2022: 650000, 2023: 750000 }
              },
              {
                description: 'Interface M&O contractor.',
                end: '2022-05-31',
                hourly: {
                  2022: { hours: '100', rate: '50' },
                  2023: { hours: '150', rate: '75' }
                },
                useHourly: true,
                name: 'TBD',
                start: '2022-01-01',
                totalCost: 16250,
                years: { 2022: 5000, 2023: 11250 }
              }
            ],
            costAllocation: {
              2022: { ffp: { federal: 90, state: 10 }, other: 0 },
              2023: { ffp: { federal: 75, state: 25 }, other: 0 }
            },
            costAllocationNarrative: {
              years: {
                2022: {
                  otherSources:
                    '<p>No other funding is provided for this activity for FFY 2022.</p>'
                },
                2023: {
                  otherSources:
                    '<p>No other funding is provided for this activity for FFY 2023.</p>\n'
                }
              },
              methodology:
                '<p>No cost allocation is necessary for this activity.</p>\n'
            },
            quarterlyFFP: {
              2022: {
                1: { combined: 25, contractors: 25, inHouse: 25 },
                2: { combined: 25, contractors: 25, inHouse: 25 },
                3: { combined: 25, contractors: 25, inHouse: 25 },
                4: { combined: 25, contractors: 25, inHouse: 25 }
              },
              2023: {
                1: { combined: 25, contractors: 25, inHouse: 25 },
                2: { combined: 25, contractors: 25, inHouse: 25 },
                3: { combined: 25, contractors: 25, inHouse: 25 },
                4: { combined: 25, contractors: 25, inHouse: 25 }
              }
            }
          }
        ]
      }
    }
  }
};

const mmisApd = {
  initialState: {
    apd: {
      data: {
        apdType: APD_TYPE.MMIS
      }
    }
  }
};

const setup = (props = {}, options = {}) => {
  renderWithConnection(<ProposedBudget {...props} />, options);
};

describe('<ProposedBudget />', () => {
  it('render correctly hitech', async () => {
    setup({}, hitechApd);
  });

  // describe('render correctly mmis', () => {

  // })
});
