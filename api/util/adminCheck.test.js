const tap = require('tap');
const { APD_TYPE } = require('@cms-eapd/common');

const validHitechApdOverview = {
  programOverview: 'abc',
  narrativeHIT: 'abc',
  narrativeHIE: 'abc',
  narrativeMMIS: 'abc',
  updateStatus: {
    isUpdateAPD: true,
    annualUpdate: false,
    asNeededUpdate: true
  }
};

const validMmisApdOverview = {
  updateStatus: {
    isUpdateAPD: false,
    annualUpdate: false,
    asNeededUpdate: false
  },
  medicaidBusinessAreas: {
    waiverSupportSystems: false,
    assetVerificationSystem: false,
    claimsProcessing: true,
    decisionSupportSystemDW: false,
    electronicVisitVerification: false,
    encounterProcessingSystemMCS: false,
    financialManagement: true,
    healthInformationExchange: false,
    longTermServicesSupports: false,
    memberManagement: false,
    pharmacyBenefitManagementPOS: false,
    programIntegrity: true,
    providerManagement: false,
    thirdPartyLiability: false,
    other: false,
    otherMedicaidBusinessAreas: ''
  }
};

const validKeyStatePersonnel = {
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
    }
  ]
};

const validStatePrioritiesAndScope = {
  medicaidProgramAndPriorities: 'Medicaid program and priorities',
  mesIntroduction: 'Introduction',
  scopeOfAPD: 'scope'
};

const validPreviousActivities = {
  previousActivitySummary: 'abc',
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
};

const validActivity = {
  activitySchedule: {
    plannedStartDate: '2021-09-30',
    plannedEndDate: '2023-09-30'
  },
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
      outcome: 'Provide support to EPs and EHs through attestation process.',
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
      description: 'abc',
      category: 'Training and outreach',
      years: { 2022: 40000, 2023: 40000 }
    },
    {
      description: 'abc',
      category: 'Travel',
      years: { 2022: 35000, 2023: 35000 }
    },
    {
      description: 'abc',
      category: 'Hardware, software, and licensing',
      years: { 2022: 700000, 2023: 0 }
    }
  ],
  contractorResources: [
    {
      description: 'Maintain SLR',
      end: '2021-01-15',
      hourly: {
        2022: { hours: '', rate: '' },
        2023: { hours: '', rate: '' }
      },
      useHourly: false,
      name: 'Super SLR Incorporated',
      start: '2020-01-15',
      totalCost: 32423,
      years: { 2022: 999756, 2023: 342444 }
    },
    {
      description: 'Technology consulting and planning services.',
      end: '2023-01-15',
      hourly: {
        2022: { hours: '', rate: '' },
        2023: { hours: '', rate: '' }
      },
      useHourly: 'true',
      name: 'Tech Consulting Inc.',
      start: '2021-01-15',
      totalCost: 473573,
      years: { 2022: 333000, 2023: 200000 }
    }
  ],
  costAllocation: {
    2022: { ffp: { federal: 90, state: 10 }, other: 0 },
    2023: { ffp: { federal: 90, state: 10 }, other: 0 }
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
};

const validHitechActivity = {
  fundingSource: 'HIT',
  name: 'Program Administration',
  activityOverview: {
    description: 'abc',
    summary:
      '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
    alternatives: 'abc',
    standardsAndConditions: {
      doesNotSupport: '',
      supports:
        '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
    }
  },
  ...validActivity,
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
  }
};

const validMmisActivity = {
  name: 'Activity 2',
  activityOverview: {
    activitySnapshot: 'Snapshot',
    problemStatement: 'Problem statement',
    proposedSolution: 'Prosed solution'
  },
  analysisOfAlternativesAndRisks: {
    alternativeAnalysis: 'Alternative analysis',
    costBenefitAnalysis: 'Cost benefit analysis',
    feasibilityStudy: 'Feasibility study',
    requirementsAnalysis: 'Requirements analysis',
    forseeableRisks: 'Forseeable risks'
  },
  conditionsForEnhancedFunding: {
    enhancedFundingQualification: false,
    enhancedFundingJustification: ''
  },
  ...validActivity
};

const validProposedBudget = {
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
};

const validSecurityPlanning = {
  securityAndInterfacePlan: 'We have a great plan',
  businessContinuityAndDisasterRecovery: `Don't panic`
};

const validHitechAssurancesAndCompliances = {
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
};

const validMmisAssurancesAndCompliances = {
  procurement: [
    { title: 'SSM, Part 11', checked: true, explanation: '' },
    { title: '45 CFR Part 95.615', checked: true, explanation: '' },
    { title: '45 CFR Part 92.36', checked: true, explanation: '' }
  ],
  recordsAccess: [
    {
      title: '42 CFR Part 433.112(b)(5)-(9)',
      checked: true,
      explanation: ''
    },
    { title: '45 CFR Part 95.615', checked: true, explanation: '' },
    { title: 'SMM Section 11267', checked: true, explanation: '' }
  ],
  softwareRights: [
    { title: '45 CFR Part 95.617', checked: true, explanation: '' },
    {
      title: '42 CFR Part 431.300',
      checked: false,
      explanation:
        'We were able to get better pricing if we allowed the vendor to maintain ownership of the product they developed.'
    },
    { title: '45 CFR Part 164', checked: true, explanation: '' }
  ],
  independentVV: [
    {
      title: '45 CFR Part 95.626',
      checked: true,
      explanation: ''
    }
  ]
};

