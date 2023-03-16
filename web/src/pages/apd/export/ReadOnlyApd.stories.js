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

export const MMISApdSummaryEmptyStory = Template.bind();

MMISApdSummaryEmptyStory.decorators = [
  story =>
    renderWithProviderAndRouter({
      initialState: {
        apd: {
          data: {
            apdType: 'MMIS',
            name: 'Untitled',
            years: [],
            apdOverview: {
              updateStatus: {
                isUpdateAPD: false,
                annualUpdate: false,
                asNeededUpdate: false
              },
              narrativeHIE: '',
              narrativeHIT: '',
              narrativeMMIS: '',
              programOverview: '',
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
            }
          }
        }
      },
      story
    })
];

export const MMISApdSummaryStory = Template.bind();

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
                isUpdateAPD: true,
                annualUpdate: false,
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
                decisionSupportSystemDW: true,
                electronicVisitVerification: true,
                encounterProcessingSystemMCS: false,
                financialManagement: true,
                healthInformationExchange: true,
                longTermServicesSupports: false,
                memberManagement: true,
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

export const HITECHApdSummaryEmptyStory = Template.bind();

HITECHApdSummaryEmptyStory.decorators = [
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
              programOverview: ''
            }
          }
        }
      },
      story
    })
];

export const HITECHApdSummaryStory = Template.bind();

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
              narrativeHIE:
                "<p>Tycho's existing health information infrastructure consists of various organizations operating at the enterprise, local, regional and state levels, and includes:</p>\n<ul>\n<li>Health systems, affiliated providers, and ancillary services;</li>\n<li>State agencies health data repositories;</li>\n<li>Specialized participants that operate for specific purposes including, but not limited to, laboratory services, radiology, public health, research and quality assessment;</li>\n<li>Information and service providers that operate in vertical markets such as e-Prescribing, State registries, Medicaid and Medicare;</li>\n<li>Private payers and clearinghouses that transmit administrative data for claims purposes and for pay for performance programs.</li>\n</ul>\n<p>The Tycho HIE has planned to implement a robust public health modernization plan which includes the development of specialized registries and interfaces to the HIE to significantly increase the ability for EPs and EHs to achieve meaningful use. Additionally, plans to collect CQM data and the creation of a Personal Health Record (PHR) has been identified as activities to complete.</p>\n<p>&nbsp;</p>\n<p>Payers/Providers must complete a participation agreement form and possible addendum to participate in the HIE and other services. Governance for the HIE has been defined by the State statute, any related regulations and by the HIE board of directors.</p>\n<p>&nbsp;</p>\n<p>Appropriate cost allocation is a fundamental principle of the federal FFP program to ensure that private sector beneficiaries of public investments are covering the incremental cost of their use. A sustainability plan for proportional investments by other payers/providers than Medicaid was developed in concert with the Tycho HIE Board of Directors and a broad cross-section of stakeholders under the leadership of the Tycho HIE Executive Director and State HIT Coordinator. The Tycho HIE&acirc;s fee structure and detailed participation agreements can be viewed at: tychoMedicaid.com</p>",
              narrativeHIT:
                'Continued Operations of the Medicaid EHR Incentive Payment Program. Participate in the CMS EHR incentive program and continue to administer payments to EPs and EHs through the remaining years of the program (2023).',
              narrativeMMIS:
                "<p><strong><ins>Medicaid Claims Data Feed to the HIE</ins></strong></p>\n<p>Currently, Tycho does not have an All-Payers&acirc; Claims database that can provide consumers and DHSS with consolidated claims data. To provide healthcare statistical information and support MU, Tycho plans to interface the MMIS Data Warehouse (DW) to the HIE so that Medicaid claims data can be made available to consumers in their Personal Health Record (PHR) within the HIE. This initiative will require contractor assistance from Conduent, LLC to complete required MMIS changes as well as Tycho''s HIE Service provider, Orion Health to implement the necessary HIE updates. DHSS IT Planning Office will coordinate the efforts of the three vendors.</p>",
              programOverview:
                'The Department is the state agency that administers the Tycho Medicaid program. The Information Technology (IT) Planning Office is responsible for Health Information Technology (HIT) efforts. Tycho Medicaid has elected to participate in the Electronic Health Record (EHR) Provider Incentive Payment Program funded through CMS. In accordance with Federal regulations, Tycho, requests enhanced Federal Financial Participation (FFP) from the CMS through this Implementation Advance Planning Document Update #9 (IAPDU#9).'
            }
          }
        }
      },
      story
    })
];
