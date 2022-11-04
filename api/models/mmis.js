require('./mmisBudget');
const mongoose = require('mongoose');
const { mmisActivitySchema } = require('./mmisActivity');
const { APD, discriminatorOptions, federalCitation } = require('./apd');

const mmisSchema = new mongoose.Schema(
  {
    apdOverview: {
      updateStatus: {
        isUpdateAPD: Boolean,
        annualUpdate: Boolean,
        asNeededUpdate: Boolean
      },
      medicaidBusinessAreas: {
        waiverSupportSystems: Boolean,
        assetVerificationSystem: Boolean,
        claimsProcessing: Boolean,
        decisionSupportSystemDW: Boolean,
        electronicVisitVerification: Boolean,
        encounterProcessingSystemMCS: Boolean,
        financialManagement: Boolean,
        healthInformationExchange: Boolean,
        longTermServicesSupports: Boolean,
        memberManagement: Boolean,
        pharmacyBenefitManagementPOS: Boolean,
        programIntegrity: Boolean,
        providerManagement: Boolean,
        thirdPartyLiability: Boolean,
        other: Boolean,
        otherMedicaidBusinessAreas: String
      }
    },
    statePriortiesAndScope: {
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
    // TODO this will change once the Assurances and Compliances designs are done
    assurancesAndCompliances: {
      procurement: [federalCitation],
      recordsAccess: [federalCitation],
      softwareRights: [federalCitation],
      security: [federalCitation]
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MMISBudget',
      default: null
    }
  },
  discriminatorOptions
);

const MMIS = APD.discriminator('MMIS', mmisSchema);

module.exports = {
  MMIS
};
