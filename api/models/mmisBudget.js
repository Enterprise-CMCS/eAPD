import mongoose from 'mongoose';
import {
  default as Budget,
  discriminatorOptions,
  fedStateSplitByCost
} from './budget.js';

const mmisBudgetSchema = new mongoose.Schema(
  {
    mmis: fedStateSplitByCost,
    ddi: fedStateSplitByCost,
    mando: fedStateSplitByCost
  },
  discriminatorOptions
);

export default Budget.discriminator('MMISBudget', mmisBudgetSchema);
