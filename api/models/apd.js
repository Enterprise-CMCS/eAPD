require('./budget');
const mongoose = require('mongoose');
const { activitySchema } = require('./apdActivity');

const discriminatorOptions = { discriminatorKey: 'type' };

const federalCitation = new mongoose.Schema(
  {
    title: String,
    checked: {
      type: Boolean,
      default: null
    },
    explanation: String
  },
  { _id: false }
);

const apdSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'archived', 'submitted', 'approved'],
    required: true
  },
  stateId: {
    type: String,
    required: true
  },
  name: String,
  years: [
    {
      _id: false,
      type: String,
      validate: {
        validator: v => {
          const re = /^[0-9]{4}$/;
          return v == null || re.test(v);
        },
        message: 'Provided year is invalid.'
      }
    }
  ],
  yearOptions: [
    {
      _id: false,
      type: String,
      validate: {
        validator: v => {
          const re = /^[0-9]{4}$/;
          return v == null || re.test(v);
        },
        message: 'Provided year is invalid.'
      }
    }
  ],
  apdOverview: {
    updateStatus: {
      isUpdateAPD: Boolean,
      annualUpdate: Boolean,
      asNeededUpdate: Boolean
    }
  },
  keyStatePersonnel: {
    medicaidDirector: {
      name: String,
      email: String,
      phone: String
    },
    medicaidOffice: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      zip: String
    },
    keyPersonnel: [
      {
        _id: false,
        name: String,
        position: String,
        email: String,
        isPrimary: Boolean,
        fte: {
          type: Map,
          of: {
            type: Number,
            default: 0
          }
        },
        hasCosts: Boolean,
        costs: {
          type: Map,
          of: {
            type: Number,
            default: 0
          }
        }
      }
    ]
  },
  previousActivities: {
    previousActivitySummary: String
  },
  activities: [activitySchema],
  // Currently there are no inputs in activity schedule summary
  // but this should be used to follow the sections pattern
  // activityScheduleSummary: {},
  assurancesAndCompliances: {
    procurement: [federalCitation],
    recordsAccess: [federalCitation],
    softwareRights: [federalCitation],
    security: [federalCitation]
  },
  budget: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Budget',
    default: null
  }
});

const APD = mongoose.model('APD', apdSchema);

module.exports = { APD, discriminatorOptions };