const invalidHitechApdOverview = {
  programOverview: '',
  narrativeHIT: '',
  narrativeHIE: '',
  narrativeMMIS: '',
  updateStatus: {
    isUpdateAPD: null,
    annualUpdate: null,
    asNeededUpdate: null
  }
};

const invalidMmisApdOverview = {
  updateStatus: {
    isUpdateAPD: null,
    annualUpdate: null,
    asNeededUpdate: null
  },
  medicaidBusinessAreas: {
    waiverSupportSystems: false,
    assetVerificationSystem: false,
    claimsProcessing: false,
    decisionSupportSystemDW: false,
    electronicVisitVerification: false,
    encounterProcessingSystemMCS: false,
    financialManagement: false,
    healthInformationExchange: false,
    longTermServicesSupports: false,
    memberManagement: false,
    pharmacyBenefitManagementPOS: false,
    programIntegrity: false,
    providerManagement: false,
    thirdPartyLiability: false,
    other: false,
    otherMedicaidBusinessAreas: ''
  }
};

const invalidKeyStatePersonnel = {
  medicaidDirector: {
    name: '',
    email: 'c.fudge@ministry.magic',
    phone: '5551234567'
  },
  medicaidOffice: {
    address1: '100 Round Sq',
    address2: '',
    city: 'Cityville',
    state: '',
    zip: '12345'
  },
  keyPersonnel: [
    {
      name: '',
      position: 'HIT Coordinator',
      email: 'JimPushesButtons@tycho.com',
      isPrimary: '',
      fte: { 2022: null, 2023: 1 },
      hasCosts: 'true',
      costs: { 2022: null, 2023: 100000 }
    }
  ]
};

const invalidStatePrioritiesAndScope = {
  medicaidProgramAndPriorities: 'Medicaid program and priorities',
  mesIntroduction: '',
  scopeOfAPD: 'scope'
};

const invalidActivity = {
  activitySchedule: {
    plannedStartDate: '2021-09-30',
    plannedEndDate: '2023-09-30'
  },
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
      outcome: 'Provide support to EPs and EHs through attestation process.',
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
      description: '',
      years: {
        2022: { amt: 86000, perc: 0 },
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
      description: 'abc',
      category: 'Training and outreach',
      years: { 2022: 40000, 2023: 40000 }
    },
    {
      description: 'abc',
      category: 'Travel',
      years: { 2022: 35000, 2023: 35000 }
    },
    {
      description: 'abc',
      category: 'Hardware, software, and licensing',
      years: { 2022: 700000, 2023: 0 }
    }
  ],
  contractorResources: [
    {
      description: '',
      end: '',
      hourly: {
        2022: { hours: '', rate: '' },
        2023: { hours: '', rate: '' }
      },
      useHourly: null,
      name: 'Super SLR Incorporated',
      start: '2020-01-15',
      totalCost: 32423,
      years: { 2022: -1, 2023: 342444 }
    },
    {
      description: 'Technology consulting and planning services.',
      end: '2023-01-15',
      hourly: {
        2022: { hours: '', rate: '' },
        2023: { hours: '', rate: '' }
      },
      useHourly: 'false',
      name: 'Tech Consulting Inc.',
      start: '2021-01-15',
      totalCost: 473573,
      years: { 2022: 333000, 2023: 200000 }
    }
  ],
  costAllocation: {
    2022: { ffp: { federal: 90, state: 10 }, other: 0 },
    2023: { ffp: { federal: 90, state: 10 }, other: 0 }
  }
};

const invalidHitechActivity = {
  fundingSource: '',
  name: 'Program Administration',
  activityOverview: {
    summary:
      '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
    description: 'abc',
    alternatives: 'abc',
    standardsAndConditions: {
      doesNotSupport: '',
      supports:
        '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
    }
  },
  ...invalidActivity,
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
};

const invalidMmisActivity = {
  name: '',
  activityOverview: {
    activitySnapshot: 'Snapshot',
    problemStatement: '',
    proposedSolution: 'Prosed solution'
  },
  analysisOfAlternativesAndRisks: {
    alternativeAnalysis: '',
    costBenefitAnalysis: 'Cost benefit analysis',
    feasibilityStudy: 'Feasibility study',
    requirementsAnalysis: 'Requirements analysis',
    forseeableRisks: 'Forseeable risks'
  },
  conditionsForEnhancedFunding: {
    enhancedFundingQualification: true,
    enhancedFundingJustification: ''
  },
  ...invalidActivity
};

