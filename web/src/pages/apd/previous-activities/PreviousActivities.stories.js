import React from 'react';
import PreviousActivities from './PreviousActivities';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProviderAndRouter } from 'apd-storybook-library';
import { APD_TYPE } from '@cms-eapd/common';

export default {
  title: 'Pages/Apd/Previous-Activities',
  component: PreviousActivities,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['PreviousActivities.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const HitechPreviousActivitiesEmpty = {
  previousActivitySummary: '',
  actualExpenditures: {
    2020: {
      hithie: { federalActual: 0, totalApproved: 0 },
      mmis: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 },
        90: { federalActual: 0, totalApproved: 0 }
      }
    },
    2021: {
      hithie: { federalActual: 0, totalApproved: 0 },
      mmis: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 },
        90: { federalActual: 0, totalApproved: 0 }
      }
    },
    2022: {
      hithie: { federalActual: 0, totalApproved: 0 },
      mmis: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 },
        90: { federalActual: 0, totalApproved: 0 }
      }
    }
  }
};

const HitechPreviousActivitiesWithData = {
  previousActivitySummary:
    'This is the previous activity summary for the HITECH seed',
  actualExpenditures: {
    2020: {
      hithie: { federalActual: 100, totalApproved: 90 },
      mmis: {
        50: { federalActual: 560, totalApproved: 8660 },
        75: { federalActual: 4560, totalApproved: 5650 },
        90: { federalActual: 2330, totalApproved: 220 }
      }
    },
    2021: {
      hithie: { federalActual: 1970, totalApproved: 2370 },
      mmis: {
        50: { federalActual: 4960, totalApproved: 4530 },
        75: { federalActual: 40, totalApproved: 7530 },
        90: { federalActual: 680, totalApproved: 9980 }
      }
    },
    2022: {
      hithie: { federalActual: 45640, totalApproved: 86780 },
      mmis: {
        50: { federalActual: 0, totalApproved: 870 },
        75: { federalActual: 4420, totalApproved: 12220 },
        90: { federalActual: 15120, totalApproved: 6630 }
      }
    }
  }
};

const MMISPreviousActivitiesEmpty = {
  previousActivitySummary: '',
  actualExpenditures: {
    2020: {
      ddi: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 },
        90: { federalActual: 0, totalApproved: 0 }
      },
      mando: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 }
      }
    },
    2021: {
      ddi: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 },
        90: { federalActual: 0, totalApproved: 0 }
      },
      mando: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 }
      }
    },
    2022: {
      ddi: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 },
        90: { federalActual: 0, totalApproved: 0 }
      },
      mando: {
        50: { federalActual: 0, totalApproved: 0 },
        75: { federalActual: 0, totalApproved: 0 }
      }
    }
  }
};

const MMISPreviousActivitiesWithData = {
  previousActivitySummary:
    'This is the previous activity summary for the MMIS seed',
  actualExpenditures: {
    2020: {
      ddi: {
        50: { federalActual: 960, totalApproved: 450 },
        75: { federalActual: 74550, totalApproved: 5550 },
        90: { federalActual: 840, totalApproved: 56760 }
      },
      mando: {
        50: { federalActual: 50, totalApproved: 9970 },
        75: { federalActual: 24570, totalApproved: 4450 }
      }
    },
    2021: {
      ddi: {
        50: { federalActual: 740, totalApproved: 3320 },
        75: { federalActual: 2340, totalApproved: 1210 },
        90: { federalActual: 4420, totalApproved: 66430 }
      },
      mando: {
        50: { federalActual: 2670, totalApproved: 4560 },
        75: { federalActual: 8650, totalApproved: 4530 }
      }
    },
    2022: {
      ddi: {
        50: { federalActual: 7840, totalApproved: 4520 },
        75: { federalActual: 1120, totalApproved: 24510 },
        90: { federalActual: 12520, totalApproved: 345660 }
      },
      mando: {
        50: { federalActual: 7340, totalApproved: 34520 },
        75: { federalActual: 73470, totalApproved: 34870 }
      }
    }
  }
};

const nav = {
  apdId: '12345',
  continueLink: {
    label: 'Key State Personnel',
    url: '/apd/12345/executive-summary',
    selected: false
  },
  previousLink: {
    label: 'Activities Dashboard',
    url: '/apd/12345/activities',
    selected: false
  },
  items: []
};

const Template = () => <PreviousActivities />;

export const HitechDefaultPreviousActivitiesStory = Template.bind({});
HitechDefaultPreviousActivitiesStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            id: '12345',
            apdType: APD_TYPE.HITECH,
            years: ['2023', '2024'],
            yearsOptions: ['2023', '2024', '2025'],
            previousActivities: {
              ...HitechPreviousActivitiesEmpty
            },
            activities: []
          }
        },
        router: {
          location: {
            pathname: '/apd/12345/previous-activities'
          }
        },
        nav: {
          ...nav
        }
      },
      story
    })
];

export const HitechDataPreviousActivitiesStory = Template.bind({});
HitechDataPreviousActivitiesStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            id: '12345',
            apdType: APD_TYPE.HITECH,
            years: ['2023', '2024'],
            yearsOptions: ['2023', '2024', '2025'],
            previousActivities: {
              ...HitechPreviousActivitiesWithData
            },
            activities: []
          }
        },
        router: {
          location: {
            pathname: '/apd/12345/previous-activities'
          }
        },
        nav: {
          ...nav
        }
      },
      story
    })
];

export const MmisDefaultPreviousActivitiesStory = Template.bind({});
MmisDefaultPreviousActivitiesStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3591%3A19693&t=3OLhy1ZwzoZ5VM0E-4'
  }
};
MmisDefaultPreviousActivitiesStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            id: '12345',
            apdType: APD_TYPE.MMIS,
            years: ['2023', '2024'],
            yearsOptions: ['2023', '2024', '2025'],
            previousActivities: {
              ...MMISPreviousActivitiesEmpty
            },
            activities: []
          }
        },
        router: {
          location: {
            pathname: '/apd/12345/previous-activities'
          }
        },
        nav: {
          ...nav
        }
      },
      story
    })
];

export const MmisDataPreviousActivitiesStory = Template.bind({});
MmisDataPreviousActivitiesStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3548%3A20855&t=3OLhy1ZwzoZ5VM0E-4'
  }
};
MmisDataPreviousActivitiesStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            id: '12345',
            apdType: APD_TYPE.MMIS,
            years: ['2023', '2024'],
            yearsOptions: ['2023', '2024', '2025'],
            previousActivities: {
              ...MMISPreviousActivitiesWithData
            },
            activities: []
          }
        },
        router: {
          location: {
            pathname: '/apd/12345/previous-activities'
          }
        },
        nav: {
          ...nav
        }
      },
      story
    })
];
