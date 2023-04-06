import React from 'react';
import KeyStatePersonnelReadOnly from './KeyStatePersonnelReadOnly';
import { withDesign } from 'storybook-addon-designs';
import { APD_TYPE, FUNDING_CATEGORY_TYPE } from '@cms-eapd/common';

export default {
  title: 'Pages/Apd/Key State Personnel Read-Only',
  component: KeyStatePersonnelReadOnly,
  includeStores: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['KeyStatePersonnelReadOnly.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  }
};

const keyStatePersonnel = {
  medicaidDirector: {
    name: 'Thomas Shelby',
    email: 'thomas.shelby@peakyblinders.com',
    phone: '410-234-5678'
  },
  medicaidOffice: {
    address1: '123 Seasame St',
    address2: '',
    city: 'Russie',
    state: 'AK',
    zip: '21287'
  },
  keyPersonnel: [
    {
      name: 'Polly Shelby',
      position: 'ES Director',
      email: 'polly.shelby@peakyblinders.com',
      isPrimary: true,
      fte: {
        2022: 1,
        2023: 1
      },
      hasCosts: true,
      costs: {
        2022: 25000,
        2023: 25000
      },
      split: {
        2022: {
          federal: 90,
          state: 10,
          fundingCategory: FUNDING_CATEGORY_TYPE.DDI
        },
        2023: {
          federal: 90,
          state: 10,
          fundingCategory: FUNDING_CATEGORY_TYPE.DDI
        }
      },
      medicaidShare: {
        2022: 90,
        2023: 90
      },
      id: null,
      key: '6794cbcf'
    },
    {
      name: 'Arthur Shelby',
      position: 'Financial Analyst',
      email: 'arthur.shelby@peakyblinders.com',
      isPrimary: false,
      fte: {
        2022: 1,
        2023: 1
      },
      hasCosts: false,
      costs: {
        2022: 0,
        2023: 0
      },
      split: {
        2022: {
          federal: 90,
          state: 10,
          fundingCategory: FUNDING_CATEGORY_TYPE.DDI
        },
        2023: {
          federal: 75,
          state: 25,
          fundingCategory: FUNDING_CATEGORY_TYPE.MANDO
        }
      },
      medicaidShare: {
        2022: 100,
        2023: 100
      },
      id: null,
      key: '2c024c26'
    }
  ]
};

const emptyKeyStatePersonnel = {
  medicaidDirector: {
    name: '',
    email: '',
    phone: ''
  },
  medicaidOffice: {
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  },
  keyPersonnel: []
};

const Template = args => <KeyStatePersonnelReadOnly {...args} />;

export const EmptyKeyStatePersonnelReadOnlyStory = Template.bind({});
EmptyKeyStatePersonnelReadOnlyStory.args = {
  keyStatePersonnel: emptyKeyStatePersonnel
};
EmptyKeyStatePersonnelReadOnlyStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=4177%3A19459&t=8ZtknRWqJIxJvVOc-1'
  }
};

export const NoMedicaidDirectorReadOnlyStory = Template.bind({});
NoMedicaidDirectorReadOnlyStory.args = {
  keyStatePersonnel: {
    ...keyStatePersonnel,
    medicaidDirector: {
      name: '',
      email: '',
      phone: ''
    }
  }
};

export const NoMedicaidOfficeReadOnlyStory = Template.bind({});
NoMedicaidOfficeReadOnlyStory.args = {
  keyStatePersonnel: {
    ...keyStatePersonnel,
    medicaidOffice: {
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: ''
    }
  }
};

export const HitechKeyStatePersonnelReadOnlyStory = Template.bind({});
HitechKeyStatePersonnelReadOnlyStory.args = {
  keyStatePersonnel,
  apdType: APD_TYPE.HITECH
};

export const MmisKeyStatePersonnelReadOnlyStory = Template.bind({});
MmisKeyStatePersonnelReadOnlyStory.args = {
  keyStatePersonnel,
  apdType: APD_TYPE.MMIS
};
MmisKeyStatePersonnelReadOnlyStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3867%3A27442&t=OfwpMqbx435tmFKF-1'
  }
};
