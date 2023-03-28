import './hitechBudget.js';
import mongoose from 'mongoose';
import hitechActivitySchema from './hitechActivity.js';
import {
  default as APD,
  discriminatorOptions,
  federalCitation
} from './apd.js';
import { APD_TYPE } from '@cms-eapd/common';

const incentivePayment = new mongoose.Schema(
  {
    1: {
      type: Number,
      default: 0
    },
    2: {
      type: Number,
      default: 0
    },
    3: {
      type: Number,
      default: 0
    },
    4: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

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

const HITECH = APD.discriminator(APD_TYPE.HITECH, hitechSchema);

export default HITECH;