const invalidHitechActivityCostAllocationOther = {
  fundingSource: 'HIT',
  name: 'Program Administration',
  activityOverview: {
    summary:
      '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
    description: 'abc',
    alternatives: 'abc',
    standardsAndConditions: {
      doesNotSupport: '',
      supports:
        '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
    }
  },
  ...validActivity,
  costAllocation: {
    2022: { ffp: { federal: 90, state: 10 }, other: 1 },
    2023: { ffp: { federal: 90, state: 10 }, other: 0 }
  },
  costAllocationNarrative: {
    years: {
      2022: {
        otherSources: ''
      },
      2023: {
        otherSources: ''
      }
    },
    methodology: '<p>No cost allocation is necessary for this activity.</p>'
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
};

const invalidProposedBudget = {
  incentivePayments: {
    ehAmt: {
      2022: { 1: null, 2: 0, 3: 0, 4: null },
      2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    ehCt: {
      2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
      2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    epAmt: {
      2022: { 1: 0, 2: 0, 3: null, 4: 0 },
      2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
    },
    epCt: {
      2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
      2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
    }
  }
};

const invalidSecurityPlanning = {
  securityAndInterfacePlan: 'A great plan',
  businessContinuityAndDisasterRecovery: ''
};

const invalidHitechAssurancesAndCompliances = {
  procurement: [
    {
      title: '42 CFR Part 495.348',
      checked: false,
      explanation: ''
    },
    { title: 'SMM Section 11267', checked: true, explanation: '' },
    {
      title: '45 CFR 95.613',
      checked: false,
      explanation: ''
    },
    { title: '45 CFR 75.326', checked: true, explanation: '' }
  ],
  recordsAccess: [
    {
      title: '42 CFR Part 495.350',
      checked: null,
      explanation: 'ok'
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
};

const invalidMmisAssurancesAndCompliances = {
  procurement: [
    { title: 'SSM, Part 11', checked: false, explanation: '' },
    { title: '45 CFR Part 95.615', checked: true, explanation: '' },
    { title: '45 CFR Part 92.36', checked: true, explanation: '' }
  ],
  recordsAccess: [
    {
      title: '42 CFR Part 433.112(b)(5)-(9)',
      checked: null,
      explanation: 'ok'
    },
    { title: '45 CFR Part 95.615', checked: true, explanation: '' },
    { title: 'SMM Section 11267', checked: true, explanation: '' }
  ],
  softwareRights: [
    {
      title: '45 CFR Part 95.617',
      checked: false,
      explanation:
        'We were able to get better pricing if we allowed the vendor to maintain ownership of the product they developed.'
    },
    { title: '42 CFR Part 431.300', checked: true, explanation: '' },
    { title: '45 CFR Part 164', checked: true, explanation: '' }
  ],
  independentVV: [
    {
      title: '45 CFR Part 95.626',
      checked: true,
      explanation: ''
    }
  ]
};

const mockHitechApdRandomInvalid = {
  _id: '632a0fbc5665670a34b3bbd7',
  apdType: APD_TYPE.HITECH,
  name: 'Test APD',
  years: ['2022', '2023'],
  apdOverview: {
    programOverview: 'abc',
    narrativeHIT: '',
    narrativeHIE: 'abc',
    narrativeMMIS: 'abc'
  },
  keyStatePersonnel: {
    medicaidDirector: {
      name: null,
      email: 'c.fudge@ministry.magic',
      phone: '5551234567'
    },
    medicaidOffice: {
      address1: '100 Round Sq',
      address2: '',
      city: 'Cityville',
      state: 'AK',
      zip: ''
    },
    keyPersonnel: [
      {
        name: 'James Holden',
        position: null,
        email: 'JimPushesButtons@tycho.com',
        isPrimary: 'true',
        fte: { 2022: 1, 2023: 1 },
        hasCosts: 'true',
        costs: { 2022: 100000, 2023: 100000 }
      }
    ]
  },
  previousActivities: {
    previousActivitySummary: 'abc',
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
      fundingSource: 'HIT',
      name: 'Program Administration',
      activityOverview: {
        summary:
          '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
        description: 'abc',
        alternatives: 'abc',
        standardsAndConditions: {
          doesNotSupport: '',
          supports:
            '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
        }
      },
      activitySchedule: {
        plannedStartDate: '2021-09-30',
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
            { metric: '' },
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
            2022: { amt: null, perc: 1 },
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
          description: 'abc',
          category: 'Training and outreach',
          years: { 2022: 40000, 2023: 40000 }
        },
        {
          description: 'abc',
          category: 'Travel',
          years: { 2022: 35000, 2023: 35000 }
        },
        {
          description: 'abc',
          category: 'Hardware, software, and licensing',
          years: { 2022: 700000, 2023: 0 }
        }
      ],
      contractorResources: [
        {
          description: 'Maintain SLR',
          end: '2021-01-15',
          hourly: {
            2022: { hours: null, rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: '',
          name: 'Super SLR Incorporated',
          start: '2020-01-15',
          totalCost: 32423,
          years: { 2022: 999756, 2023: 342444 }
        },
        {
          description: 'Technology consulting and planning services.',
          end: '2023-01-15',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: 'false',
          name: 'Tech Consulting Inc.',
          start: '2021-01-15',
          totalCost: 473573,
          years: { 2022: 333000, 2023: 200000 }
        }
      ],
      costAllocation: {
        2022: { ffp: { federal: 0, state: 100 }, other: 0 },
        2023: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      costAllocationNarrative: {
        years: {
          2022: {
            otherSources: ''
          },
          2023: {
            otherSources:
              '<p>No other funding is provided for this activity for FFY 2023.</p>'
          }
        },
        methodology: '<p>No cost allocation is necessary for this activity.</p>'
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
      fundingSource: 'HIT',
      name: 'Program Administration',
      activityOverview: {
        summary:
          '1 Continued Operations of the Medicaid EHR Incentive Payment Program, includes modifications to the SLR, HIT staff, auditing, outreach, and non-personnel expenses for administering the program.',
        description: 'abc',
        alternatives: 'abc',
        standardsAndConditions: {
          doesNotSupport: '',
          supports:
            '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
        }
      },
      activitySchedule: {
        plannedStartDate: '2021-09-30',
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
            { metric: '' },
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
            2022: { amt: null, perc: 1 },
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
          description: 'abc',
          category: 'Training and outreach',
          years: { 2022: null, 2023: 40000 }
        },
        {
          description: 'abc',
          category: 'Travel',
          years: { 2022: 35000, 2023: 35000 }
        },
        {
          description: 'abc',
          category: 'Hardware, software, and licensing',
          years: { 2022: 700000, 2023: 0 }
        }
      ],
      contractorResources: [
        {
          description: 'Maintain SLR',
          end: '2021-01-15',
          hourly: {
            2022: { hours: null, rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: '',
          name: 'Super SLR Incorporated',
          start: '2020-01-15',
          totalCost: 32423,
          years: { 2022: 999756, 2023: 342444 }
        },
        {
          description: 'Technology consulting and planning services.',
          end: '2023-01-15',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: 'false',
          name: 'Tech Consulting Inc.',
          start: '2021-01-15',
          totalCost: 473573,
          years: { 2022: 333000, 2023: 200000 }
        }
      ],
      costAllocation: {
        2022: { ffp: { federal: 0, state: 100 }, other: 0 },
        2023: { ffp: { federal: 90, state: 10 }, other: 0 }
      },
      costAllocationNarrative: {
        years: {
          2022: {
            otherSources: ''
          },
          2023: {
            otherSources:
              '<p>No other funding is provided for this activity for FFY 2023.</p>'
          }
        },
        methodology: '<p>No cost allocation is necessary for this activity.</p>'
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
  proposedBudget: {
    incentivePayments: {
      ehAmt: {
        2022: { 1: null, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      ehCt: {
        2022: { 1: 0, 2: 0, 3: 0, 4: 0 },
        2023: { 1: 0, 2: 0, 3: 0, 4: 0 }
      },
      epAmt: {
        2022: { 1: 0, 2: 0, 3: null, 4: 0 },
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
        checked: null,
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
        checked: false,
        explanation: ''
      }
    ]
  }
};

const mockMmisApdRandomInvalid = {
  _id: '632a0fbc5665670a34b3bbd7',
  apdType: APD_TYPE.MMIS,
  name: 'Test APD',
  years: ['2022', '2023'],
  apdOverview: {
    updateStatus: {
      isUpdateAPD: true,
      annualUpdate: false,
      asNeededUpdate: false
    },
    medicaidBusinessAreas: {
      waiverSupportSystems: false,
      assetVerificationSystem: false,
      claimsProcessing: true,
      decisionSupportSystemDW: false,
      electronicVisitVerification: false,
      encounterProcessingSystemMCS: false,
      financialManagement: true,
      healthInformationExchange: false,
      longTermServicesSupports: false,
      memberManagement: false,
      pharmacyBenefitManagementPOS: false,
      programIntegrity: true,
      providerManagement: false,
      thirdPartyLiability: false,
      other: true,
      otherMedicaidBusinessAreas: ''
    }
  },
  keyStatePersonnel: {
    medicaidDirector: {
      name: null,
      email: 'c.fudge@ministry.magic',
      phone: '5551234567'
    },
    medicaidOffice: {
      address1: '100 Round Sq',
      address2: '',
      city: 'Cityville',
      state: 'AK',
      zip: ''
    },
    keyPersonnel: [
      {
        name: 'James Holden',
        position: null,
        email: 'JimPushesButtons@tycho.com',
        isPrimary: 'true',
        fte: { 2022: 1, 2023: 1 },
        hasCosts: 'true',
        costs: { 2022: 100000, 2023: 100000 }
      }
    ]
  },
  statePrioritiesAndScope: {
    medicaidProgramAndPriorities: '',
    mesIntroduction: 'Introduction',
    scopeOfAPD: 'scope'
  },
  previousActivities: {
    previousActivitySummary: 'abc',
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
      name: 'Program Administration',
      activityOverview: {
        activitySnapshot: '',
        problemStatement: 'Problem statement',
        proposedSolution: 'Prosed solution'
      },
      activitySchedule: {
        plannedStartDate: '2021-09-30',
        plannedEndDate: '2023-09-30'
      },
      analysisOfAlternativesAndRisks: {
        alternativeAnalysis: '',
        costBenefitAnalysis: 'Cost benefit analysis',
        feasibilityStudy: 'Feasibility study',
        requirementsAnalysis: 'Requirements analysis',
        forseeableRisks: 'Forseeable risks'
      },
      conditionsForEnhancedFunding: {
        enhancedFundingQualification: true,
        enhancedFundingJustification: ''
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
            { metric: '' },
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
            2022: { amt: null, perc: 1 },
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
          description: 'abc',
          category: 'Training and outreach',
          years: { 2022: 40000, 2023: 40000 }
        },
        {
          description: 'abc',
          category: 'Travel',
          years: { 2022: 35000, 2023: 35000 }
        },
        {
          description: 'abc',
          category: 'Hardware, software, and licensing',
          years: { 2022: 700000, 2023: 0 }
        }
      ],
      contractorResources: [
        {
          description: 'Maintain SLR',
          end: '2021-01-15',
          hourly: {
            2022: { hours: null, rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: '',
          name: 'Super SLR Incorporated',
          start: '2020-01-15',
          totalCost: 32423,
          years: { 2022: 999756, 2023: 342444 }
        },
        {
          description: 'Technology consulting and planning services.',
          end: '2023-01-15',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: 'false',
          name: 'Tech Consulting Inc.',
          start: '2021-01-15',
          totalCost: 473573,
          years: { 2022: 333000, 2023: 200000 }
        }
      ],
      costAllocation: {
        2022: { ffp: { federal: 0, state: 100 }, other: 0 },
        2023: { ffp: { federal: 90, state: 10 }, other: 0 }
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
      name: 'Program Administration',
      activityOverview: {
        activitySnapshot: 'Snapshot',
        problemStatement: 'Problem statement',
        proposedSolution: 'Prosed solution'
      },
      activitySchedule: {
        plannedStartDate: '2021-09-30',
        plannedEndDate: '2023-09-30'
      },
      analysisOfAlternativesAndRisks: {
        alternativeAnalysis: 'Alternative analysis',
        costBenefitAnalysis: 'Cost benefit analysis',
        feasibilityStudy: 'Feasibility study',
        requirementsAnalysis: 'Requirements analysis',
        forseeableRisks: 'Forseeable risks'
      },
      conditionsForEnhancedFunding: {
        enhancedFundingQualification: true,
        enhancedFundingJustification: 'justification'
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
            { metric: '' },
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
            2022: { amt: null, perc: 1 },
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
          description: 'abc',
          category: 'Training and outreach',
          years: { 2022: null, 2023: 40000 }
        },
        {
          description: 'abc',
          category: 'Travel',
          years: { 2022: 35000, 2023: 35000 }
        },
        {
          description: 'abc',
          category: 'Hardware, software, and licensing',
          years: { 2022: 700000, 2023: 0 }
        }
      ],
      contractorResources: [
        {
          description: 'Maintain SLR',
          end: '2021-01-15',
          hourly: {
            2022: { hours: null, rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: '',
          name: 'Super SLR Incorporated',
          start: '2020-01-15',
          totalCost: 32423,
          years: { 2022: 999756, 2023: 342444 }
        },
        {
          description: 'Technology consulting and planning services.',
          end: '2023-01-15',
          hourly: {
            2022: { hours: '', rate: '' },
            2023: { hours: '', rate: '' }
          },
          useHourly: 'false',
          name: 'Tech Consulting Inc.',
          start: '2021-01-15',
          totalCost: 473573,
          years: { 2022: 333000, 2023: 200000 }
        }
      ],
      costAllocation: {
        2022: { ffp: { federal: 0, state: 100 }, other: 0 },
        2023: { ffp: { federal: 90, state: 10 }, other: 0 }
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
  securityPlanning: {
    securityAndInterfacePlan: '',
    businessContinuityAndDisasterRecovery: `Don't panic`
  },
  assurancesAndCompliances: {
    procurement: [
      { title: 'SSM, Part 11', checked: null, explanation: '' },
      { title: '45 CFR Part 95.615', checked: true, explanation: '' },
      { title: '45 CFR Part 92.36', checked: true, explanation: '' }
    ],
    recordsAccess: [
      {
        title: '42 CFR Part 433.112(b)(5)-(9)',
        checked: true,
        explanation: ''
      },
      { title: '45 CFR Part 95.615', checked: true, explanation: '' },
      { title: 'SMM Section 11267', checked: true, explanation: '' }
    ],
    softwareRights: [
      { title: '45 CFR Part 95.617', checked: true, explanation: '' },
      {
        title: '42 CFR Part 431.300',
        checked: false,
        explanation:
          'We were able to get better pricing if we allowed the vendor to maintain ownership of the product they developed.'
      },
      { title: '45 CFR Part 164', checked: true, explanation: '' }
    ],
    independentVV: [
      {
        title: '45 CFR Part 95.626',
        checked: false,
        explanation: ''
      }
    ]
  }
};

const expectedErrorsMockHitechApdRandom = [
  {
    section: 'APD Overview',
    link: '/apd/632a0fbc5665670a34b3bbd7/apd-overview',
    fieldDescription: 'Provide a summary of HIT-funded activities.'
  },
  {
    section: 'Key State Personnel',
    link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
    fieldDescription: 'Provide the name of the State Medicaid Director.'
  },
  {
    section: 'Key State Personnel',
    link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
    fieldDescription: 'Provide a zip code.'
  },
  {
    section: 'Key State Personnel',
    link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
    fieldDescription: 'Provide a role for the point of contact.'
  },
  {
    section: 'Activity 1 Private Contractor Costs',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
    fieldDescription: 'Must select hourly or yearly.'
  },
  {
    section: 'Activity 1 Budget and FFP',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/ffp',
    fieldDescription: 'Select a federal-state split.'
  },
  {
    section: 'Activity 1 Outcomes and Metrics',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/oms',
    fieldDescription: 'Metric is required'
  },
  {
    section: 'Activity 1 State Staff and Expenses',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/state-costs',
    fieldDescription: 'Please provide a FTE cost greater than or equal to $0.'
  },
  {
    section: 'Activity 1 Private Contractor Costs',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
    fieldDescription: 'Must select hourly or yearly.'
  },
  {
    section: 'Activity 1 Budget and FFP',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/ffp',
    fieldDescription: 'Select a federal-state split.'
  },
  {
    section: 'Activity 2 State Staff and Expenses',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/state-costs',
    fieldDescription: 'Provide an annual cost.'
  },
  {
    section: 'Activity 2 Outcomes and Metrics',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/oms',
    fieldDescription: 'Metric is required'
  },
  {
    section: 'Activity 2 State Staff and Expenses',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/state-costs',
    fieldDescription: 'Please provide a FTE cost greater than or equal to $0.'
  },
  {
    section: 'Activity 2 State Staff and Expenses',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/state-costs',
    fieldDescription: 'Provide an annual cost.'
  },
  {
    section: 'Activity 2 Private Contractor Costs',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/contractor-costs',
    fieldDescription: 'Must select hourly or yearly.'
  },
  {
    section: 'Activity 2 Budget and FFP',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/ffp',
    fieldDescription: 'Select a federal-state split.'
  },
  {
    section: 'Proposed Budget',
    link: '/apd/632a0fbc5665670a34b3bbd7/proposed-budget',
    fieldDescription:
      'Provide a whole number greater than or equal to $0. Decimals will be rounded to the closest number.'
  },
  {
    section: 'Proposed Budget',
    link: '/apd/632a0fbc5665670a34b3bbd7/proposed-budget',
    fieldDescription:
      'Provide a whole number greater than or equal to $0. Decimals will be rounded to the closest number.'
  },
  {
    section: 'Assurances and Compliance',
    link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
    fieldDescription: 'Select yes or no'
  },
  {
    section: 'Assurances and Compliance',
    link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
    fieldDescription: 'Provide an explanation'
  }
];

const expectedErrorsMockMmisApdRandom = [
  {
    section: 'APD Overview',
    link: '/apd/632a0fbc5665670a34b3bbd7/apd-overview',
    fieldDescription: 'Provide another Medicaid Business Area(s)'
  },
  {
    section: 'Key State Personnel',
    link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
    fieldDescription: 'Provide the name of the State Medicaid Director.'
  },
  {
    section: 'Key State Personnel',
    link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
    fieldDescription: 'Provide a zip code.'
  },
  {
    section: 'Key State Personnel',
    link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
    fieldDescription: 'Provide a role for the point of contact.'
  },
  {
    section: 'State Priorities and Scope',
    link: '/apd/632a0fbc5665670a34b3bbd7/priorities-scope',
    fieldDescription: 'Provide Medicaid Program and Priorities'
  },
  {
    section: 'Activity 1 Activity Overview',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/overview',
    fieldDescription: 'Provide an Activity Snapshot'
  },
  {
    section: 'Activity 1 Conditions for Enhanced Funding',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/enhanced-funding',
    fieldDescription: 'Provide an Enhanced Funding Justification'
  },
  {
    section: 'Activity 1 Outcomes and Milestones',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/oms',
    fieldDescription: 'Metric is required'
  },
  {
    section: 'Activity 1 State Staff and Expenses',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/state-costs',
    fieldDescription: 'Please provide a FTE cost greater than or equal to $0.'
  },
  {
    section: 'Activity 1 Private Contractor Costs',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
    fieldDescription: 'Must select hourly or yearly.'
  },
  {
    section: 'Activity 1 Budget and FFP',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/ffp',
    fieldDescription: 'Select a federal-state split.'
  },
  {
    section: 'Activity 2 Outcomes and Milestones',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/oms',
    fieldDescription: 'Metric is required'
  },
  {
    section: 'Activity 2 State Staff and Expenses',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/state-costs',
    fieldDescription: 'Please provide a FTE cost greater than or equal to $0.'
  },
  {
    section: 'Activity 2 State Staff and Expenses',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/state-costs',
    fieldDescription: 'Provide an annual cost.'
  },
  {
    section: 'Activity 2 Private Contractor Costs',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/contractor-costs',
    fieldDescription: 'Must select hourly or yearly.'
  },
  {
    section: 'Activity 2 Budget and FFP',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/ffp',
    fieldDescription: 'Select a federal-state split.'
  },
  {
    section: 'Security Planning',
    link: '/apd/632a0fbc5665670a34b3bbd7/security-planning',
    fieldDescription: 'Provide Security and Interface Plan'
  },
  {
    section: 'Assurances and Compliance',
    link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
    fieldDescription: 'Select yes or no'
  },
  {
    section: 'Assurances and Compliance',
    link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
    fieldDescription: 'Provide an explanation'
  }
];

const { adminCheckApd } = require('./adminCheck');

tap.test('HITECH apd document admin check', async hitechValidationTests => {
  hitechValidationTests.test(
    'test a valid HITECH apd document returns no errors',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.HITECH,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validHitechApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validHitechActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validHitechAssurancesAndCompliances
      });
      test.same(results, []);
    }
  );

  hitechValidationTests.test(
    'test a HITECH apd with invalid apdOverview',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.HITECH,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: invalidHitechApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validHitechActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validHitechAssurancesAndCompliances
      });
      // Only expecting HIT to be required since that's the validHitechActivity's fundingSource
      test.same(results, [
        {
          section: 'APD Overview',
          link: '/apd/632a0fbc5665670a34b3bbd7/apd-overview',
          fieldDescription: 'Select yes or no'
        },
        {
          section: 'APD Overview',
          link: '/apd/632a0fbc5665670a34b3bbd7/apd-overview',
          fieldDescription: 'Provide a brief introduction to the state program.'
        },
        {
          section: 'APD Overview',
          link: '/apd/632a0fbc5665670a34b3bbd7/apd-overview',
          fieldDescription: 'Provide a summary of HIT-funded activities.'
        }
      ]);
    }
  );

  hitechValidationTests.test(
    'test a HITECH apd with invalid keyStatePersonnel',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.HITECH,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validHitechApdOverview,
        keyStatePersonnel: invalidKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validHitechActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validHitechAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'Key State Personnel',
          link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
          fieldDescription: 'Provide the name of the State Medicaid Director.'
        },
        {
          section: 'Key State Personnel',
          link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
          fieldDescription: 'Provide a name for the point of contact.'
        }
      ]);
    }
  );

  hitechValidationTests.test(
    'test a HITECH apd with invalid activity',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.HITECH,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validHitechApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [invalidHitechActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validHitechAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'APD Overview',
          link: '/apd/632a0fbc5665670a34b3bbd7/apd-overview',
          fieldDescription: 'Funding sources are required'
        },
        {
          section: 'Activity 1 Activity Overview',
          link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/overview',
          fieldDescription: 'Select a Program Type'
        },
        {
          section: 'Activity 1 State Staff and Expenses',
          link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/state-costs',
          fieldDescription: 'Provide a personnel description.'
        },
        {
          section: 'Activity 1 Private Contractor Costs',
          link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
          fieldDescription:
            'Provide a procurement methodology and description of services.'
        },
        {
          section: 'Activity 1 Private Contractor Costs',
          link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
          fieldDescription: 'Provide an end date.'
        },
        {
          section: 'Activity 1 Private Contractor Costs',
          link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
          fieldDescription: 'Must select hourly or yearly.'
        }
      ]);
    }
  );

  hitechValidationTests.test(
    'test a HITECH apd with invalid proposedBudget',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.HITECH,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validHitechApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validHitechActivity],
        proposedBudget: invalidProposedBudget,
        assurancesAndCompliances: validHitechAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'Proposed Budget',
          link: '/apd/632a0fbc5665670a34b3bbd7/proposed-budget',
          fieldDescription:
            'Provide a whole number greater than or equal to $0. Decimals will be rounded to the closest number.'
        },
        {
          section: 'Proposed Budget',
          link: '/apd/632a0fbc5665670a34b3bbd7/proposed-budget',
          fieldDescription:
            'Provide a whole number greater than or equal to $0. Decimals will be rounded to the closest number.'
        },
        {
          section: 'Proposed Budget',
          link: '/apd/632a0fbc5665670a34b3bbd7/proposed-budget',
          fieldDescription:
            'Provide a whole number greater than or equal to $0. Decimals will be rounded to the closest number.'
        }
      ]);
    }
  );

  hitechValidationTests.test(
    'test a HITECH apd with invalid AssurancesAndCompliances',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.HITECH,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validHitechApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validHitechActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: invalidHitechAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'Assurances and Compliance',
          link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
          fieldDescription: 'Provide an explanation'
        },
        {
          section: 'Assurances and Compliance',
          link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
          fieldDescription: 'Provide an explanation'
        },
        {
          section: 'Assurances and Compliance',
          link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
          fieldDescription: 'Select yes or no'
        }
      ]);
    }
  );

  hitechValidationTests.test(
    'test a HITECH apd with no activities',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.HITECH,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validHitechApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validHitechAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'Activities',
          link: '/apd/632a0fbc5665670a34b3bbd7/activities',
          fieldDescription: 'Activities have not been added for this APD.'
        }
      ]);
    }
  );

  hitechValidationTests.test(
    'test cost allocation other funding description validates conditionally based on the cost allocation other amount',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.HITECH,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validHitechApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [invalidHitechActivityCostAllocationOther],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validHitechAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'Activity 1 Cost Allocation',
          link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/cost-allocation',
          fieldDescription: 'Provide a description of other funding.'
        }
      ]);
    }
  );

  hitechValidationTests.test(
    'test an invalid HITECH apd returns expected errors',
    async test => {
      const results = adminCheckApd(mockHitechApdRandomInvalid);
      test.same(results, expectedErrorsMockHitechApdRandom);
    }
  );
});

