import React from 'react';
import AssurancesAndCompliance from './AssurancesAndCompliance';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProviderAndRouter } from 'apd-storybook-library';
import { APD_TYPE } from '@cms-eapd/common';

export default {
  title: 'Pages/Apd/Assurances and Compliance (Redux)',
  component: AssurancesAndCompliance,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['AssurancesAndCompliance.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {
    activityIndex: 0
  }
};

const router = {
  location: {
    pathname: '/apd/63dc42496379ad06919f1666/assurances-and-compliance',
    search: '',
    hash: '',
    key: 'c0vj28',
    query: {}
  },
  action: 'REPLACE'
};
const nav = {
  apdId: '63dc42496379ad06919f1666',
  apdType: 'MMIS',
  activities: [],
  continueLink: {
    label: 'Executive Summary',
    url: '/apd/63dc42496379ad06919f1666/executive-summary',
    selected: false
  },
  previousLink: {
    label: 'Security Planning',
    url: '/apd/63dc42496379ad06919f1666/security-planning',
    selected: false
  },
  items: []
};

const Template = args => <AssurancesAndCompliance {...args} />;

export const DefaultMmisAssurancesAndComplianceStory = Template.bind({});
DefaultMmisAssurancesAndComplianceStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2929%3A18989&t=ZN32TcSnnjPQ5kWz-1'
  }
};
DefaultMmisAssurancesAndComplianceStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          adminCheck: false,
          data: {
            id: 'apdid',
            apdType: APD_TYPE.MMIS,
            years: [2020, 2021],
            activities: [
              {
                key: '1234',
                name: 'Program Administration'
              }
            ],
            assurancesAndCompliances: {
              procurement: [
                { title: 'SMM, Part 11', checked: null, explanation: '' },
                { title: '45 CFR Part 95.615', checked: null, explanation: '' },
                { title: '45 CFR Part 75.326', checked: null, explanation: '' }
              ],
              recordsAccess: [
                {
                  title: '45 CFR Part 433.112 (b)(5)-(9)',
                  checked: null,
                  explanation: ''
                },
                { title: '45 CFR Part 95.615', checked: null, explanation: '' },
                { title: 'SMM Section 11267', checked: null, explanation: '' }
              ],
              softwareRights: [
                { title: '45 CFR 95.617', checked: null, explanation: '' },
                {
                  title: '42 CFR Part 431.300',
                  checked: null,
                  explanation: ''
                },
                { title: '45 CFR Part 164', checked: null, explanation: '' }
              ],
              independentVV: [
                {
                  title: '45 CFR Part 95.626',
                  checked: null,
                  explanation: ''
                }
              ]
            }
          }
        },
        router,
        nav
      },
      story
    })
];

export const FilledOutMmisAssurancesAndComplianceStory = Template.bind({});
FilledOutMmisAssurancesAndComplianceStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2924%3A17823&t=ZN32TcSnnjPQ5kWz-1'
  }
};
FilledOutMmisAssurancesAndComplianceStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          adminCheck: false,
          data: {
            apdType: APD_TYPE.MMIS,
            years: [2020, 2021],
            activities: [
              {
                key: '1234',
                name: 'Program Administration'
              }
            ],
            assurancesAndCompliances: {
              procurement: [
                { title: 'SMM, Part 11', checked: true, explanation: '' },
                { title: '45 CFR Part 95.615', checked: true, explanation: '' },
                { title: '45 CFR Part 75.326', checked: false, explanation: '' }
              ],
              recordsAccess: [
                {
                  title: '45 CFR Part 433.112 (b)(5)-(9)',
                  checked: true,
                  explanation: ''
                },
                { title: '45 CFR Part 95.615', checked: true, explanation: '' },
                { title: 'SMM Section 11267', checked: true, explanation: '' }
              ],
              softwareRights: [
                { title: '45 CFR 95.617', checked: true, explanation: '' },
                {
                  title: '42 CFR Part 431.300',
                  checked: true,
                  explanation: ''
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
            }
          }
        },
        router,
        nav
      },
      story
    })
];

export const ErrorsMmisAssurancesAndComplianceStory = Template.bind({});
ErrorsMmisAssurancesAndComplianceStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=2951%3A19898&t=ZN32TcSnnjPQ5kWz-1'
  }
};
ErrorsMmisAssurancesAndComplianceStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          adminCheck: {
            errors: [
              {
                section: 'Assurances and Compliance',
                link: '/apd/63dc42496379ad06919f1666/assurances-and-compliance',
                fieldDescription: 'Provide an explanation'
              },
              {
                section: 'Assurances and Compliance',
                link: '/apd/63dc42496379ad06919f1666/assurances-and-compliance',
                fieldDescription: 'Select yes or no.'
              }
            ],
            enabled: true,
            collapsed: false,
            complete: false
          },
          data: {
            apdType: APD_TYPE.MMIS,
            years: [2020, 2021],
            activities: [
              {
                key: '1234',
                name: 'Program Administration'
              }
            ],
            assurancesAndCompliances: {
              procurement: [
                { title: 'SMM, Part 11', checked: true, explanation: '' },
                { title: '45 CFR Part 95.615', checked: true, explanation: '' },
                { title: '45 CFR Part 75.326', checked: false, explanation: '' }
              ],
              recordsAccess: [
                {
                  title: '45 CFR Part 433.112 (b)(5)-(9)',
                  checked: null,
                  explanation: ''
                },
                { title: '45 CFR Part 95.615', checked: true, explanation: '' },
                { title: 'SMM Section 11267', checked: true, explanation: '' }
              ],
              softwareRights: [
                { title: '45 CFR 95.617', checked: true, explanation: '' },
                {
                  title: '42 CFR Part 431.300',
                  checked: true,
                  explanation: ''
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
            }
          }
        },
        router,
        nav
      },
      story
    })
];
