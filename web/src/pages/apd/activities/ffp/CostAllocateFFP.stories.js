import React from 'react';
import CostAllocateFFP from './CostAllocateFFP';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProvider } from 'apd-storybook-library';
import { APD_TYPE, FUNDING_CATEGORY_TYPE } from '@cms-eapd/common';

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

const apdTwoYearsEmpty = {
  data: {
    id: '63dd7bff09f7e000e87e41e8',
    state: 'ak',
    keyStatePersonnel: {
      keyPersonnel: []
    },
    years: ['2023', '2024'],
    yearOptions: ['2023', '2024', '2025'],
    activities: [
      {
        id: null,
        key: '5caaaf1c',
        activityId: '5caaaf1c',
        name: 'Program Administration',
        milestones: [],
        outcomes: [],
        statePersonnel: [],
        expenses: [],
        contractorResources: []
      }
    ]
  },
  byId: {}
};

const apdTwoYears = {
  data: {
    id: '63dd7bff09f7e000e87e41e8',
    state: 'ak',
    keyStatePersonnel: {
      keyPersonnel: [
        {
          costs: {
            2023: 25000,
            2024: 30000
          },
          email: 'tshelby@email.com',
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
              state: 10,
              fundingCategory: 'DDI'
            },
            2024: {
              federal: 90,
              state: 10,
              fundingCategory: 'DDI'
            }
          },
          medicaidShare: {
            2023: 0,
            2024: 0
          },
          name: 'Tommy Shelby',
          position: 'Program Manager',
          key: 'cf40591e'
        },
        {
          costs: {
            2023: 32000,
            2024: 25000
          },
          email: 'pshelby@email.com',
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
              state: 10,
              fundingCategory: 'DDI'
            },
            2024: {
              federal: 90,
              state: 10,
              fundingCategory: 'DDI'
            }
          },
          medicaidShare: {
            2023: 0,
            2024: 0
          },
          name: 'Polly Shelby',
          position: 'Director',
          key: '99227dde'
        }
      ]
    },
    years: ['2023', '2024'],
    yearOptions: ['2023', '2024', '2025'],
    activities: [
      {
        id: null,
        key: '5caaaf1c',
        activityId: '5caaaf1c',
        name: 'Program Administration',
        milestones: [],
        outcomes: [],
        statePersonnel: [
          {
            key: '248bce2b',
            title: 'Developers',
            description: 'Developers to create application',
            years: {
              2023: {
                amt: 80000,
                perc: 4
              },
              2024: {
                amt: 75000,
                perc: 4
              }
            }
          }
        ],
        expenses: [
          {
            key: 'acf30831',
            category: 'Hardware, software, and licensing',
            description: 'Licensing for development',
            years: {
              2023: 400,
              2024: 500
            }
          }
        ],
        contractorResources: [
          {
            key: '17d5d484',
            name: 'The Contractors',
            description: '<p>Contractors working on the new software</p>',
            start: '2023-12-12',
            end: '2024-12-12',
            files: [],
            totalCost: 9500,
            years: {
              2023: 2500,
              2024: 4500
            },
            useHourly: true,
            hourly: {
              2023: {
                hours: 100,
                rate: 25
              },
              2024: {
                hours: 150,
                rate: 30
              }
            }
          },
          {
            key: '34041b84',
            name: 'The Other Guys',
            description: '<p>Subcontracting team</p>',
            start: '2022-12-12',
            end: '2023-12-12',
            files: [],
            totalCost: 15000,
            years: {
              2023: 5000,
              2024: 5000
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
};

const apdOneYear = {
  data: {
    id: '63dd7bff09f7e000e87e41e8',
    state: 'ak',
    keyStatePersonnel: {
      keyPersonnel: [
        {
          costs: {
            2023: 25000
          },
          email: 'tshelby@email.com',
          expanded: true,
          hasCosts: true,
          isPrimary: true,
          fte: {
            2023: 0.5
          },
          split: {
            2023: {
              federal: 90,
              state: 10,
              fundingCategory: 'DDI'
            }
          },
          medicaidShare: {
            2023: 0
          },
          name: 'Tommy Shelby',
          position: 'Program Manager',
          key: 'cf40591e'
        },
        {
          costs: {
            2023: 32000
          },
          email: 'pshelby@email.com',
          expanded: true,
          hasCosts: true,
          isPrimary: false,
          fte: {
            2023: 0.5
          },
          split: {
            2023: {
              federal: 90,
              state: 10,
              fundingCategory: 'DDI'
            }
          },
          medicaidShare: {
            2023: 0
          },
          name: 'Polly Shelby',
          position: 'Director',
          key: '99227dde'
        }
      ]
    },
    years: ['2023'],
    yearOptions: ['2023', '2024', '2025'],
    activities: [
      {
        id: null,
        key: '5caaaf1c',
        activityId: '5caaaf1c',
        name: 'Program Administration',
        costAllocation: {
          2023: {
            ffp: {
              federal: 0,
              state: 100,
              fundingCategory: null
            },
            other: 0
          }
        },
        milestones: [],
        outcomes: [],
        statePersonnel: [
          {
            key: '248bce2b',
            title: 'Developers',
            description: 'Developers to create application',
            years: {
              2023: {
                amt: 80000,
                perc: 4
              }
            }
          }
        ],
        expenses: [
          {
            key: 'acf30831',
            category: 'Hardware, software, and licensing',
            description: 'Licensing for development',
            years: {
              2023: 400
            }
          }
        ],
        contractorResources: [
          {
            key: '17d5d484',
            name: 'The Contractors',
            description: '<p>Contractors working on the new software</p>',
            start: '2023-12-12',
            end: '2024-12-12',
            files: [],
            totalCost: 9500,
            years: {
              2023: 2500
            },
            useHourly: true,
            hourly: {
              2023: {
                hours: 100,
                rate: 25
              }
            }
          },
          {
            key: '34041b84',
            name: 'The Other Guys',
            description: '<p>Subcontracting team</p>',
            start: '2022-12-12',
            end: '2023-12-12',
            files: [],
            totalCost: 15000,
            years: {
              2023: 5000
            },
            useHourly: false,
            hourly: {
              2023: {
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
};

const user = {
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
};

const Template = args => <CostAllocateFFP {...args} />;

export const Hitech0100CostAllocateFFPStory = Template.bind({});
Hitech0100CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdTwoYears,
          data: {
            ...apdTwoYears.data,
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                ...apdTwoYears.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  },
                  2024: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 356400,
                  2024: 337500,
                  total: 693900
                },
                contractors: {
                  2023: 7500,
                  2024: 9500,
                  total: 17000
                },
                expenses: {
                  2023: 400,
                  2024: 500,
                  total: 900
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  2024: 327500,
                  total: 676000
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 0,
                  medicaid: 356400,
                  state: 356400,
                  total: 356400
                },
                2024: {
                  federal: 0,
                  medicaid: 337500,
                  state: 337500,
                  total: 337500
                },
                total: {
                  federal: 0,
                  medicaid: 693900,
                  state: 693900,
                  total: 693900
                }
              }
            }
          },
          years: ['2023', '2024']
        },
        user
      },
      story
    })
];

export const Hitech9010CostAllocateFFPStory = Template.bind({});
Hitech9010CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 90,
                      state: 10,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 320760,
                  medicaid: 356400,
                  state: 35640,
                  total: 356400
                },
                total: {
                  federal: 320760,
                  medicaid: 356400,
                  state: 35640,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const Hitech7525CostAllocateFFPStory = Template.bind({});
Hitech7525CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 75,
                      state: 25,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 267300,
                  medicaid: 356400,
                  state: 89100,
                  total: 356400
                },
                total: {
                  federal: 267300,
                  medicaid: 356400,
                  state: 89100,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const Hitech5050CostAllocateFFPStory = Template.bind({});
Hitech5050CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 50,
                      state: 50,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                },
                total: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const HitechNoOtherFundingCostAllocateFFPStory = Template.bind({});
HitechNoOtherFundingCostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 50,
                      state: 50,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                },
                total: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const ErrorHitechCostAllocateFFPStory = Template.bind({});
ErrorHitechCostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdTwoYears,
          data: {
            ...apdTwoYears.data,
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                ...apdTwoYears.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  },
                  2024: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          },
          adminCheck: {
            enabled: true
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 356400,
                  2024: 337500,
                  total: 693900
                },
                contractors: {
                  2023: 7500,
                  2024: 9500,
                  total: 17000
                },
                expenses: {
                  2023: 400,
                  2024: 500,
                  total: 900
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  2024: 327500,
                  total: 676000
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 0,
                  medicaid: 356400,
                  state: 356400,
                  total: 356400
                },
                2024: {
                  federal: 0,
                  medicaid: 337500,
                  state: 337500,
                  total: 337500
                },
                total: {
                  federal: 0,
                  medicaid: 693900,
                  state: 693900,
                  total: 693900
                }
              }
            }
          },
          years: ['2023', '2024']
        },
        user
      },
      story
    })
];

export const Mmis0100CostAllocateFFPStory = Template.bind({});
Mmis0100CostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=601%3A12578&t=kQLtdXv0QLAfe7eb-1'
  }
};
Mmis0100CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdTwoYears,
          data: {
            ...apdTwoYears.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdTwoYears.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  },
                  2024: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: '',
              fundingSource: null,
              data: {
                combined: {
                  2023: 327900,
                  2024: 310000,
                  total: 637900
                },
                contractors: {
                  2023: 7500,
                  2024: 9500,
                  total: 17000
                },
                expenses: {
                  2023: 400,
                  2024: 500,
                  total: 900
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 320000,
                  2024: 300000,
                  total: 620000
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 0,
                  medicaid: 327900,
                  state: 327900,
                  total: 327900
                },
                2024: {
                  federal: 0,
                  medicaid: 310000,
                  state: 310000,
                  total: 310000
                },
                total: {
                  federal: 0,
                  medicaid: 637900,
                  state: 637900,
                  total: 637900
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const Mmis9010CostAllocateFFPStory = Template.bind({});
Mmis9010CostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A18041&t=59IHBhQMA8GUYsUh-1'
  }
};
Mmis9010CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 90,
                      state: 10,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: '',
              fundingSource: null,
              data: {
                combined: {
                  2023: 327900,
                  total: 328400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 900
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 320000,
                  total: 320000
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 295110,
                  medicaid: 327900,
                  state: 32790,
                  total: 327900
                },
                total: {
                  federal: 295110,
                  medicaid: 327900,
                  state: 32790,
                  total: 327900
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const Mmis7525CostAllocateFFPStory = Template.bind({});
Mmis7525CostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A17681&t=59IHBhQMA8GUYsUh-1'
  }
};
Mmis7525CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 75,
                      state: 25,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: '',
              fundingSource: null,
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 267300,
                  medicaid: 356400,
                  state: 89100,
                  total: 356400
                },
                total: {
                  federal: 267300,
                  medicaid: 356400,
                  state: 89100,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const Mmis5050CostAllocateFFPStory = Template.bind({});
Mmis5050CostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A18378&t=59IHBhQMA8GUYsUh-1'
  }
};
Mmis5050CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 50,
                      state: 50,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: '',
              fundingSource: null,
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                },
                total: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const MmisNoOtherFundingCostAllocateFFPStory = Template.bind({});
MmisNoOtherFundingCostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A18378&t=59IHBhQMA8GUYsUh-1'
  }
};
MmisNoOtherFundingCostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 50,
                      state: 50,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: '',
              fundingSource: null,
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                },
                total: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const ErrorMmis0100CostAllocateFFPStory = Template.bind({});
ErrorMmis0100CostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A17365&t=bYwei0FSqJHDsgkT-1'
  }
};
ErrorMmis0100CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdTwoYears,
          data: {
            ...apdTwoYears.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdTwoYears.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  },
                  2024: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          },
          adminCheck: {
            enabled: true
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: '',
              fundingSource: null,
              data: {
                combined: {
                  2023: 327900,
                  2024: 310000,
                  total: 637900
                },
                contractors: {
                  2023: 7500,
                  2024: 9500,
                  total: 17000
                },
                expenses: {
                  2023: 400,
                  2024: 500,
                  total: 900
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 320000,
                  2024: 300000,
                  total: 620000
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 0,
                  medicaid: 327900,
                  state: 327900,
                  total: 327900
                },
                2024: {
                  federal: 0,
                  medicaid: 310000,
                  state: 310000,
                  total: 310000
                },
                total: {
                  federal: 0,
                  medicaid: 637900,
                  state: 637900,
                  total: 637900
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const ErrorMmis7525CostAllocateFFPStory = Template.bind({});
ErrorMmis7525CostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A17365&t=bYwei0FSqJHDsgkT-1'
  }
};
ErrorMmis7525CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 75,
                      state: 25,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          },
          adminCheck: {
            enabled: true
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: '',
              fundingSource: null,
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 267300,
                  medicaid: 356400,
                  state: 89100,
                  total: 356400
                },
                total: {
                  federal: 267300,
                  medicaid: 356400,
                  state: 89100,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const ErrorMmis5050CostAllocateFFPStory = Template.bind({});
ErrorMmis5050CostAllocateFFPStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2281%3A17365&t=bYwei0FSqJHDsgkT-1'
  }
};
ErrorMmis5050CostAllocateFFPStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdOneYear,
          data: {
            ...apdOneYear.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdOneYear.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 50,
                      state: 50,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          },
          adminCheck: {
            enabled: true
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: '',
              fundingSource: null,
              data: {
                combined: {
                  2023: 356400,
                  total: 356400
                },
                contractors: {
                  2023: 7500,
                  total: 7500
                },
                expenses: {
                  2023: 400,
                  total: 400
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  total: 348500
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                },
                total: {
                  federal: 178200,
                  medicaid: 356400,
                  state: 178200,
                  total: 356400
                }
              }
            }
          }
        },
        user
      },
      story
    })
];