tap.test('MMIS apd document admin check', async mmisValidationTests => {
  mmisValidationTests.test(
    'test a valid MMIS apd document returns no errors',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.MMIS,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validMmisApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        statePrioritiesAndScope: validStatePrioritiesAndScope,
        previousActivities: validPreviousActivities,
        activities: [validMmisActivity],
        securityPlanning: validSecurityPlanning,
        assurancesAndCompliances: validMmisAssurancesAndCompliances
      });
      test.same(results, []);
    }
  );

  mmisValidationTests.test(
    'test a MMIS apd with invalid apdOverview',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.MMIS,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: invalidMmisApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        statePrioritiesAndScope: validStatePrioritiesAndScope,
        previousActivities: validPreviousActivities,
        activities: [validMmisActivity],
        securityPlanning: validSecurityPlanning,
        assurancesAndCompliances: validMmisAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'APD Overview',
          link: '/apd/632a0fbc5665670a34b3bbd7/apd-overview',
          fieldDescription: 'Select yes or no'
        }
      ]);
    }
  );

  mmisValidationTests.test(
    'test a MMIS apd with invalid keyStatePersonnel',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.MMIS,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validMmisApdOverview,
        keyStatePersonnel: invalidKeyStatePersonnel,
        statePrioritiesAndScope: validStatePrioritiesAndScope,
        previousActivities: validPreviousActivities,
        activities: [validMmisActivity],
        securityPlanning: validSecurityPlanning,
        assurancesAndCompliances: validMmisAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'Key State Personnel',
          link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
          fieldDescription: 'Provide the name of the State Medicaid Director.'
        },
        {
          section: 'Key State Personnel',
          link: '/apd/632a0fbc5665670a34b3bbd7/state-profile',
          fieldDescription: 'Provide a name for the point of contact.'
        }
      ]);
    }
  );

  mmisValidationTests.test(
    'test a MMIS with invalid state priorities and scope',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.MMIS,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validMmisApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        statePrioritiesAndScope: invalidStatePrioritiesAndScope,
        previousActivities: validPreviousActivities,
        activities: [validMmisActivity],
        securityPlanning: validSecurityPlanning,
        assurancesAndCompliances: validMmisAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'State Priorities and Scope',
          link: '/apd/632a0fbc5665670a34b3bbd7/priorities-scope',
          fieldDescription: 'Provide a Medicaid Enterprise System Introduction'
        }
      ]);
    }
  );

  mmisValidationTests.test('test a MMIS with invalid activity', async test => {
    const results = adminCheckApd({
      _id: '632a0fbc5665670a34b3bbd7',
      apdType: APD_TYPE.MMIS,
      name: 'Test APD',
      years: ['2022', '2023'],
      apdOverview: validMmisApdOverview,
      keyStatePersonnel: validKeyStatePersonnel,
      statePrioritiesAndScope: validStatePrioritiesAndScope,
      previousActivities: validPreviousActivities,
      activities: [invalidMmisActivity],
      securityPlanning: validSecurityPlanning,
      assurancesAndCompliances: validMmisAssurancesAndCompliances
    });
    test.same(results, [
      {
        section: 'Activity 1 Activity Overview',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/overview',
        fieldDescription: 'Provide an Activity Name'
      },
      {
        section: 'Activity 1 Activity Overview',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/overview',
        fieldDescription: 'Provide a Problem Statement'
      },
      {
        section: 'Activity 1 Conditions for Enhanced Funding',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/enhanced-funding',
        fieldDescription: 'Provide an Enhanced Funding Justification'
      },
      {
        section: 'Activity 1 State Staff and Expenses',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/state-costs',
        fieldDescription: 'Provide a personnel description.'
      },
      {
        section: 'Activity 1 Private Contractor Costs',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
        fieldDescription:
          'Provide a procurement methodology and description of services.'
      },
      {
        section: 'Activity 1 Private Contractor Costs',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
        fieldDescription: 'Provide an end date.'
      },
      {
        section: 'Activity 1 Private Contractor Costs',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/contractor-costs',
        fieldDescription: 'Must select hourly or yearly.'
      }
    ]);
  });

  mmisValidationTests.test(
    'test a MMIS with invalid securityPlanning',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.MMIS,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validMmisApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        statePrioritiesAndScope: validStatePrioritiesAndScope,
        previousActivities: validPreviousActivities,
        activities: [validMmisActivity],
        securityPlanning: invalidSecurityPlanning,
        assurancesAndCompliances: validMmisAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'Security Planning',
          link: '/apd/632a0fbc5665670a34b3bbd7/security-planning',
          fieldDescription: 'Provide Business Continuity and Disaster Recovery'
        }
      ]);
    }
  );

  mmisValidationTests.test(
    'test an MMIS apd with invalid AssurancesAndCompliances',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        apdType: APD_TYPE.MMIS,
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validMmisApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        statePrioritiesAndScope: validStatePrioritiesAndScope,
        previousActivities: validPreviousActivities,
        activities: [validMmisActivity],
        securityPlanning: validSecurityPlanning,
        assurancesAndCompliances: invalidMmisAssurancesAndCompliances
      });
      test.same(results, [
        {
          section: 'Assurances and Compliance',
          link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
          fieldDescription: 'Provide an explanation'
        },
        {
          section: 'Assurances and Compliance',
          link: '/apd/632a0fbc5665670a34b3bbd7/assurances-and-compliance',
          fieldDescription: 'Select yes or no'
        }
      ]);
    }
  );

  mmisValidationTests.test(
    'test an invalid MMIS apd returns expected errors',
    async test => {
      const results = adminCheckApd(mockMmisApdRandomInvalid);
      test.same(results, expectedErrorsMockMmisApdRandom);
    }
  );
});
