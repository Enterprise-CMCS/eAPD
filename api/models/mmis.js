import './mmisBudget.js';
import mongoose from 'mongoose';
import mmisActivitySchema from './mmisActivity.js';
import {
  default as APD,
  discriminatorOptions,
  federalCitation
} from './apd.js';

const mmisSchema = new mongoose.Schema(
  {
    apdOverview: {
      updateStatus: {
        isUpdateAPD: Boolean,
        annualUpdate: Boolean,
        asNeededUpdate: Boolean
      },
      medicaidBusinessAreas: {
        waiverSupport: Boolean,
        assetVerification: Boolean,
        claimsProcessing: Boolean,
        decisionSupport: Boolean,
        electronicVisitVerify: Boolean,
        encounterProcessingSystem: Boolean,
        financialManagement: Boolean,
        healthInfoExchange: Boolean,
        longTermServiceSupport: Boolean,
        memberManagement: Boolean,
        pharmacyBenefitManagement: Boolean,
        programIntegrity: Boolean,
        providerManagement: Boolean,
        thirdPartyLiability: Boolean,
        other: Boolean,
        otherMedicaidBusinessAreas: String
      }
    },
    statePrioritiesAndScope: {
      medicaidProgramAndPriorities: String,
      mesIntroduction: String,
      scopeOfAPD: String
    },
    previousActivities: {
      previousActivitySummary: String,
      actualExpenditures: {
        type: Map,
        of: new mongoose.Schema(
          {
            mmis: {
              50: {
                federalActual: {
                  type: Number,
                  default: 0
                },
                totalApproved: {
                  type: Number,
                  default: 0
                }
              },
              75: {
                federalActual: {
                  type: Number,
                  default: 0
                },
                totalApproved: {
                  type: Number,
                  default: 0
                }
              },
              90: {
                federalActual: {
                  type: Number,
                  default: 0
                },
                totalApproved: {
                  type: Number,
                  default: 0
                }
              }
            }
          },
          { _id: false }
        )
      }
    },
    activities: [mmisActivitySchema],
    securityPlanning: {
      securityAndInterfacePlan: String,
      businessContinuityAndDisasterRecovery: String
    },
    assurancesAndCompliances: {
      procurement: [federalCitation],
      recordsAccess: [federalCitation],
      softwareRights: [federalCitation],
      independentVV: [federalCitation]
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MMISBudget',
      default: null
    }
  },
  discriminatorOptions
);

export default APD.discriminator('MMIS', mmisSchema);
