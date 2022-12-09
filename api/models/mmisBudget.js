const mongoose = require('mongoose');
const {
  Budget,
  discriminatorOptions,
  shareByCostTypeByQuarter,
  shareByCostType,
  fedStateSplitByCost,
  fedStateSplit
} = require('./budget');

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

module.exports = {
  MMISBudget
};