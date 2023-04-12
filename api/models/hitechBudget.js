import mongoose from 'mongoose';
import {
  default as Budget,
  discriminatorOptions,
  costPercentByCostTypeByQuarter,
  shareByCostTypeByQuarter,
  shareByCostType,
  fedStateSplitByCost,
  fedStateSplit,
  activities
} from './budget.js';
import { BUDGET_TYPE } from '@cms-eapd/common';

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
    },
    activities: {
      type: Map,
      of: activities.add({
        quarterlyFFP: {
          years: {
            type: Map,
            of: costPercentByCostTypeByQuarter
          },
          total: shareByCostType
        }
      })
    }
  },
  discriminatorOptions
);

const HITECHBudget = Budget.discriminator(
  BUDGET_TYPE.HITECH_BUDGET,
  hitechBudgetSchema
);

export default HITECHBudget;