export const ReadOnlyEmptyHitechCostAllocateFfpStory = Template.bind({});
ReadOnlyEmptyHitechCostAllocateFfpStory.args = {
  isViewOnly: true
};
ReadOnlyEmptyHitechCostAllocateFfpStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdTwoYearsEmpty,
          data: {
            ...apdTwoYearsEmpty.data,
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                ...apdTwoYearsEmpty.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  },
                  2024: {
                    ffp: {
                      federal: 0,
                      state: 100,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 0,
                  2024: 0,
                  total: 0
                },
                contractors: {
                  2023: 0,
                  2024: 0,
                  total: 0
                },
                expenses: {
                  2023: 0,
                  2024: 0,
                  total: 0
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 0,
                  2024: 0,
                  total: 0
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 0,
                  medicaid: 0,
                  state: 0,
                  total: 0
                },
                2024: {
                  federal: 0,
                  medicaid: 0,
                  state: 0,
                  total: 0
                },
                total: {
                  federal: 0,
                  medicaid: 0,
                  state: 0,
                  total: 0
                }
              }
            }
          },
          years: ['2023', '2024']
        },
        user
      },
      story
    })
];

export const ReadOnlyEmptyMmisCostAllocateFfpStory = Template.bind({});
ReadOnlyEmptyMmisCostAllocateFfpStory.args = {
  isViewOnly: true
};
ReadOnlyEmptyMmisCostAllocateFfpStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=4185%3A19804&t=7Ty8nZjJ3Woq2nJt-1'
  }
};
ReadOnlyEmptyMmisCostAllocateFfpStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdTwoYearsEmpty,
          data: {
            ...apdTwoYearsEmpty.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdTwoYearsEmpty.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 90,
                      state: 10,
                      fundingCategory: APD_TYPE.HITECH
                    },
                    other: 0
                  },
                  2024: {
                    ffp: {
                      federal: 75,
                      state: 25,
                      fundingCategory: APD_TYPE.MANDO
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 0,
                  2024: 0,
                  total: 0
                },
                contractors: {
                  2023: 0,
                  2024: 0,
                  total: 0
                },
                expenses: {
                  2023: 0,
                  2024: 0,
                  total: 0
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 0,
                  2024: 0,
                  total: 0
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 0,
                  medicaid: 0,
                  state: 0,
                  total: 0
                },
                2024: {
                  federal: 0,
                  medicaid: 0,
                  state: 0,
                  total: 0
                },
                total: {
                  federal: 0,
                  medicaid: 0,
                  state: 0,
                  total: 0
                }
              }
            }
          },
          years: ['2023', '2024']
        },
        user
      },
      story
    })
];

