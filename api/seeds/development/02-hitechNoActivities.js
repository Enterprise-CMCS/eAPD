const hitechNoActivities = {
  apdType: 'HITECH',
  name: 'HITECH IAPD No Activities',
  years: ['2022', '2023'],
  yearOptions: ['2022', '2023', '2024'],
  apdOverview: {
    updateStatus: {
      isUpdateAPD: false,
      annualUpdate: false,
      asNeededUpdate: false
    },
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

module.exports = { hitechNoActivities };
