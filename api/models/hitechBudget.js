import mongoose from 'mongoose';
import {
  default as Budget,
  discriminatorOptions,
  shareByCostTypeByQuarter,
  shareByCostType,
  fedStateSplitByCost,
  fedStateSplit
} from './budget.js';

const hitechBudgetSchema = new mongoose.Schema(
  {
    federalShareByFFYQuarter: {
      hitAndHie: {
        years: {
          type: Map,
          of: shareByCostTypeByQuarter
        },
        total: shareByCostType
      },
      mmis: {
        years: {
          type: Map,
          of: shareByCostTypeByQuarter
        },
        total: shareByCostType
      }
    },
    hie: fedStateSplitByCost,
    hit: fedStateSplitByCost,
    mmis: fedStateSplitByCost,
    hitAndHie: fedStateSplitByCost,
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

const HITECHBudget = Budget.discriminator('HITECHBudget', hitechBudgetSchema);

export default HITECHBudget;