export const ReadOnlyDataHitechCostAllocateFfpStory = Template.bind({});
ReadOnlyDataHitechCostAllocateFfpStory.args = {
  isViewOnly: true
};
ReadOnlyDataHitechCostAllocateFfpStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdTwoYears,
          data: {
            ...apdTwoYears.data,
            apdType: APD_TYPE.HITECH,
            activities: [
              {
                ...apdTwoYears.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 90,
                      state: 10,
                      fundingCategory: null
                    },
                    other: 0
                  },
                  2024: {
                    ffp: {
                      federal: 90,
                      state: 10,
                      fundingCategory: null
                    },
                    other: 0
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 356400,
                  2024: 337500,
                  total: 693900
                },
                contractors: {
                  2023: 7500,
                  2024: 9500,
                  total: 17000
                },
                expenses: {
                  2023: 400,
                  2024: 500,
                  total: 900
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  2024: 327500,
                  total: 676000
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 0,
                  medicaid: 356400,
                  state: 356400,
                  total: 356400
                },
                2024: {
                  federal: 0,
                  medicaid: 337500,
                  state: 337500,
                  total: 337500
                },
                total: {
                  federal: 0,
                  medicaid: 693900,
                  state: 693900,
                  total: 693900
                }
              }
            }
          },
          years: ['2023', '2024']
        },
        user
      },
      story
    })
];

export const ReadOnlyDataMmisCostAllocateFfpStory = Template.bind({});
ReadOnlyDataMmisCostAllocateFfpStory.args = {
  isViewOnly: true
};
ReadOnlyDataMmisCostAllocateFfpStory.paramters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=4181%3A19630&t=dlil2Cb95kKIKRmP-1'
  }
};
ReadOnlyDataMmisCostAllocateFfpStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          ...apdTwoYears,
          data: {
            ...apdTwoYears.data,
            apdType: APD_TYPE.MMIS,
            activities: [
              {
                ...apdTwoYears.data.activities[0],
                costAllocation: {
                  2023: {
                    ffp: {
                      federal: 90,
                      state: 10,
                      fundingCategory: FUNDING_CATEGORY_TYPE.DDI
                    },
                    other: 0
                  },
                  2024: {
                    ffp: {
                      federal: 50,
                      state: 50,
                      fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
                    }
                  }
                }
              }
            ]
          }
        },
        budget: {
          activityTotals: [
            {
              id: '5caaaf1c',
              name: 'Program Administration',
              fundingSource: 'HIT',
              data: {
                combined: {
                  2023: 356400,
                  2024: 337500,
                  total: 693900
                },
                contractors: {
                  2023: 7500,
                  2024: 9500,
                  total: 17000
                },
                expenses: {
                  2023: 400,
                  2024: 500,
                  total: 900
                },
                otherFunding: {
                  2023: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  },
                  2024: {
                    contractors: 0,
                    expenses: 0,
                    statePersonnel: 0,
                    total: 0
                  }
                },
                statePersonnel: {
                  2023: 348500,
                  2024: 327500,
                  total: 676000
                }
              }
            }
          ],
          activities: {
            '5caaaf1c': {
              costsByFFY: {
                2023: {
                  federal: 356400,
                  medicaid: 356400,
                  state: 356400,
                  total: 356400
                },
                2024: {
                  federal: 337500,
                  medicaid: 337500,
                  state: 337500,
                  total: 337500
                },
                total: {
                  federal: 693900,
                  medicaid: 693900,
                  state: 693900,
                  total: 693900
                }
              }
            }
          },
          years: ['2023', '2024']
        },
        user
      },
      story
    })
];
