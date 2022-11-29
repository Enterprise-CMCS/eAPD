import tap from 'tap';
import adminCheckApd from './adminCheck.js';

const validApdOverview = {
  programOverview: 'abc',
  narrativeHIT: 'abc',
  narrativeHIE: 'abc',
  narrativeMMIS: 'abc'
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
  alternatives: 'abc',
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
  description: 'abc',
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
      outcome: 'Provide support to EPs and EHs through attestation process.',
      metrics: [
        { metric: "Guidance available on Tycho''s websites" },
        { metric: 'Office hours availble for EPs and EHs' },
        { metric: 'Site visits, as needed, for EPs and EHs' }
      ]
    }
  ],
  name: 'Program Administration',
  plannedEndDate: '2023-09-30',
  plannedStartDate: '2021-09-30',
  schedule: [
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

const validAssurancesAndCompliances = {
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

const invalidApdOverview = {
  programOverview: '',
  narrativeHIT: '',
  narrativeHIE: '',
  narrativeMMIS: ''
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

const invalidActivity = {
  alternatives: 'abc',
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
  description: 'abc',
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
  fundingSource: '',
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
  name: 'Program Administration',
  plannedEndDate: '2023-09-30',
  plannedStartDate: '2021-09-30',
  schedule: [
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
  standardsAndConditions: {
    doesNotSupport: '',
    supports:
      '<p class="p1"><span class="s1">We will comply with standards and conditions</span></p>'
  },
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
};

const invalidActivityCostAllocationOther = {
  alternatives: 'abc',
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
  description: 'abc',
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
      outcome: 'Provide support to EPs and EHs through attestation process.',
      metrics: [
        { metric: "Guidance available on Tycho''s websites" },
        { metric: 'Office hours availble for EPs and EHs' },
        { metric: 'Site visits, as needed, for EPs and EHs' }
      ]
    }
  ],
  name: 'Program Administration',
  plannedEndDate: '2023-09-30',
  plannedStartDate: '2021-09-30',
  schedule: [
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

const invalidAssurancesAndCompliances = {
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

const mockApdRandomInvalid = {
  _id: '632a0fbc5665670a34b3bbd7',
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
      alternatives: 'abc',
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
      description: 'abc',
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
      fundingSource: 'HIT',
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
      name: 'Program Administration',
      plannedEndDate: '2023-09-30',
      plannedStartDate: '2021-09-30',
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
      alternatives: 'abc',
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
      description: 'abc',
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
      fundingSource: 'HIT',
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
      name: 'Program Administration',
      plannedEndDate: '2023-09-30',
      plannedStartDate: '2021-09-30',
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
        checked: true,
        explanation: ''
      }
    ]
  }
};

const expectedErrorsMockApdRandom = [
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
    section: 'Activity 2 State Staff and Expenses',
    link: '/apd/632a0fbc5665670a34b3bbd7/activity/1/state-costs',
    fieldDescription: 'Provide an annual cost.'
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
  }
];

tap.test('apd document admin check', async apdValidationTests => {
  apdValidationTests.test(
    'test a valid apd document returns no errors',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validAssurancesAndCompliances
      });
      test.same(results, []);
    }
  );

  apdValidationTests.test(
    'test an apd with invalid apdOverview',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: invalidApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validAssurancesAndCompliances
      });
      // Only expecting HIT to be required since that's the validActivity's fundingSource
      test.same(results, [
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

  apdValidationTests.test(
    'test an apd with invalid invalidKeyStatePersonnel',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validApdOverview,
        keyStatePersonnel: invalidKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validAssurancesAndCompliances
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

  apdValidationTests.test('test an apd with invalid activity', async test => {
    const results = adminCheckApd({
      _id: '632a0fbc5665670a34b3bbd7',
      name: 'Test APD',
      years: ['2022', '2023'],
      apdOverview: validApdOverview,
      keyStatePersonnel: validKeyStatePersonnel,
      previousActivities: validPreviousActivities,
      activities: [invalidActivity],
      proposedBudget: validProposedBudget,
      assurancesAndCompliances: validAssurancesAndCompliances
    });
    test.same(results, [
      {
        section: 'APD Overview',
        link: '/apd/632a0fbc5665670a34b3bbd7/apd-overview',
        fieldDescription: 'Funding sources are required'
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
      },
      {
        section: 'Activity 1 Activity Overview',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/overview',
        fieldDescription: 'Must select program type.'
      },
      {
        section: 'Activity 1 State Staff and Expenses',
        link: '/apd/632a0fbc5665670a34b3bbd7/activity/0/state-costs',
        fieldDescription: 'Provide a personnel description.'
      }
    ]);
  });

  apdValidationTests.test(
    'test an apd with invalid invalidProposedBudget',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validActivity],
        proposedBudget: invalidProposedBudget,
        assurancesAndCompliances: validAssurancesAndCompliances
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

  apdValidationTests.test(
    'test an apd with invalid invalidAssurancesAndCompliances',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [validActivity],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: invalidAssurancesAndCompliances
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

  apdValidationTests.test('test an apd with no activities', async test => {
    const results = adminCheckApd({
      _id: '632a0fbc5665670a34b3bbd7',
      name: 'Test APD',
      years: ['2022', '2023'],
      apdOverview: validApdOverview,
      keyStatePersonnel: validKeyStatePersonnel,
      previousActivities: validPreviousActivities,
      activities: [],
      proposedBudget: validProposedBudget,
      assurancesAndCompliances: validAssurancesAndCompliances
    });
    test.same(results, [
      {
        section: 'Activities',
        link: '/apd/632a0fbc5665670a34b3bbd7/activities',
        fieldDescription: 'Activities have not been added for this APD.'
      }
    ]);
  });

  apdValidationTests.test(
    'test cost allocation other funding descrption validates conditionally based on the cost allocation other amount',
    async test => {
      const results = adminCheckApd({
        _id: '632a0fbc5665670a34b3bbd7',
        name: 'Test APD',
        years: ['2022', '2023'],
        apdOverview: validApdOverview,
        keyStatePersonnel: validKeyStatePersonnel,
        previousActivities: validPreviousActivities,
        activities: [invalidActivityCostAllocationOther],
        proposedBudget: validProposedBudget,
        assurancesAndCompliances: validAssurancesAndCompliances
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

  apdValidationTests.test(
    'test an invalid apd returns expected errors',
    async test => {
      const results = adminCheckApd(mockApdRandomInvalid);
      test.same(results, expectedErrorsMockApdRandom);
    }
  );
});
