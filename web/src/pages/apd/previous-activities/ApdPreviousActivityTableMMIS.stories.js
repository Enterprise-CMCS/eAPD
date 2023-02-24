import React from 'react';
import ApdPreviousActivityTableMMIS from './ApdPreviousActivityTableMMIS';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

const exampleActivity = {
  activityId: '152a1e2b',
  name: 'Activity 1',
  milestones: [
    {
      endDate: '2020-09-07',
      milestone: 'Implementation of Final Rule and Stage 3 System Developments'
    },
    {
      endDate: '2019-12-31',
      milestone: 'Environmental Scan Completion'
    },
    {
      endDate: '2022-05-30',
      milestone: 'HIT Roadmap Development'
    }
  ]
};

export default {
  title: 'Pages/Apd/Tables/ApdPreviousActivityTableMMIS',
  component: ApdPreviousActivityTableMMIS,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['ApdPreviousActivityTableMMIS.test.js']
  },
  argTypes: {
    activities: exampleActivity
  }
};

const Template = args => <ApdPreviousActivityTableMMIS {...args} />;

export const ApdPreviousActivityTableMMISStory = Template.bind({});
ApdPreviousActivityTableMMISStory.decorators = [
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
            previousActivities: {
              previousActivitySummary:
                '<p><span style="font-size: 18px;"><strong><ins>EHR Incentive Payment Program</ins></strong></span></p>\n<p>As of May 31, 2018, the state has disbursed $22,145,454 to 1200Eligible Professionals (EPs) and $19,884,887 to 32 Eligible Hospitals (EHs) for Adopt/Implement/Upgrade (AIU) incentive payments and $25,454,444 for 1988 EP Meaningful Use (MU) Incentive payments and $19,444,444 for 98 EH MU Incentive payments. Tycho has anticipated payments for the remainder of FFY19 through FFY20 to be approximately $98,888,555.</p>\n<p>&nbsp;</p>\n<p>Tycho has updated the SMHP, and CMS has approved, to reflect the changes such as the auditing contract, the State&acirc;s audit strategy, and alignment with the Stage 3 Final Rule. This IAPDU #6 includes updated costs for existing project and EHR Incentive Payment Program administration, as well as several new initiatives. The SMHP will continue to be aligned with CMS rule changes and the IAPDU requests. All planning activities approved under the PAPD have been completed. Table 1 below identifies the approved amounts from the PAPD and the expenses available in the state&acirc;s accounting system. The PAPD previously approved was requested to be closed out to the HIT IAPD in March 2011; the remaining balance was carried over to the approved IAPD at that time to complete planning activities related to MU.</p>\n<p>&nbsp;</p>\n<p>IAPD Funding Milestones and Expenditures</p>\n<p>The first IAPDU which was approved by CMS in October 2012 requested funding for HIT initiatives. The primary focus of the activities in the IAPDU # 2, which was approved in April 2013 was support of MU Stage 1, preparation for MU Stage 2, and the ongoing administration of the EHR Incentive Payment program. Subsequent IAPD submissions requested continued funding to support program operations and modernization of enterprise systems.</p>\n<p>&nbsp;</p>\n<p>Tycho recently transitioned to a new state-wide financial system and it would be overly burdensome and a manual process to detail expenses out in the method done in previous HITECH IAPD submissions. Tycho has elected to report expenditures based on the CMS-64 line reporting for HITECH as this will be the most audible method due to the state&acirc;s transition to a new financial system.</p>\n<p>Detailed List of Expenditure Types:</p>\n<ul>\n<li>State personnel</li>\n<li>Travel and conferences: CMS Regional Meeting, attendance at local/Anchorage-based conferences to support EHR Incentive Program and Meaningful Use, and other HIT/HIE related conferences such as StateHealth IT Connect, IT Solutions Management (ISM) annual conference</li>\n<li>Contract payments for State Level Registry solution</li>\n<li>Contract payments for post-payment audits for the Medicaid EHR Incentive Program</li>\n<li>Contract payments for Technical Assistance for EHR Incentive Program and other HITECH activities identified in HITECH IAPD</li>\n<li>Contract payments for MITA 3.0 COTS solution as outlined in HITECH IAPD to support the development of a HITECH MITA 3.0 State Self-Assessment</li>\n<li>Administrative costs: copy paper, office supplies</li>\n</ul>',
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
            years: ['2023', '2024'],
            activities: [exampleActivity]
          }
        }
      },
      story
    })
];
