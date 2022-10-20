const apd = {
  name: 'HITECH IAPD',
  years: ['2022', '2023'],
  apdOverview: {
    programOverview:
      "<p>The Department is the state agency that administers the Tycho Medicaid program. The Information Technology (IT) Planning Office is responsible for Health Information Technology (HIT) efforts. Tycho Medicaid has elected to participate in the Electronic Health Record (EHR) Provider Incentive Payment Program funded through CMS. In accordance with Federal regulations, Tycho, requests enhanced Federal Financial Participation (FFP) from the CMS through this Implementation Advance Planning Document Update #9 (IAPDU#9). The State Medicaid Health Information Technology Plan (SMHP) was approved by CMS in March 2017, and is currently being updated for submission in June 2022.</p>\n<p>The original IAPD request supported the first phase of the Station''s participation in the development and expansion of the use of EHR and collaboration among state entities in a Health Information Exchange (HIE) network. In the first phase, Tycho implemented the system changes necessary to support the Tycho EHR Provider Incentive Payment Program as well as the administrative supports necessary for implementation and operation of this program.&nbsp;</p>\n<ol>\n<li>The first IAPDU requested additional support for the EHR Provider Incentive Payment Program and additional project support.</li>\n<li>The second IAPDU requested funding for the Division of Senior and Disabilities Services (DSDS) Automated Service Plan (ASP) system, supporting expanded use of EHRs.</li>\n<li>The third IAPDU requested additional and continued support of HIT initiatives.</li>\n</ol>\n<p>Effective with the approval of the original IAPD, Tycho closed the Planning Advance Planning Document (PAPD) submitted to CMS in December 2009 and opened the IAPD. This document represents the sixth update to the approved IAPD.</p>\n<p>This funding request time frame is for the period of October 1, 2018 to September 30, 2023.&nbsp;</p>",
    narrativeHIT:
      '<p><span style="font-size: 18px;"><strong><ins>Continued Operations of the Medicaid EHR Incentive Payment Program</ins></strong></span></p>\n<p><span style="font-size: 18px;">Participate in the CMS EHR incentive program and continue to administer payments to EPs and EHs through the remaining years of the program (2023).</span></p>',
    narrativeHIE:
      "<p>Tycho''s existing health information infrastructure consists of various organizations operating at the enterprise, local, regional and state levels, and includes:</p>\n<ul>\n<li>Health systems, affiliated providers, and ancillary services;</li>\n<li>State agencies health data repositories;</li>\n<li>Specialized participants that operate for specific purposes including, but not limited to, laboratory services, radiology, public health, research and quality assessment;</li>\n<li>Information and service providers that operate in vertical markets such as e-Prescribing, State registries, Medicaid and Medicare;</li>\n<li>Private payers and clearinghouses that transmit administrative data for claims purposes and for pay for performance programs.</li>\n</ul>\n<p>The Tycho HIE has planned to implement a robust public health modernization plan which includes the development of specialized registries and interfaces to the HIE to significantly increase the ability for EPs and EHs to achieve meaningful use. Additionally, plans to collect CQM data and the creation of a Personal Health Record (PHR) has been identified as activities to complete.</p>\n<p></p>\n<p>Payers/Providers must complete a participation agreement form and possible addendum to participate in the HIE and other services. Governance for the HIE has been defined by the State statute, any related regulations and by the HIE board of directors.</p>\n<p></p>\n<p>Appropriate cost allocation is a fundamental principle of the federal FFP program to ensure that private sector beneficiaries of public investments are covering the incremental cost of their use. A sustainability plan for proportional investments by other payers/providers than Medicaid was developed in concert with the Tycho HIE Board of Directors and a broad cross-section of stakeholders under the leadership of the Tycho HIE Executive Director and State HIT Coordinator. The Tycho HIEâs fee structure and detailed participation agreements can be viewed at: tychoMedicaid.com</p>",
    narrativeMMIS:
      "<p><strong><ins>Medicaid Claims Data Feed to the HIE</ins></strong></p>\n<p>Currently, Tycho does not have an All-Payersâ Claims database that can provide consumers and DHSS with consolidated claims data. To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. This initiative will require contractor assistance from Conduent, LLC to complete required MMIS changes as well as Tycho''s HIE Service provider, Orion Health to implement the necessary HIE updates. DHSS IT Planning Office will coordinate the efforts of the three vendors.</p>"
  },
  keyStatePersonnel: {
    medicaidDirector: {
      name: 'Cornelius Fudge',
      email: 'c.fudge@ministry.magic',
      phone: '5551234567'
    },
    medicaidOffice: {
      address1: '100 Round Sq',
      address2: '',
      city: 'Cityville',
      state: 'AK',
      zip: '12345'
    },
    keyPersonnel: [
      {
        name: 'James Holden',
        position: 'HIT Coordinator',
        email: 'JimPushesButtons@tycho.com',
        isPrimary: true,
        fte: { 2022: 1, 2023: 1 },
        hasCosts: true,
        costs: { 2022: 100000, 2023: 100000 }
      },
      {
        name: 'Fred Johnson',
        position: 'Project Management Office Director',
        email: 'FJohnson@tycho.com',
        isPrimary: false,
        fte: { 2022: 0.3, 2023: 0.3 },
        hasCosts: false,
        costs: { 2022: 0, 2023: 0 }
      }
    ]
  },
  previousActivities: {
    previousActivitySummary:
      '<p><span style="font-size: 18px;"><strong><ins>EHR Incentive Payment Program</ins></strong></span></p>\n<p>As of May 31, 2018, the state has disbursed $22,145,454 to 1200Eligible Professionals (EPs) and $19,884,887 to 32 Eligible Hospitals (EHs) for Adopt/Implement/Upgrade (AIU) incentive payments and $25,454,444 for 1988 EP Meaningful Use (MU) Incentive payments and $19,444,444 for 98 EH MU Incentive payments. Tycho has anticipated payments for the remainder of FFY19 through FFY20 to be approximately $98,888,555.</p>\n<p></p>\n<p>Tycho has updated the SMHP, and CMS has approved, to reflect the changes such as the auditing contract, the Stateâs audit strategy, and alignment with the Stage 3 Final Rule. This IAPDU #6 includes updated costs for existing project and EHR Incentive Payment Program administration, as well as several new initiatives. The SMHP will continue to be aligned with CMS rule changes and the IAPDU requests. All planning activities approved under the PAPD have been completed. Table 1 below identifies the approved amounts from the PAPD and the expenses available in the stateâs accounting system. The PAPD previously approved was requested to be closed out to the HIT IAPD in March 2011; the remaining balance was carried over to the approved IAPD at that time to complete planning activities related to MU.</p>\n<p></p>\n<p>IAPD Funding Milestones and Expenditures</p>\n<p>The first IAPDU which was approved by CMS in October 2012 requested funding for HIT initiatives. The primary focus of the activities in the IAPDU # 2, which was approved in April 2013 was support of MU Stage 1, preparation for MU Stage 2, and the ongoing administration of the EHR Incentive Payment program. Subsequent IAPD submissions requested continued funding to support program operations and modernization of enterprise systems.</p>\n<p></p>\n<p>Tycho recently transitioned to a new state-wide financial system and it would be overly burdensome and a manual process to detail expenses out in the method done in previous HITECH IAPD submissions. Tycho has elected to report expenditures based on the CMS-64 line reporting for HITECH as this will be the most audible method due to the stateâs transition to a new financial system.</p>\n<p>Detailed List of Expenditure Types:</p>\n<ul>\n<li>State personnel</li>\n<li>Travel and conferences: CMS Regional Meeting, attendance at local/Anchorage-based conferences to support EHR Incentive Program and Meaningful Use, and other HIT/HIE related conferences such as StateHealth IT Connect, IT Solutions Management (ISM) annual conference</li>\n<li>Contract payments for State Level Registry solution</li>\n<li>Contract payments for post-payment audits for the Medicaid EHR Incentive Program</li>\n<li>Contract payments for Technical Assistance for EHR Incentive Program and other HITECH activities identified in HITECH IAPD</li>\n<li>Contract payments for MITA 3.0 COTS solution as outlined in HITECH IAPD to support the development of a HITECH MITA 3.0 State Self-Assessment</li>\n<li>Administrative costs: copy paper, office supplies</li>\n</ul>',
    actualExpenditures: {
      2019: {
        hithie: { federalActual: 140000, totalApproved: 280000 },
        mmis: {
          50: { federalActual: 23445, totalApproved: 82545 },
          75: { federalActual: 23440, totalApproved: 75340 },
          90: { federalActual: 235720, totalApproved: 262460 }
        }
      },
      2020: {
        hithie: { federalActual: 146346, totalApproved: 234526 },
        mmis: {
          50: { federalActual: 129387, totalApproved: 375445 },
          75: { federalActual: 413246, totalApproved: 654455 },
          90: { federalActual: 614544, totalApproved: 863455 }
        }
      },
      2021: {
        hithie: { federalActual: 320000, totalApproved: 540000 },
        mmis: {
          50: { federalActual: 0, totalApproved: 0 },
          75: { federalActual: 0, totalApproved: 0 },
          90: { federalActual: 0, totalApproved: 0 }
        }
      }
    }
  },
  activities: [
    {
      alternatives:
        '<p>Modifications to State Level Registry (SLR)</p>\n<ul>\n<li>Minimize Modifications</li>\n<li>Minimize cost</li>\n<li>Decreased implementation time.</li>\n</ul>\n<p>The 2015-2017 rule changes are significant and wide ranging; minimally accommodating the new attestations will be problematic for the remainder of the program. Program benefits will potentially not be maximized. To be prepared for Stage 3 and to properly implement all 2015-2017 rule changes; Tycho plans to implement all necessary modifications.</p>\n<ul>\n<li>Modifications to State Level Registry (SLR)</li>\n<li>Implement the changes as outlined</li>\n<li>The EHR Incentive Program will have the ability to be fully supported.</li>\n<li>Support of electronic submission of CQMs, enhancing the support of the emphasis on interoperability.</li>\n</ul>\n<p>There are no significant disadvantages to this option.</p>\n<p>&nbsp;</p>\n<p>Implementing the changes as outlined provide the optimal opportunity to maximize the benefits of the EHR program and its impact on the delivery of health care with improved quality and outcomes.</p>',
      contractorResources: [
        {
          description: 'Maintain SLR',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'Super SLR Incorporated',
          start: '',
          totalCost: 32423,
          years: { 2022: 999756, 2023: 342444 }
        },
        {
          description: 'Technology consulting and planning services.',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'Tech Consulting Inc.',
          start: '',
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
        methodology: '<p>No cost allocation is necessary for this activity.</p>'
      },
      description:
        '<p><strong><ins>III.A.1: Modifications to the State Level Repository</ins></strong></p>\n<p>Tycho Medicaid is seeking funding to design, develop, and implement modifications to the existing State Level Repository (SLR) for continued administration of the EHR Incentive Program. The modifications of the SLR for CMS program rule changes and guidance changes (Stage 3, IPPS, and OPPS) will require extensive development and implementation efforts and is essential to the effective administration of the Medicaid EHR Incentive Program. Modifications to the SLR are done in phases depending on how CMS rule changes occur. The implementation of the design elements will require provider onboarding activities to be initiated and completed including outreach and training for all program participants. The SLR will increase the efficiency with which Tycho Medicaid administers the program; allow for increased oversight and assure that the program is operated in accordance with the complex and evolving program rules and requirements.</p>\n<p>&nbsp;</p>\n<p>Additionally, Tycho Medicaid is seeking funding to complete a security risk assessment for the State Level Repository to ensure the SLR meets the required system security standards for HIPAA, MARSe, NIST and other state and federal security requirements for information technology.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.B.1 Administrative and Technical Support Consulting</ins></strong></p>\n<p>The DHSS is requesting funding to support activities under the Medicaid EHR Incentive Payment Program to provide technical assistance for statewide activities and implementations. Activities of this initiative will include support of the activities included in this IAPDU, SMPHU development, eCQM implementation, project management services, and assistance with the public health expansion modernization initiative.</p>',
      expenses: [
        {
          description: '',
          category: 'Training and outreach',
          years: { 2022: 40000, 2023: 40000 }
        },
        {
          description: '',
          category: 'Travel',
          years: { 2022: 35000, 2023: 35000 }
        },
        {
          description: '',
          category: 'Hardware, software, and licensing',
          years: { 2022: 700000, 2023: 0 }
        }
      ],
      fundingSource: 'HIT',
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
      name: 'Program Administration',
      plannedEndDate: '2023-09-30',
      plannedStartDate: '2017-10-01',
      schedule: [
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
      standardsAndConditions: {
        doesNotSupport: '',
        supports:
          '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
      },
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
      summary:
        '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
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
      alternatives:
        "<p>Medicaid Claims Data Feed to the HIE</p>\n<p>Periodic Uploads of Medicaid Claims Data from MMIS to the HIE</p>\n<p>The HIE could consume Medicaid claims data from periodic uploads of an extract/export from the MMIS</p>\n<p>Increase of administrative burden on development staff.</p>\n<p>Short term cost savings, with a higher long-term cost. No real-time data.</p>\n<p>The periodic MMIS uploads would not provide real time data. Therefore, Tycho plans to use a Medicaid claims data feed</p>\n<p>Medicaid Claims Data Feed to the HIE</p>\n<p>Create a Medicaid Claims Data Feed to the HIE</p>\n<p>Implementing a Medicaid Claims Data Feed to the HIE would provide information regarding Medicaid claims to participating providers, Hospitals, and patients</p>\n<p>Data regarding medications prescribed, tests performed, and the resulting diagnosis would improve care coordination</p>\n<p>There are no significant disadvantages to this option</p>\n<p>Implementing a Medicaid Claims data feed to the HIE provides updated claims data in real-time to improve care coordination and increase MU. Because data is updated in real-time, a data feed meets Tycho''s needs</p>",
      contractorResources: [
        {
          description: 'Hosting and development support.',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'Interface Vendor Inc.',
          start: '',
          totalCost: 26453574,
          years: { 2022: 650000, 2023: 750000 }
        },
        {
          description: 'Interface M&O contractor.',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'TBD',
          start: '',
          totalCost: 7398,
          years: { 2022: 0, 2023: 1000000 }
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
      description:
        "<p><strong><ins>III.B.3 Medicaid Claims Data Feed to the HIE</ins></strong></p>\n<p>Currently, Tycho does not have an All-Payers&rsquo; Claims database that can provide consumers and DHSS with consolidated claims data. To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. This initiative will require contractor assistance from Conduent, LLC to complete required MMIS changes as well as Tycho''s HIE Service provider, Orion Health to implement the necessary HIE updates. DHSS IT Planning Office will coordinate the efforts of the three vendors.</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>",
      expenses: [
        {
          description: '',
          category: 'Travel',
          years: { 2022: 0, 2023: 0 }
        }
      ],
      fundingSource: 'MMIS',
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
      name: 'Claims Data Analytics',
      plannedEndDate: '2022-09-30',
      plannedStartDate: '2019-10-01',
      schedule: [
        {
          endDate: '2022-12-31',
          milestone: 'Implement MMIS-HIE Interface'
        },
        {
          endDate: '2022-12-31',
          milestone: 'Develop MMIS-HIE Interface Requirements'
        }
      ],
      standardsAndConditions: {
        doesNotSupport: 'We will comply with standards and conditions',
        supports:
          '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
      },
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
      summary:
        'To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. ',
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
      alternatives:
        '<p>Health Information Exchange</p>\n<p>Maintain existing system.</p>\n<p>The existing system has a few benefits. The current EDI process while dated still forms the backbone of the Division&rsquo;s data sharing needs. The technology works in the fashion that it always has.</p>\n<p>The drawbacks of this approach are significant. While the current Edi process affords behavioral health agencies to submit their data to the state, it does not allow for sharing the same data to other providers in either the primary care or behavioral health treatment contexts.</p>\n<p>There are more disadvantages than advantages in pursuing this approach. The drawbacks are substantial, such as absence of data normalization, difficulties with aligning the user interface and application design with industry best practices, inconsistencies in design, and difficulties with support and maintenance, making this approach less favorable than the other two alternatives considered.</p>\n<p>Health Information Exchange</p>\n<p>Update and Enhance Existing System(s), connecting AKAIMS to the Health Information Exchange</p>\n<p>Connecting AKAIMS to the Health Information Exchange will provide for the sending and receiving of data across healthcare disciplines. This data sharing is thought to enhance and provide for better care outcomes for patients who are participating in care across multiple providers. This solution future proofs AKAIMS as it will integrate current technologies and leverages those technologies for a more feature rich process.</p>\n<p>Training and integration of this updated technology will require some effort and outreach. Newly on-boarded agencies will need to adjust to new data collection protocols.</p>\n<p>Full participation in the Health Information Exchange will reduce double data entry at all levels (reducing costs). It is anticipated that efficiencies gained with simplification of data collection and reporting will greatly enhance patient care outcomes.</p>\n<p>HIE Platform</p>\n<p>Upgrade HIE to the Audacious Inquiry (Ai) platform</p>\n<p>Ai offers a strong foundation on which additional functionality can be built. Transitioning to the Ai platform has the potential to minimize the effort required to modernize the HIE, while delivering additional services to users.</p>\n<p>Transitioning to Ai means that the State will be leaving the current HIE platform. There is potential risk in adoption and migration of services and data.</p>\n<p>The HIE platform will be transitioned to Ai to offer additional services, contain costs on enhancements, and maximize the scalability and flexibility of the HIE to support modernization across the enterprise.</p>\n<p>HIE Platform</p>\n<p>Keep platform as it is without upgrade.</p>\n<p>Keeping the platform as it is without upgrade would allow focus to remain on onboarding.</p>\n<p>Functionality supported by existing HIE is not adequate to support future applications. The value delivered by the service as it is could be improved with additional functionality. Potential to ingest different critical types of data is limited without a platform upgrade.</p>\n<p>Alternative solutions will leverage existing infrastructure where applicable; will not increase annual maintenance fees, and will follow DHSS purchasing policy.</p>\n<p>&nbsp;</p>\n<p>HIE Platform</p>\n<p>Partner with another state HIE for services ranging from sharing the platform itself, to specific services or commonly-developed interfaces.</p>\n<p>Sharing with another state offers the potential to</p>\n<p>&bull; decrease costs</p>\n<p>&bull; Increase speed of onboarding</p>\n<p>&bull; Increase functionality</p>\n<p>&bull; Provide for greater sustainability</p>\n<p>&bull; Address the needs of our partners faster or better</p>\n<p>No states currently share HIE services entirely, due to perceived legal constraints; this option presents multiple factors to consider ranging from legal to technical. Potential for cost savings is limited because pricing models are usually based on volume. There is a possibility for significant disruption to service during a transition of this type; significant issues with legal arrangements complying with other states.</p>\n<p>Alternative solutions will leverage existing infrastructure where applicable; will not increase annual maintenance fees, and will follow DHSS purchasing policy.</p>\n<p>HIE Tools for Care Coordination</p>\n<p>Add functional tools to support care coordination, referrals and analytics through other module developers or collaborators</p>\n<p>Sharing with another state or regional HIE to develop or utilize HIE tools offers the potential to</p>\n<p>&bull; decrease costs</p>\n<p>&bull; Increase speed of onboarding</p>\n<p>&bull; Increase functionality</p>\n<p>&bull; Provide for greater sustainability</p>\n<p>&bull; Address the needs of our partners faster or better</p>\n<p>If another commercial developer is selected to offer these modules, there is some likelihood that integrating into the HIE platform will be more difficult without the transition to Ai.</p>\n<p>Alternative solutions will leverage existing infrastructure where applicable; will not increase annual maintenance fees, and will follow DHSS purchasing policy.</p>\n<p>HIE Functionality</p>\n<p>Enhancing functionality for participating hospitals</p>\n<p>Hospitals are critical stakeholders in the HIE. Providing functionality to assist hospitals in meeting MU3 and in evaluating ER patients are two areas where HIE could provide valuable information.</p>\n<p>Hospital focus is based on patient safety. Thus far, there has been little incentive for using HIE data for patient safety.</p>\n<p>DHSS is actively pursuing additional functionality for hospitals. This involves hospital stakeholder meetings, vendor discussions, board review and clinical workgroup input.</p>\n<p>&nbsp;</p>\n<p>HIE Functionality</p>\n<p>Implement connections with high-value state and federal data sources (Corrections, DJJ, SSA, DoD)</p>\n<p>Including health data from correctional facilities (ADT, ORU and/or CCD files) will help provide better more coordinated care for this vulnerable population, many of whom are also Medicaid-eligible.</p>\n<p>Aside from the need to allocate staff time across projects, there are no significant drawbacks to this option.</p>\n<p>This project should proceed.</p>\n<p>HIE Functionality</p>\n<p>Keep health information exchange functionality substantially the same regarding state and federal data source connections</p>\n<p>Less work for the HIE team, DHSS and other teams to accomplish, allowing for greater focus on onboarding providers and implementing new technology modules.</p>\n<p>Leaving the information gap among these agencies open will lead to continued delays in needed services.</p>\n<p>This option is not preferred.</p>\n<p>HIE Functionality</p>\n<p>Keep health information exchange functionality substantially the same regarding emergency department information exchange</p>\n<p>Giving providers better tools to coordinate care for high-risk, high-utilizer members of the population has the potential to substantially reduce spending and improve outcomes for this vulnerable population.</p>\n<p>Aside from the need to allocate staff time across projects, there are no significant drawbacks to this option.</p>\n<p>This project should proceed.</p>\n<p>HIE Functionality</p>\n<p>Keep health information exchange functionality substantially the same regarding prescription information</p>\n<p>Less work for the HIE, DHSS and other teams to accomplish, allowing for greater focus on onboarding providers and implementing new technology modules</p>\n<p>A continuing information gap around prescriptions filled will limit the potential to improve care coordination for Tycho citizens and heighten patient safety.</p>\n<p>This project should proceed.</p>\n<p>HIE Functionality</p>\n<p>Keep health information exchange functionality substantially the same regarding image exchange</p>\n<p>Less work for the HIE, DHSS and other teams to accomplish, allowing for greater focus on onboarding providers and implementing new technology modules</p>\n<p>The lack of simple diagnostic image exchange presents a significant barrier to widespread health information exchange. Without these technologies, patients often hand-carry their films or electronic files with them, which can present a high risk of lost images and inefficiency.</p>\n<p>This option is not preferred at this time.</p>',
      contractorResources: [
        {
          description: 'Creates materials for training ',
          end: '2022-05-31',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'Sample Training Contractor Name',
          start: '2022-01-01',
          totalCost: 20000,
          years: { 2022: 0, 2023: 0 }
        }
      ],
      costAllocation: {
        2022: { ffp: { federal: 90, state: 10 }, other: 0 },
        2023: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      costAllocationNarrative: {
        years: {
          2022: { otherSources: '' },
          2023: { otherSources: '' }
        },
        methodology: ''
      },
      description:
        "<p>&nbsp;</p>\n<p><img style=\"float: none; height: auto; width: auto;\" src=\"/api/apds/1/files/622a24569b39c8f67d684882c8abe55dbebf98d0a9813df3aa8f07a509c10f29\" alt=\"undefined\" /></p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.D. Statewide HIE Enhancement, Onboarding, and Support of Statewide HIE Operational Strategic Plan</ins></strong></p>\n<p>DHSS is requesting funding to support the continued enhancement and provider onboarding activities to the statewide HIE. The success of the statewide HIE is critical for improving data exchange, coordination of care, and modernizing healthcare across Tycho. The following funding requests are for projects that will provide enhanced technical capabilities to providers, support providers in onboarding, support modernizations required for Medicaid redesign, and ensure sustainability beyond State of Tycho and CMS funding. The projects have been designed to meet the following goals and desires for the statewide HIE:</p>\n<ul>\n<li>&bull; Support the HIE&rsquo;s operational needs, including staffing, contract resources, administrative expenses, and technology expenses to support operations and ongoing maintenance of the HIE</li>\n<li>&bull; Provide technical assistance to support HIE onboarding and implementation within provider organizations who are meaningful use-eligible and who refer directly with tribal organizations</li>\n<li>&bull; Develop tools and HIE interfaces that support enhanced care coordination services, and increase HIE value to ensure sustainability beyond current funding streams</li>\n<li>All initiatives described below are funded at 90/10 funds and do not require cost allocation. All projects below support the onboarding and connection for Medicaid providers, EPs, EHs, and additional providers supported by SMD #16-003. Section VII. Cost Allocation Plan and Appendix D of this IAPD further describes the cost allocation methodology.</li>\n</ul>\n<p><strong><ins>III.D.1 Behavioral Health Onboarding &amp; Care Coordination</ins></strong></p>\n<p>The Department recognizes the need to increase Behavioral Health (BH) data capacity and sharing to achieve its goals and outcomes related to care coordination. This includes promoting effective communication to coordinate care and enhancing the ability for providers to share and gain access to Protected Class Patient Data where appropriate. To support the capacity of data sharing and improving coordination of care, funding is requested to support Behavioral Health provider connectivity through the onboarding program by the development and implementation of a Behavioral Health-centric Unified Landing Page Application. The Behavioral Health Unified Landing Page Application will improve the quality and completeness of behavioral health data and thus, support the ability for providers to achieve MU.</p>\n<p>&nbsp;</p>\n<p>In addition to the Unified Landing Page, funding is requested to support behavioral health provider onboarding to the HIE. The HIE onboarding program will provide funds to offset expenses required for behavioral health providers to adequately participate in statewide health information exchange. The onboarding program will support Tycho''s HIE vision of increasing onboarding Medicaid providers and care coordination to help Tycho providers demonstrate MU. This program relates to the guidance provided by CMS in the SMD 16-003 letter dated February 2016 and will assist with covering costs associated with connectivity including but not limited to the following activities:</p>\n<ul>\n<li>&bull; Legal activities including establishment of user agreements</li>\n<li>&bull; Configuration and technical development activities</li>\n<li>&bull; Testing of connection</li>\n<li>&bull; Workflow integration</li>\n<li>&bull; Implementation support and user training</li>\n<li>&bull; Post production support</li>\n</ul>\n<p>The goal is for the onboarding program to support 40 provider organizations across the State. The initial phase of the program will be focused on Medicaid behavioral health providers with additional provider types potentially targeted in later phases of the initiative. Administrative offset funding will be on-time funding only and will be issued as pass-through funding through healtheConnect (Tycho''s HIE organization). The funding will be distributed in 2 parts: 75% upon onboarding initialization (participation/contract signed) and the remaining 25% upon the HIE connection being live or in production.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.D.2 HIE Strategic Planning</ins></strong></p>\n<p>Having a robust HIE is a critical component of Tycho''s HIT landscape and will continue to play a role in enhancing Tycho''s EPs and EHs ability to achieve MU. As part of the Department&rsquo;s responsibility for administration of the EHR Incentive Program and in an effort to enhance the maturity of HIE in Tycho, the Department is requesting funds to support a health information exchange assessment using CMS&rsquo; standards of the HIE Maturity Model and MITA and a Strategic Plan to enhance platform functionality and initial steps necessary to establish a long-term vision of HIE in Tycho''s HIT landscape. This work will further ensure that the Department&rsquo;s goals and target state (To-Be vision) aligns with CMS guidelines as specified under 42 CFR 495.338, as well as the HIE Maturity Model, MITA and the Seven Standards and Conditions.</p>\n<p>&nbsp;</p>\n<p>The Department is requesting funds to support the statewide HIE in conducting an HIE Assessment using the CMS HIE Maturity Model and MITA standards. The information gathered in the assessment will help clearly articulate the long-term HIE vision for Tycho, define a governance model, and establish a robust sustainability plan built on the framework of the HIE Maturity Model and MITA standards. This information will also be used to identify areas where the statewide HIE can provide services and make connections with the Medicaid enterprise of systems to support health information exchange requirements and sustainability of the HIE.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.D.3 Integration of Social Determinants of Health</ins></strong></p>\n<p>To further drive Tycho''s goals around improved health outcomes through HIE, the Department is seeking funds to support the integration of the Social Determinants of Health into the statewide HIE system which will improve coordination of care and information exchange across the state.</p>\n<p>&nbsp;</p>\n<p>This is an important and practical step to help the healthcare delivery system build effective, coordinated, data-driven healthcare services into communities hit hardest by social structures and economic systems. The integration of social determinants of health data will provide support for addressing social determinants of health drivers in Tycho and will identify ways to improve intervention using Social Determinants of Health as part of a comprehensive coordinated care model impacting payment, incentivizing purposeful intervention in the specific needs of their patients and populations to improve health outcomes.</p>\n<p>&nbsp;</p>\n<p>To complete the scope of work, the HIE will integrate a limited CDR and interface to the network as well as provide onboarding services to connect Medicaid providers. The integration of the Social Determinates of Health project will support Medicaid providers ability to achieve meaningful use by allowing providers to incorporate summary of care information from other providers into their EHR using the functions of CEHRT through the HIE.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.D.4 Staff Augmentation for Adoption and Utilization</ins></strong></p>\n<p>DHSS seeks to support onboarding efforts to connect Medicaid Meaningful Use eligible providers and providers supporting eligible providers to the HIE. The provider onboarding program will fund staffing outreach/educational support and technical services to Medicaid EPs that have adopted EHRs but not made HIE use part of day to day operations, not made use of new HIE capabilities, not yet connected, or were unable to take advantage of the ONC Regional Extension Center (REC) services because they were not eligible.</p>\n<p>Onboarding will include efforts to provide outreach/educational support and technical services. The Provider Onboarding Program includes the following outcomes:</p>\n<ul>\n<li>Provide staff for outreach, education, training, and organization change management to targeted provider groups to assist with interfacing and connecting to the HIE to support ongoing utilization of the HIE services</li>\n<li>Meet milestones established by the HIE and the Department for provider connectivity to the HIE</li>\n<li>Cover the onboarding costs (personnel and technical) for connecting Medicaid providers and hospitals to the statewide HIE and integrating HIE use into the provider workflow</li>\n</ul>\n<p>The funds requested in this IAPD-U will be used to establish provider groups for onboarding support, establish onboarding benchmarks, and specifically implement training and technical assistance services. Funds will be used to assess barriers to onboarding and adoption of the HIE services, strategies for work flow analysis, and other ways to reduce Medicaid provider burden to onboard to the HIE. The proposed solution shall provide support services that coordinate with HIE processes to onboard and improve participant interoperability (e.g., clinic readiness assessments, bi-directional connection builds development and deployment of bi-directional interface with Medicaid) through utilization of the HIE system.</p>\n<p>&nbsp;</p>\n<p>The adoption and utilization program will continue to expand outreach efforts and technical services to Medicaid providers and continue to boost MU numbers and milestones in Tycho to enhance the HIT vision outlined in the SMHP. In addition to AIU and MU education and technical services, the program will also seek to assist providers in meeting MU Stages 2 and 3 through onboarding provider interfaces and providing the capabilities to automatically meet several MU measures through the enhanced functionality of the HIE.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.D.5 Trauma Registry</ins></strong></p>\n<p>DHSS recognizes the need for a trauma registry as an essential component of information exchange. The trauma registry is necessary to drive an efficient and effective performance improvement program for the care of injured enrollees. Furthermore, as published recently by SAMHSA, there are a range of evidence-based treatments that are effective in helping children and youth who have experienced trauma. Through the HIE, health providers will share and gain access to trauma information to drive an efficient and effective performance improvement program for the care of injured enrollees. The trauma register information will interoperate with the Behavioral Health Unified Landing Page Application to promote evidence-based treatments that are effective in helping enrollees who have experienced trauma. The trauma registry will be recognized as a specialized registry by the State to support MU and data exchange.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.D.6 Air Medical Resource Location</ins></strong></p>\n<p>Tycho is currently struggling with tracking and maintaining the location and availability of air medical resources within the state. This information is critical to the timely delivery of care given the remote nature of Tycho''s geography and unique dependence on air transportation. Currently, Tycho''s air medical resources are using out of state dispatch centers who do not clearly understand the geography of Tycho or time needed to travel within the state. To address this gap in services and mitigate potential life-threatening delays in air medical resources, the Department would like to request funds to support the integration of the LifeMed application into the HIE. This application will allow healthcare entities: Public Health, hospitals, primary care providers, EMS, and all other authorized provider types to track all air medical resources in the state. The LifeMed application allows for tracking of specific tail numbers on planes and locations/timing for air resources.</p>\n<p>&nbsp;</p>\n<p>The HIE will integrate with the LifeMed application so that Tycho providers and healthcare entities are able to seamlessly track all air medical resources in the state, thus greatly improve coordination and transition of care. The ability to track this information through the HIE will further support providers ability to enhance care coordination by accurately tracking patient location and improves health information exchange by giving providers access to information on patient&rsquo;s location to submit summary of care records through the HIE to other provider EHR systems. Funds will be used to support the LifeMed software costs, provider training and implementation services.</p>\n<p>&nbsp;</p>\n<p><strong><ins>III.D.7 AURORA-HIE Integration</ins></strong></p>\n<p>AURORA is a Public Health online patient care reporting system for EMS developed by Image Trend. The Department is requesting funds to support the connection of the AURORA system to the HIE. This activity would activate the HIE integration with the Image Trend solution to allow for Medicaid providers to send patient information to the AURORA system through the HIE. Upon delivery of the patient to the hospital the patient&rsquo;s health data from EMS would be transmitted via the HIE to the hospital&rsquo;s EHR system, and when the patient is discharge the ADT feed from the hospital would be transmitted back to EMS to the AURORA system.</p>\n<p>DHSS is seeking funds to integrate the AURORA Public Health online patient care reporting system for EMS to the HIE to help support Medicaid providers ability to achieve Meaningful Use by meeting outcomes and measures pertaining to Health Information Exchange, Coordination of Care, and Public Health Reporting. Funds will be used to develop interfaces between the HIE and 10 hospitals and provider training and technical onboarding assistance to providers to connect to the HIE and AURORA system.</p>",
      expenses: [
        {
          description:
            'Training materials creation and software for compliance',
          category: 'Hardware, software, and licensing',
          years: { 2022: 10000, 2023: 10000 }
        }
      ],
      fundingSource: 'HIE',
      outcomes: [
        {
          outcome: 'Onboard 100 providers.',
          metrics: [{ metric: '100 providers onboarded.' }]
        }
      ],
      name: 'HIE Enhancement and Onboarding',
      plannedEndDate: '2023-09-30',
      plannedStartDate: '2018-01-01',
      schedule: [
        {
          endDate: '2022-09-30',
          milestone: 'Onboard providers to assistance program'
        },
        { endDate: '2022-12-31', milestone: 'Development of Roadmap' },
        {
          endDate: '2023-01-01',
          milestone: 'HIE Staff Augmentation'
        },
        {
          endDate: '2022-01-01',
          milestone: 'Modules for Care Coordination'
        },
        {
          endDate: '2023-09-30',
          milestone: 'Provider Onboarding'
        },
        {
          endDate: '2022-10-01',
          milestone: 'EDIE System Implementation'
        },
        {
          endDate: '2022-12-31',
          milestone: 'Develop myAlaska HIE Authentication Requirements'
        },
        {
          endDate: '2022-03-31',
          milestone:
            'Completion of requirements gathering to prepare to receive ELR'
        },
        {
          endDate: '2022-12-31',
          milestone:
            'Configuration of internal BizTalk HL7 processes to translate the HL7 messages to PRISM'
        },
        { endDate: '2022-09-30', milestone: 'Onboard Lab Providers' },
        {
          endDate: '2018-12-31',
          milestone:
            'Establishment of program requirements and outreach strategy'
        }
      ],
      standardsAndConditions: {
        doesNotSupport: '',
        supports:
          '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
      },
      statePersonnel: [
        {
          title:
            'Services Integration Architect/ Programmer (Analyst Programmer V)',
          description:
            'Lead technical architecture design and development efforts for designing, implementing and maintaining services integrations leveraging resources such as the MCI, MPI and state HIE along with other DHSS Business Systems.',
          years: {
            2022: { amt: 115000, perc: 4 },
            2023: { amt: 119000, perc: 4 }
          }
        }
      ],
      summary: 'Statewide HIE enhancement and onboarding.',
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
      alternatives:
        '<p>Medicaid PHR/Blue Button</p>\n<p>Integrate MMIS DW into the HIE with Blue Button download</p>\n<p>Allows Medicaid recipients to view their Medicaid claims information in a portal and access it through a Blue Button download</p>\n<p>Assists providers in achieving MU by helping them meet the VDT requirements</p>\n<p>Supports the MU CQMs including EP Core Measure:Electronic Copy of health information</p>\n<p>Alaskans will be able to access their PHRs</p>\n<p>User friendly, easy to use technology helps ensure access</p>\n<p>There are no significant negatives to this approach</p>\n<p>Implement Medicaid PHR/Blue Button</p>',
      contractorResources: [
        {
          description: '',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'RFP Planning Vendor Inc.',
          start: '',
          totalCost: 68734,
          years: { 2022: 50000, 2023: 5000 }
        },
        {
          description: '',
          end: '',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: false,
          name: 'Blue Button Builder Inc.',
          start: '',
          totalCost: 1235246,
          years: { 2022: 735246, 2023: 500000 }
        }
      ],
      costAllocation: {
        2022: { ffp: { federal: 90, state: 10 }, other: 15000 },
        2023: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      costAllocationNarrative: {
        years: {
          2022: {
            otherSources: '<p>Sample Grant Related to Blue Button $15000</p>'
          },
          2023: { otherSources: '' }
        },
        methodology: ''
      },
      description:
        '<p><strong><ins>III.C.1 Medicaid Personal Health Record (PHR)/Blue Button Initiative</ins></strong></p>\n<p>DHSS is requesting HITECH funding to support the onboarding of Medicaid recipients to the developed personal health record (PHR) available within the HIE. The requested funds will be utilized to enhance the ability of patients to access their own health care data in an electronic format that supports MU CQMs including EP Core Measure: Electronic copy of health information. Medicaid PHR/Blue Button (or similar) implementation supports this functionality.</p>\n<p>&nbsp;</p>\n<p>The PHR will not collect CQMs or interface to public health registries. However, it will provide short and long-term value to providers by assisting them in achieving MU.</p>\n<p>Alaska plans to integrate the MMIS DW into the HIE, allowing Medicaid recipients to view their Medicaid claims information in a portal and access it through a Blue Button (or similar) download. Additionally, this initiative will benefit providers by assisting them in achieving MU by helping them meet View, Download, and Transmit (VDT) requirements.</p>\n<p>&nbsp;</p>\n<p>This Medicaid PHR/Blue Button (or similar) approach allows providers to meet VDT requirements without having to create individual patient portals. This supports providers in achieving MU. Medicaid Eligible population will benefit by being able to obtain their Medicaid claim information, along with access to their PHRs. See further cost allocation details in Section VIII and Appendix D.</p>',
      expenses: [
        {
          description: '',
          category: 'Hardware, software, and licensing',
          years: { 2022: 0, 2023: 0 }
        }
      ],
      fundingSource: 'HIE',
      outcomes: [
        {
          outcome: 'Build blue button.',
          metrics: [{ metric: 'Test blue button with 10 providers.' }]
        }
      ],
      name: 'Medicaid Blue Button',
      plannedEndDate: '2022-09-30',
      plannedStartDate: '2018-06-01',
      schedule: [
        { endDate: '2022-04-01', milestone: 'PHR/Blue Button HIE Build' },
        {
          endDate: '2022-12-31',
          milestone: 'Blue Button Implementation'
        },
        {
          endDate: '2022-12-31',
          milestone: 'On-Boarding of PHR/Blue Button Participants'
        }
      ],
      standardsAndConditions: { doesNotSupport: '', supports: '' },
      statePersonnel: [
        {
          title: '',
          description: '',
          years: { 2022: { amt: 0, perc: 0 }, 2023: { amt: 0, perc: 0 } }
        }
      ],
      summary:
        'DHSS is requesting HITECH funding to support the onboarding of Medicaid recipients to the developed personal health record (PHR) available within the HIE.',
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
  proposedBudget: {
    incentivePayments: {
      ehAmt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      ehCt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      epAmt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      epCt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      }
    }
  },
  assurancesAndCompliances: {
    procurement: [
      {
        title: '42 CFR Part 495.348',
        checked: true,
        explanation: ''
      },
      { title: 'SMM Section 11267', checked: true, explanation: '' },
      {
        title: '45 CFR 95.613',
        checked: true,
        explanation: ''
      },
      { title: '45 CFR 75.326', checked: true, explanation: '' }
    ],
    recordsAccess: [
      {
        title: '42 CFR Part 495.350',
        checked: true,
        explanation: ''
      },
      { title: '42 CFR Part 495.352', checked: true, explanation: '' },
      {
        title: '42 CFR Part 495.346',
        checked: true,
        explanation: ''
      },
      {
        title: '42 CFR 433.112(b)',
        checked: true,
        explanation: ''
      },
      { title: '45 CFR Part 95.615', checked: true, explanation: '' },
      {
        title: 'SMM Section 11267',
        checked: true,
        explanation: ''
      }
    ],
    softwareRights: [
      {
        title: '42 CFR 495.360',
        checked: false,
        explanation:
          'We were able to get better pricing if we allowed the vendor to maintain ownership of the product they developed.'
      },
      { title: '45 CFR 95.617', checked: true, explanation: '' },
      {
        title: '42 CFR Part 431.300',
        checked: true,
        explanation: ''
      },
      { title: '42 CFR Part 433.112', checked: true, explanation: '' }
    ],
    security: [
      {
        title: '45 CFR 164 Security and Privacy',
        checked: true,
        explanation: ''
      }
    ]
  }
};

const apdNoActivities = {
  name: 'HITECH IAPD No Activities',
  years: ['2022', '2023'],
  apdOverview: {
    programOverview:
      "<p>The Department is the state agency that administers the Tycho Medicaid program. The Information Technology (IT) Planning Office is responsible for Health Information Technology (HIT) efforts. Tycho Medicaid has elected to participate in the Electronic Health Record (EHR) Provider Incentive Payment Program funded through CMS. In accordance with Federal regulations, Tycho, requests enhanced Federal Financial Participation (FFP) from the CMS through this Implementation Advance Planning Document Update #9 (IAPDU#9). The State Medicaid Health Information Technology Plan (SMHP) was approved by CMS in March 2017, and is currently being updated for submission in June 2022.</p>\n<p>The original IAPD request supported the first phase of the Station''s participation in the development and expansion of the use of EHR and collaboration among state entities in a Health Information Exchange (HIE) network. In the first phase, Tycho implemented the system changes necessary to support the Tycho EHR Provider Incentive Payment Program as well as the administrative supports necessary for implementation and operation of this program.&nbsp;</p>\n<ol>\n<li>The first IAPDU requested additional support for the EHR Provider Incentive Payment Program and additional project support.</li>\n<li>The second IAPDU requested funding for the Division of Senior and Disabilities Services (DSDS) Automated Service Plan (ASP) system, supporting expanded use of EHRs.</li>\n<li>The third IAPDU requested additional and continued support of HIT initiatives.</li>\n</ol>\n<p>Effective with the approval of the original IAPD, Tycho closed the Planning Advance Planning Document (PAPD) submitted to CMS in December 2009 and opened the IAPD. This document represents the sixth update to the approved IAPD.</p>\n<p>This funding request time frame is for the period of October 1, 2018 to September 30, 2023.&nbsp;</p>",
    narrativeHIT:
      '<p><span style="font-size: 18px;"><strong><ins>Continued Operations of the Medicaid EHR Incentive Payment Program</ins></strong></span></p>\n<p><span style="font-size: 18px;">Participate in the CMS EHR incentive program and continue to administer payments to EPs and EHs through the remaining years of the program (2023).</span></p>',
    narrativeHIE:
      "<p>Tycho''s existing health information infrastructure consists of various organizations operating at the enterprise, local, regional and state levels, and includes:</p>\n<ul>\n<li>Health systems, affiliated providers, and ancillary services;</li>\n<li>State agencies health data repositories;</li>\n<li>Specialized participants that operate for specific purposes including, but not limited to, laboratory services, radiology, public health, research and quality assessment;</li>\n<li>Information and service providers that operate in vertical markets such as e-Prescribing, State registries, Medicaid and Medicare;</li>\n<li>Private payers and clearinghouses that transmit administrative data for claims purposes and for pay for performance programs.</li>\n</ul>\n<p>The Tycho HIE has planned to implement a robust public health modernization plan which includes the development of specialized registries and interfaces to the HIE to significantly increase the ability for EPs and EHs to achieve meaningful use. Additionally, plans to collect CQM data and the creation of a Personal Health Record (PHR) has been identified as activities to complete.</p>\n<p></p>\n<p>Payers/Providers must complete a participation agreement form and possible addendum to participate in the HIE and other services. Governance for the HIE has been defined by the State statute, any related regulations and by the HIE board of directors.</p>\n<p></p>\n<p>Appropriate cost allocation is a fundamental principle of the federal FFP program to ensure that private sector beneficiaries of public investments are covering the incremental cost of their use. A sustainability plan for proportional investments by other payers/providers than Medicaid was developed in concert with the Tycho HIE Board of Directors and a broad cross-section of stakeholders under the leadership of the Tycho HIE Executive Director and State HIT Coordinator. The Tycho HIEâs fee structure and detailed participation agreements can be viewed at: tychoMedicaid.com</p>",
    narrativeMMIS:
      "<p><strong><ins>Medicaid Claims Data Feed to the HIE</ins></strong></p>\n<p>Currently, Tycho does not have an All-Payersâ Claims database that can provide consumers and DHSS with consolidated claims data. To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. This initiative will require contractor assistance from Conduent, LLC to complete required MMIS changes as well as Tycho''s HIE Service provider, Orion Health to implement the necessary HIE updates. DHSS IT Planning Office will coordinate the efforts of the three vendors.</p>"
  },
  keyStatePersonnel: {
    medicaidDirector: {
      name: 'Cornelius Fudge',
      email: 'c.fudge@ministry.magic',
      phone: '5551234567'
    },
    medicaidOffice: {
      address1: '100 Round Sq',
      address2: '',
      city: 'Cityville',
      state: 'AK',
      zip: '12345'
    },
    keyPersonnel: [
      {
        name: 'James Holden',
        position: 'HIT Coordinator',
        email: 'JimPushesButtons@tycho.com',
        isPrimary: true,
        fte: { 2022: 1, 2023: 1 },
        hasCosts: true,
        costs: { 2022: 100000, 2023: 100000 }
      },
      {
        name: 'Fred Johnson',
        position: 'Project Management Office Director',
        email: 'FJohnson@tycho.com',
        isPrimary: false,
        fte: { 2022: 0.3, 2023: 0.3 },
        hasCosts: false,
        costs: { 2022: 0, 2023: 0 }
      }
    ]
  },
  previousActivities: {
    previousActivitySummary:
      '<p><span style="font-size: 18px;"><strong><ins>EHR Incentive Payment Program</ins></strong></span></p>\n<p>As of May 31, 2018, the state has disbursed $22,145,454 to 1200Eligible Professionals (EPs) and $19,884,887 to 32 Eligible Hospitals (EHs) for Adopt/Implement/Upgrade (AIU) incentive payments and $25,454,444 for 1988 EP Meaningful Use (MU) Incentive payments and $19,444,444 for 98 EH MU Incentive payments. Tycho has anticipated payments for the remainder of FFY19 through FFY20 to be approximately $98,888,555.</p>\n<p></p>\n<p>Tycho has updated the SMHP, and CMS has approved, to reflect the changes such as the auditing contract, the Stateâs audit strategy, and alignment with the Stage 3 Final Rule. This IAPDU #6 includes updated costs for existing project and EHR Incentive Payment Program administration, as well as several new initiatives. The SMHP will continue to be aligned with CMS rule changes and the IAPDU requests. All planning activities approved under the PAPD have been completed. Table 1 below identifies the approved amounts from the PAPD and the expenses available in the stateâs accounting system. The PAPD previously approved was requested to be closed out to the HIT IAPD in March 2011; the remaining balance was carried over to the approved IAPD at that time to complete planning activities related to MU.</p>\n<p></p>\n<p>IAPD Funding Milestones and Expenditures</p>\n<p>The first IAPDU which was approved by CMS in October 2012 requested funding for HIT initiatives. The primary focus of the activities in the IAPDU # 2, which was approved in April 2013 was support of MU Stage 1, preparation for MU Stage 2, and the ongoing administration of the EHR Incentive Payment program. Subsequent IAPD submissions requested continued funding to support program operations and modernization of enterprise systems.</p>\n<p></p>\n<p>Tycho recently transitioned to a new state-wide financial system and it would be overly burdensome and a manual process to detail expenses out in the method done in previous HITECH IAPD submissions. Tycho has elected to report expenditures based on the CMS-64 line reporting for HITECH as this will be the most audible method due to the stateâs transition to a new financial system.</p>\n<p>Detailed List of Expenditure Types:</p>\n<ul>\n<li>State personnel</li>\n<li>Travel and conferences: CMS Regional Meeting, attendance at local/Anchorage-based conferences to support EHR Incentive Program and Meaningful Use, and other HIT/HIE related conferences such as StateHealth IT Connect, IT Solutions Management (ISM) annual conference</li>\n<li>Contract payments for State Level Registry solution</li>\n<li>Contract payments for post-payment audits for the Medicaid EHR Incentive Program</li>\n<li>Contract payments for Technical Assistance for EHR Incentive Program and other HITECH activities identified in HITECH IAPD</li>\n<li>Contract payments for MITA 3.0 COTS solution as outlined in HITECH IAPD to support the development of a HITECH MITA 3.0 State Self-Assessment</li>\n<li>Administrative costs: copy paper, office supplies</li>\n</ul>',
    actualExpenditures: {
      2019: {
        hithie: { federalActual: 140000, totalApproved: 280000 },
        mmis: {
          50: { federalActual: 23445, totalApproved: 82545 },
          75: { federalActual: 23440, totalApproved: 75340 },
          90: { federalActual: 235720, totalApproved: 262460 }
        }
      },
      2020: {
        hithie: { federalActual: 146346, totalApproved: 234526 },
        mmis: {
          50: { federalActual: 129387, totalApproved: 375445 },
          75: { federalActual: 413246, totalApproved: 654455 },
          90: { federalActual: 614544, totalApproved: 863455 }
        }
      },
      2021: {
        hithie: { federalActual: 320000, totalApproved: 540000 },
        mmis: {
          50: { federalActual: 0, totalApproved: 0 },
          75: { federalActual: 0, totalApproved: 0 },
          90: { federalActual: 0, totalApproved: 0 }
        }
      }
    }
  },
  activities: [],
  proposedBudget: {
    incentivePayments: {
      ehAmt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      ehCt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      epAmt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      epCt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      }
    }
  },
  assurancesAndCompliances: {
    procurement: [
      {
        title: '42 CFR Part 495.348',
        checked: true,
        explanation: ''
      },
      { title: 'SMM Section 11267', checked: true, explanation: '' },
      {
        title: '45 CFR 95.613',
        checked: true,
        explanation: ''
      },
      { title: '45 CFR 75.326', checked: true, explanation: '' }
    ],
    recordsAccess: [
      {
        title: '42 CFR Part 495.350',
        checked: true,
        explanation: ''
      },
      { title: '42 CFR Part 495.352', checked: true, explanation: '' },
      {
        title: '42 CFR Part 495.346',
        checked: true,
        explanation: ''
      },
      {
        title: '42 CFR 433.112(b)',
        checked: true,
        explanation: ''
      },
      { title: '45 CFR Part 95.615', checked: true, explanation: '' },
      {
        title: 'SMM Section 11267',
        checked: true,
        explanation: ''
      }
    ],
    softwareRights: [
      {
        title: '42 CFR 495.360',
        checked: false,
        explanation:
          'We were able to get better pricing if we allowed the vendor to maintain ownership of the product they developed.'
      },
      { title: '45 CFR 95.617', checked: true, explanation: '' },
      {
        title: '42 CFR Part 431.300',
        checked: true,
        explanation: ''
      },
      { title: '42 CFR Part 433.112', checked: true, explanation: '' }
    ],
    security: [
      {
        title: '45 CFR 164 Security and Privacy',
        checked: true,
        explanation: ''
      }
    ]
  }
};

const data = [
  {
    stateId: 'ak',
    status: 'draft',
    ...apd
  },
  {
    stateId: 'ak',
    status: 'draft',
    ...apdNoActivities
  }
];

module.exports = {
  data,
  apd,
  apdNoActivities
};
