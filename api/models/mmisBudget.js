import mongoose from 'mongoose';
import {
  default as Budget,
  discriminatorOptions,
  fedStateSplit,
  fedStateSplitByCost
} from './budget.js';
import { BUDGET_TYPE } from '@cms-eapd/common';

const mmisBudgetSchema = new mongoose.Schema(
  {
    mmis: fedStateSplitByCost,
    ddi: {
      '90-10': fedStateSplitByCost,
      '75-25': fedStateSplitByCost,
      '50-50': fedStateSplitByCost,
      combined: {
        type: Map,
        of: fedStateSplit
      }
    },
    mando: {
      '75-25': fedStateSplitByCost,
      '50-50': fedStateSplitByCost,
      combined: {
        type: Map,
        of: fedStateSplit
      }
    }
  },
  discriminatorOptions
);

export default Budget.discriminator(BUDGET_TYPE.MMIS_BUDGET, mmisBudgetSchema);
