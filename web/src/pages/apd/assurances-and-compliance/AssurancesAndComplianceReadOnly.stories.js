import React from 'react';
import AssurancesAndComplianceReadOnly from './AssurancesAndComplianceReadOnly';
import { withDesign } from 'storybook-addon-designs';
import { renderWithProvider } from 'apd-storybook-library';
import { APD_TYPE } from '@cms-eapd/common';
import { render } from 'react-dom';

export default {
  title: 'Pages/Apd/Assurances and Compliance Read Only (Redux)',
  component: AssurancesAndComplianceReadOnly,
  includeStories: /.*Story$/,
  decorators: [withDesign],
  parameters: {
    jest: ['AssurancesAndComplianceReadOnly.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  args: {}
};

const Template = args => <AssurancesAndComplianceReadOnly {...args} />;

export const IncompleteMmisAssurancesAndComplianceStory = Template.bind({});
IncompleteMmisAssurancesAndComplianceStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3144%3A19204&t=fOtAsN959oGT7q6b-1'
  }
};
IncompleteMmisAssurancesAndComplianceStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            assurancesAndCompliances: {
              procurement: [
                { title: 'SMM, Part 11', checked: true, explanation: '' },
                { title: '45 CFR Part 95.615', checked: true, explanation: '' },
                {
                  title: '45 CFR Part 75.326',
                  checked: false,
                  explanation: 'This is just a test.'
                }
              ],
              recordsAccess: [
                {
                  title: '45 CFR Part 433.112 (b)(5)-(9)',
                  checked: false,
                  explanation: ''
                },
                { title: '45 CFR Part 95.615', checked: null, explanation: '' },
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
        }
      },
      story
    })
];

export const CompleteMmisAssurancesAndComplianceStory = Template.bind({});
CompleteMmisAssurancesAndComplianceStory.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hJpKHKU6fz5J0Z7fisSwa2/eAPD-MMIS-2022?node-id=3144%3A19204&t=fOtAsN959oGT7q6b-1'
  }
};
CompleteMmisAssurancesAndComplianceStory.decorators = [
  story =>
    renderWithProvider({
      initialState: {
        apd: {
          data: {
            apdType: APD_TYPE.MMIS,
            assurancesAndCompliances: {
              procurement: [
                { title: 'SMM, Part 11', checked: true, explanation: '' },
                { title: '45 CFR Part 95.615', checked: true, explanation: '' },
                {
                  title: '45 CFR Part 75.326',
                  checked: false,
                  explanation: 'This is just a test.'
                }
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
        }
      },
      story
    })
];
