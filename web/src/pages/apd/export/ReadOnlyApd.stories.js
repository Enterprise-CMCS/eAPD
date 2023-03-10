import React from 'react';
import ApdSummary from './ReadOnlyApd';
import { renderWithProviderAndRouter } from 'apd-storybook-library';

export default {
  title: 'Pages/Apd/Export/ApdSummary',
  component: ApdSummary,
  includeStories: /.*Story$/,
  decorators: [],
  parameters: {
    jest: ['ApdSummary.test.js'],
    controls: {
      exclude: /.*$/,
      hideNoControlsWarning: true
    }
  },
  argTypes: {}
};

const Template = args => <ApdSummary {...args} />;

export const MMISApdSummaryStory = Template.bind();
// MMISApdSummaryStory.args = {
//   apdType: 'MMIS'
// };

MMISApdSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            apdType: 'MMIS',
            name: 'My Fancy APD',
            years: ['2021', '2023'],
            apdOverview: {
              updateStatus: {
                isUpdateAPD: false,
                annualUpdate: true,
                asNeededUpdate: true
              },
              narrativeHIE: '',
              narrativeHIT: '',
              narrativeMMIS: '',
              programOverview: 'mmis overview',
              medicaidBusinessAreas: {
                waiverSupportSystems: true,
                assetVerificationSystem: true,
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
                otherMedicaidBusinessAreas:
                  'This is my other business area. This is my other business area. This is my other business area. This is my other business area. This is my other business area. This is my other business area. This is my other business area. '
              }
            }
          }
        }
      },
      story
    })
];

export const HITECHApdSummaryStory = Template.bind();
// HitechApdSummaryStory.args = {
//   apdType: 'HITECH'
// };

HITECHApdSummaryStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            apdType: 'HITECH',
            apdOverview: {
              updateStatus: {
                isUpdateAPD: false,
                annualUpdate: false,
                asNeededUpdate: false
              },
              narrativeHIE: '',
              narrativeHIT: '',
              narrativeMMIS: '',
              programOverview: 'hitech overview'
            }
          }
        }
      },
      story
    })
];
