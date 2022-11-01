const mongoose = require('mongoose');
const { mmisActivitySchema } = require('./mmisActivity');
const { APD, discriminatorOptions } = require('./apd');

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
        decisionSupportSystem_dataWarehouse: Boolean,
        electronicVisitVerification: Boolean,
        encounterProcessingSystem_managedCareSystem: Boolean,
        financialManagement: Boolean,
        healthInformationExchange: Boolean,
        longTermServicesSupports: Boolean,
        memberManagement: Boolean,
        pharmacyBenefitManagement_pointOfSale: Boolean,
        programIntegrity: Boolean,
        providerManagement: Boolean,
        thirdPartyLiability: Boolean,
        other: Boolean,
        otherMedicaidBusinessAreas: String
      },
      statePriortiesAndScope: {
        medicaidProgramAndPriorities: String,
        medicaidEnterpriseSystemIntroduction: String,
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
      }
    },
    activities: [mmisActivitySchema]
  },
  discriminatorOptions
);

const MMIS = APD.discriminator('MMIS', mmisSchema);

module.exports = {
  MMIS
};
