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
          activityOverview: {
            summary:
              '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
            description:
              '<p><strong><ins>III.A.1: Modifications to the State Level Repository</ins></strong></p>\n<p>Tycho Medicaid is seeking funding to design, develop, and implement modifications to the existing State Level Repository (SLR) for continued administration of the EHR Incentive Program. The modifications of the SLR for CMS program rule changes and guidance changes (Stage 3, IPPS, and OPPS) will require extensive development and implementation efforts and is essential to the effective administration of the Medicaid EHR Incentive Program. Modifications to the SLR are done in phases depending on how CMS rule changes occur. The implementation of the design elements will require provider onboarding activities to be initiated and completed including outreach and training for all program participants. The SLR will increase the efficiency with which Tycho Medicaid administers the program; allow for increased oversight and assure that the program is operated in accordance with the complex and evolving program rules and requirements.</p>\n<p>&nbsp;</p>\n<p>Additionally, Tycho Medicaid is seeking funding to complete a security risk assessment for the State Level Repository to ensure the SLR meets the required system security standards for HIPAA, MARSe, NIST and other state and federal security requirements for information technology.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.B.1 Administrative and Technical Support Consulting</ins></strong></p>\n<p>The DHSS is requesting funding to support activities under the Medicaid EHR Incentive Payment Program to provide technical assistance for statewide activities and implementations. Activities of this initiative will include support of the activities included in this IAPDU, SMPHU development, eCQM implementation, project management services, and assistance with the public health expansion modernization initiative.</p>',
            alternatives:
              '<p>Modifications to State Level Registry (SLR)</p>\n<ul>\n<li>Minimize Modifications</li>\n<li>Minimize cost</li>\n<li>Decreased implementation time.</li>\n</ul>\n<p>The 2015-2017 rule changes are significant and wide ranging; minimally accommodating the new attestations will be problematic for the remainder of the program. Program benefits will potentially not be maximized. To be prepared for Stage 3 and to properly implement all 2015-2017 rule changes; Tycho plans to implement all necessary modifications.</p>\n<ul>\n<li>Modifications to State Level Registry (SLR)</li>\n<li>Implement the changes as outlined</li>\n<li>The EHR Incentive Program will have the ability to be fully supported.</li>\n<li>Support of electronic submission of CQMs, enhancing the support of the emphasis on interoperability.</li>\n</ul>\n<p>There are no significant disadvantages to this option.</p>\n<p>&nbsp;</p>\n<p>Implementing the changes as outlined provide the optimal opportunity to maximize the benefits of the EHR program and its impact on the delivery of health care with improved quality and outcomes.</p>',
            standardsAndConditions: {
              doesNotSupport: '',
              supports:
                '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
            }
          },
          activitySchedule: {
            plannedStartDate: '2017-10-01',
            plannedEndDate: '2023-09-30'
          },
          milestones: [
            {
              endDate: '2020-09-07',
              milestone:
                'Implementation of Final Rule and Stage 3 System Developments'
            },
            {
              endDate: '2019-12-31',
              milestone: 'Environmental Scan Completion'
            },
            {
              endDate: '2022-05-30',
              milestone: 'HIT Roadmap Development'
            }
          ],
          outcomes: [
            {
              outcome:
                'Accept attestations for 2022, and modify SLR to meet new spec sheets released by CMS.',
              metrics: [
                { metric: 'Complete SLR modifications by 11/1/21' },
                { metric: 'Accept attestations through 4/30/22.' }
              ]
            },
            {
              outcome:
                'Provide support to EPs and EHs through attestation process.',
              metrics: [
                { metric: "Guidance available on Tycho''s websites" },
                { metric: 'Office hours availble for EPs and EHs' },
                { metric: 'Site visits, as needed, for EPs and EHs' }
              ]
            }
          ],
          statePersonnel: [
            {
              title: 'Project Assistant',
              description:
                'Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.',
              years: {
                2022: { amt: 86000, perc: 1 },
                2023: { amt: 88000, perc: 1 }
              }
            },
            {
              title:
                'EHR Incentive Program Meaningful Use Coordinator (Research Analyst III)',
              description:
                'Develop and monitor reports, assist data users in developing and managing queries.',
              years: {
                2022: { amt: 101115, perc: 1 },
                2023: { amt: 102111, perc: 1 }
              }
            },
            {
              title: 'IT Liaison',
              description:
                'Provide analysis and coordination activities between the HIT Program Office and the IT section, to ensure that adequate resources and priority are established to complete the technology projects as identified.',
              years: {
                2022: { amt: 101000, perc: 1 },
                2023: { amt: 104000, perc: 1 }
              }
            },
            {
              title: 'Accountant III',
              description:
                'Coordinate program state and federal budget and expense reporting, review and validate charges to CMS federal reports.',
              years: {
                2022: { amt: 101000, perc: 3 },
                2023: { amt: 109000, perc: 3 }
              }
            },
            {
              title: 'Public Information Officer',
              description:
                'Develop outreach materials including: written, television and radio publications to support outreach for the Medicaid EHR Incentive Program',
              years: {
                2022: { amt: 165000, perc: 0.5 },
                2023: { amt: 170000, perc: 0.5 }
              }
            },
            {
              title: 'Systems Chief',
              description:
                'Coordinate office resources, manage staff, budget, and resource assignments, and report program status.',
              years: {
                2022: { amt: 135000, perc: 0.5 },
                2023: { amt: 140000, perc: 0.5 }
              }
            },
            {
              title:
                'Medicaid EHR Incentive Program Manager (Medical Assistance Administrator III)',
              description:
                'Data collection and analysis, reporting, planning, service delivery modification, support administration of the EHR Incentive Payment Program including provider application review.',
              years: {
                2022: { amt: 110012, perc: 1 },
                2023: { amt: 111102, perc: 1 }
              }
            },
            {
              title: 'System Analyst (Analyst Programmer IV)',
              description:
                'Supports design, development and implementation of information technology infrastructure for the projects/programs under the IT Planning office supported by this Implementation Advanced Planning Document.',
              years: {
                2022: { amt: 98987, perc: 4 },
                2023: { amt: 99897, perc: 4 }
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
          activityOverview: {
            summary:
              'To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. ',
            description:
              "<p><strong><ins>III.B.3 Medicaid Claims Data Feed to the HIE</ins></strong></p>\n<p>Currently, Tycho does not have an All-Payers&rsquo; Claims database that can provide consumers and DHSS with consolidated claims data. To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. This initiative will require contractor assistance from Conduent, LLC to complete required MMIS changes as well as Tycho''s HIE Service provider, Orion Health to implement the necessary HIE updates. DHSS IT Planning Office will coordinate the efforts of the three vendors.</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>",
            alternatives:
              "<p>Medicaid Claims Data Feed to the HIE</p>\n<p>Periodic Uploads of Medicaid Claims Data from MMIS to the HIE</p>\n<p>The HIE could consume Medicaid claims data from periodic uploads of an extract/export from the MMIS</p>\n<p>Increase of administrative burden on development staff.</p>\n<p>Short term cost savings, with a higher long-term cost. No real-time data.</p>\n<p>The periodic MMIS uploads would not provide real time data. Therefore, Tycho plans to use a Medicaid claims data feed</p>\n<p>Medicaid Claims Data Feed to the HIE</p>\n<p>Create a Medicaid Claims Data Feed to the HIE</p>\n<p>Implementing a Medicaid Claims Data Feed to the HIE would provide information regarding Medicaid claims to participating providers, Hospitals, and patients</p>\n<p>Data regarding medications prescribed, tests performed, and the resulting diagnosis would improve care coordination</p>\n<p>There are no significant disadvantages to this option</p>\n<p>Implementing a Medicaid Claims data feed to the HIE provides updated claims data in real-time to improve care coordination and increase MU. Because data is updated in real-time, a data feed meets Tycho''s needs</p>",
            standardsAndConditions: {
              doesNotSupport: 'We will comply with standards and conditions',
              supports:
                '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
            }
          },
          activitySchedule: {
            plannedStartDate: '2019-10-01',
            plannedEndDate: '2022-09-30'
          },
          milestones: [
            {
              endDate: '2022-12-31',
              milestone: 'Implement MMIS-HIE Interface'
            },
            {
              endDate: '2022-12-31',
              milestone: 'Develop MMIS-HIE Interface Requirements'
            }
          ],
          outcomes: [
            {
              outcome:
                'Build interface between the MMIS Data Warehouse (DW) and the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE.',
              metrics: [
                {
                  metric:
                    'Hire contracted support to build an open API for the DW that the HIE and PHR can consume.'
                },
                { metric: 'Provide support for using open API for DW' }
              ]
            }
          ],
          statePersonnel: [
            {
              title: 'Project Assistant',
              description: 'Assist with stuff',
              years: {
                2022: { amt: 98000, perc: 1 },
                2023: { amt: 99000, perc: 1 }
              }
            },
            {
              title: 'MMIS Project Manager',
              description:
                'This position is responsible for the program development, planning, coordination, evaluation, independent management and oversight of the Tycho Automated Info',
              years: {
                2022: { amt: 140000, perc: 1 },
                2023: { amt: 144000, perc: 1 }
              }
            },
            {
              title: 'MMIS Trainer',
              description:
                'Under the direct supervision of the Project Manager, this position is responsible for the development of a comprehensive training and support program for the Tycho Automated Information Management System',
              years: {
                2022: { amt: 115000, perc: 1 },
                2023: { amt: 115000, perc: 1 }
              }
            },
            {
              title: 'Programmer IV',
              description:
                'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
              years: {
                2022: { amt: 140000, perc: 1 },
                2023: { amt: 145000, perc: 1 }
              }
            },
            {
              title: 'Security IT',
              description: 'Make sure its secure.',
              years: {
                2022: { amt: 115000, perc: 1 },
                2023: { amt: 120000, perc: 1 }
              }
            },
            {
              title: 'Operations Specialist',
              description: 'Run the day to day.',
              years: {
                2022: { amt: 125000, perc: 1 },
                2023: { amt: 130000, perc: 1 }
              }
            },
            {
              title: 'Programmer V',
              description:
                'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
              years: {
                2022: { amt: 150000, perc: 2 },
                2023: { amt: 155000, perc: 3 }
              }
            },
            {
              title: 'Programmer III',
              description:
                'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
              years: {
                2022: { amt: 120000, perc: 1 },
                2023: { amt: 125000, perc: 1 }
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
            activityOverview: {
              summary:
                '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
              description:
                '<p><strong><ins>III.A.1: Modifications to the State Level Repository</ins></strong></p>\n<p>Tycho Medicaid is seeking funding to design, develop, and implement modifications to the existing State Level Repository (SLR) for continued administration of the EHR Incentive Program. The modifications of the SLR for CMS program rule changes and guidance changes (Stage 3, IPPS, and OPPS) will require extensive development and implementation efforts and is essential to the effective administration of the Medicaid EHR Incentive Program. Modifications to the SLR are done in phases depending on how CMS rule changes occur. The implementation of the design elements will require provider onboarding activities to be initiated and completed including outreach and training for all program participants. The SLR will increase the efficiency with which Tycho Medicaid administers the program; allow for increased oversight and assure that the program is operated in accordance with the complex and evolving program rules and requirements.</p>\n<p>&nbsp;</p>\n<p>Additionally, Tycho Medicaid is seeking funding to complete a security risk assessment for the State Level Repository to ensure the SLR meets the required system security standards for HIPAA, MARSe, NIST and other state and federal security requirements for information technology.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.B.1 Administrative and Technical Support Consulting</ins></strong></p>\n<p>The DHSS is requesting funding to support activities under the Medicaid EHR Incentive Payment Program to provide technical assistance for statewide activities and implementations. Activities of this initiative will include support of the activities included in this IAPDU, SMPHU development, eCQM implementation, project management services, and assistance with the public health expansion modernization initiative.</p>',
              alternatives:
                '<p>Modifications to State Level Registry (SLR)</p>\n<ul>\n<li>Minimize Modifications</li>\n<li>Minimize cost</li>\n<li>Decreased implementation time.</li>\n</ul>\n<p>The 2015-2017 rule changes are significant and wide ranging; minimally accommodating the new attestations will be problematic for the remainder of the program. Program benefits will potentially not be maximized. To be prepared for Stage 3 and to properly implement all 2015-2017 rule changes; Tycho plans to implement all necessary modifications.</p>\n<ul>\n<li>Modifications to State Level Registry (SLR)</li>\n<li>Implement the changes as outlined</li>\n<li>The EHR Incentive Program will have the ability to be fully supported.</li>\n<li>Support of electronic submission of CQMs, enhancing the support of the emphasis on interoperability.</li>\n</ul>\n<p>There are no significant disadvantages to this option.</p>\n<p>&nbsp;</p>\n<p>Implementing the changes as outlined provide the optimal opportunity to maximize the benefits of the EHR program and its impact on the delivery of health care with improved quality and outcomes.</p>',
              standardsAndConditions: {
                doesNotSupport: '',
                supports:
                  '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
              }
            },
            activitySchedule: {
              plannedStartDate: '2017-10-01',
              plannedEndDate: '2023-09-30'
            },
            milestones: [
              {
                endDate: '2020-09-07',
                milestone:
                  'Implementation of Final Rule and Stage 3 System Developments'
              },
              {
                endDate: '2019-12-31',
                milestone: 'Environmental Scan Completion'
              },
              {
                endDate: '2022-05-30',
                milestone: 'HIT Roadmap Development'
              }
            ],
            outcomes: [
              {
                outcome:
                  'Accept attestations for 2022, and modify SLR to meet new spec sheets released by CMS.',
                metrics: [
                  { metric: 'Complete SLR modifications by 11/1/21' },
                  { metric: 'Accept attestations through 4/30/22.' }
                ]
              },
              {
                outcome:
                  'Provide support to EPs and EHs through attestation process.',
                metrics: [
                  { metric: "Guidance available on Tycho''s websites" },
                  { metric: 'Office hours availble for EPs and EHs' },
                  { metric: 'Site visits, as needed, for EPs and EHs' }
                ]
              }
            ],
            statePersonnel: [
              {
                title: 'Project Assistant',
                description:
                  'Coordination and document management support daily administrative support such as meeting minutes and scribe, manages project library, scheduling, and correspondence tracking.',
                years: {
                  2022: { amt: 86000, perc: 1 },
                  2023: { amt: 88000, perc: 1 }
                }
              },
              {
                title:
                  'EHR Incentive Program Meaningful Use Coordinator (Research Analyst III)',
                description:
                  'Develop and monitor reports, assist data users in developing and managing queries.',
                years: {
                  2022: { amt: 101115, perc: 1 },
                  2023: { amt: 102111, perc: 1 }
                }
              },
              {
                title: 'IT Liaison',
                description:
                  'Provide analysis and coordination activities between the HIT Program Office and the IT section, to ensure that adequate resources and priority are established to complete the technology projects as identified.',
                years: {
                  2022: { amt: 101000, perc: 1 },
                  2023: { amt: 104000, perc: 1 }
                }
              },
              {
                title: 'Accountant III',
                description:
                  'Coordinate program state and federal budget and expense reporting, review and validate charges to CMS federal reports.',
                years: {
                  2022: { amt: 101000, perc: 3 },
                  2023: { amt: 109000, perc: 3 }
                }
              },
              {
                title: 'Public Information Officer',
                description:
                  'Develop outreach materials including: written, television and radio publications to support outreach for the Medicaid EHR Incentive Program',
                years: {
                  2022: { amt: 165000, perc: 0.5 },
                  2023: { amt: 170000, perc: 0.5 }
                }
              },
              {
                title: 'Systems Chief',
                description:
                  'Coordinate office resources, manage staff, budget, and resource assignments, and report program status.',
                years: {
                  2022: { amt: 135000, perc: 0.5 },
                  2023: { amt: 140000, perc: 0.5 }
                }
              },
              {
                title:
                  'Medicaid EHR Incentive Program Manager (Medical Assistance Administrator III)',
                description:
                  'Data collection and analysis, reporting, planning, service delivery modification, support administration of the EHR Incentive Payment Program including provider application review.',
                years: {
                  2022: { amt: 110012, perc: 1 },
                  2023: { amt: 111102, perc: 1 }
                }
              },
              {
                title: 'System Analyst (Analyst Programmer IV)',
                description:
                  'Supports design, development and implementation of information technology infrastructure for the projects/programs under the IT Planning office supported by this Implementation Advanced Planning Document.',
                years: {
                  2022: { amt: 98987, perc: 4 },
                  2023: { amt: 99897, perc: 4 }
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
            activityOverview: {
              summary:
                'To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. ',
              description:
                "<p><strong><ins>III.B.3 Medicaid Claims Data Feed to the HIE</ins></strong></p>\n<p>Currently, Tycho does not have an All-Payers&rsquo; Claims database that can provide consumers and DHSS with consolidated claims data. To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. This initiative will require contractor assistance from Conduent, LLC to complete required MMIS changes as well as Tycho''s HIE Service provider, Orion Health to implement the necessary HIE updates. DHSS IT Planning Office will coordinate the efforts of the three vendors.</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>",
              alternatives:
                "<p>Medicaid Claims Data Feed to the HIE</p>\n<p>Periodic Uploads of Medicaid Claims Data from MMIS to the HIE</p>\n<p>The HIE could consume Medicaid claims data from periodic uploads of an extract/export from the MMIS</p>\n<p>Increase of administrative burden on development staff.</p>\n<p>Short term cost savings, with a higher long-term cost. No real-time data.</p>\n<p>The periodic MMIS uploads would not provide real time data. Therefore, Tycho plans to use a Medicaid claims data feed</p>\n<p>Medicaid Claims Data Feed to the HIE</p>\n<p>Create a Medicaid Claims Data Feed to the HIE</p>\n<p>Implementing a Medicaid Claims Data Feed to the HIE would provide information regarding Medicaid claims to participating providers, Hospitals, and patients</p>\n<p>Data regarding medications prescribed, tests performed, and the resulting diagnosis would improve care coordination</p>\n<p>There are no significant disadvantages to this option</p>\n<p>Implementing a Medicaid Claims data feed to the HIE provides updated claims data in real-time to improve care coordination and increase MU. Because data is updated in real-time, a data feed meets Tycho''s needs</p>",
              standardsAndConditions: {
                doesNotSupport: 'We will comply with standards and conditions',
                supports:
                  '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
              }
            },
            activitySchedule: {
              plannedStartDate: '2019-10-01',
              plannedEndDate: '2022-09-30'
            },
            milestones: [
              {
                endDate: '2022-12-31',
                milestone: 'Implement MMIS-HIE Interface'
              },
              {
                endDate: '2022-12-31',
                milestone: 'Develop MMIS-HIE Interface Requirements'
              }
            ],
            outcomes: [
              {
                outcome:
                  'Build interface between the MMIS Data Warehouse (DW) and the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE.',
                metrics: [
                  {
                    metric:
                      'Hire contracted support to build an open API for the DW that the HIE and PHR can consume.'
                  },
                  { metric: 'Provide support for using open API for DW' }
                ]
              }
            ],
            statePersonnel: [
              {
                title: 'Project Assistant',
                description: 'Assist with stuff',
                years: {
                  2022: { amt: 98000, perc: 1 },
                  2023: { amt: 99000, perc: 1 }
                }
              },
              {
                title: 'MMIS Project Manager',
                description:
                  'This position is responsible for the program development, planning, coordination, evaluation, independent management and oversight of the Tycho Automated Info',
                years: {
                  2022: { amt: 140000, perc: 1 },
                  2023: { amt: 144000, perc: 1 }
                }
              },
              {
                title: 'MMIS Trainer',
                description:
                  'Under the direct supervision of the Project Manager, this position is responsible for the development of a comprehensive training and support program for the Tycho Automated Information Management System',
                years: {
                  2022: { amt: 115000, perc: 1 },
                  2023: { amt: 115000, perc: 1 }
                }
              },
              {
                title: 'Programmer IV',
                description:
                  'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
                years: {
                  2022: { amt: 140000, perc: 1 },
                  2023: { amt: 145000, perc: 1 }
                }
              },
              {
                title: 'Security IT',
                description: 'Make sure its secure.',
                years: {
                  2022: { amt: 115000, perc: 1 },
                  2023: { amt: 120000, perc: 1 }
                }
              },
              {
                title: 'Operations Specialist',
                description: 'Run the day to day.',
                years: {
                  2022: { amt: 125000, perc: 1 },
                  2023: { amt: 130000, perc: 1 }
                }
              },
              {
                title: 'Programmer V',
                description:
                  'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
                years: {
                  2022: { amt: 150000, perc: 2 },
                  2023: { amt: 155000, perc: 3 }
                }
              },
              {
                title: 'Programmer III',
                description:
                  'The main purpose of this position is to develop and support Web and Client/Server applications. Duties include analysis, design, testing, debugging, documenting and supporting new and existing systems',
                years: {
                  2022: { amt: 120000, perc: 1 },
                  2023: { amt: 125000, perc: 1 }
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
