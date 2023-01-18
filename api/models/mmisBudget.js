import mongoose from 'mongoose';
import {
  default as Budget,
  discriminatorOptions,
  shareByCostType,
  shareByCostTypeByQuarter,
  fedStateSplit,
  fedStateSplitByCost
} from './budget.js';

const mmisBudgetSchema = new mongoose.Schema(
  {
    federalShareByFFYQuarter: {
      mmis: {
        years: {
          type: Map,
          of: shareByCostTypeByQuarter
        },
        total: shareByCostType
      }
    },
    mmis: fedStateSplitByCost,
    mmisByFFP: {
      '90-10': {
        type: Map,
        of: fedStateSplit
      },
      '75-25': {
        type: Map,
        of: fedStateSplit
      },
      '50-50': {
        type: Map,
        of: fedStateSplit
      },
      '0-100': {
        type: Map,
        of: fedStateSplit
      },
      combined: {
        type: Map,
        of: fedStateSplit
      }
    }
  },
  discriminatorOptions
);

const MMISBudget = Budget.discriminator('MMISBudget', mmisBudgetSchema);

export default MMISBudget;
