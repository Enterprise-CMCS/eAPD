require('./hitechBudget');
const mongoose = require('mongoose');
const { incentivePayment, hitechActivitySchema } = require('./hitechActivity');
const { APD, discriminatorOptions, federalCitation } = require('./apd');

const hitechSchema = new mongoose.Schema(
  {
    apdOverview: {
      updateStatus: {
        isUpdateAPD: Boolean,
        annualUpdate: Boolean,
        asNeededUpdate: Boolean
      },
      programOverview: String,
      narrativeHIT: String,
      narrativeHIE: String,
      narrativeMMIS: String
    },
    previousActivities: {
      previousActivitySummary: String,
      actualExpenditures: {
        type: Map,
        of: new mongoose.Schema(
          {
            hithie: {
              federalActual: {
                type: Number,
                default: 0
              },
              totalApproved: {
                type: Number,
                default: 0
              }
            },
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
    activities: [hitechActivitySchema],
    proposedBudget: {
      incentivePayments: {
        ehAmt: {
          type: Map,
          of: incentivePayment
        },
        ehCt: {
          type: Map,
          of: incentivePayment
        },
        epAmt: {
          type: Map,
          of: incentivePayment
        },
        epCt: {
          type: Map,
          of: incentivePayment
        }
      }
    },
    assurancesAndCompliances: {
      procurement: [federalCitation],
      recordsAccess: [federalCitation],
      softwareRights: [federalCitation],
      security: [federalCitation]
    },
    budget: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HITECHBudget',
      default: null
    }
  },
  discriminatorOptions
);

const HITECH = APD.discriminator('HITECH', hitechSchema);

module.exports = {
  HITECH
};
