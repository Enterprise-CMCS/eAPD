const {
  // activitiesDashboard,
  activitySummary,
  activityDescription,
  apdOverview,
  assurancesAndCompliance,
  activityCostAllocationFFP,
  activityCostAllocationOther,
  costAllocation,
  proposedBudgetEhAmt,
  proposedBudgetEpAmt,
  medicaidDirector,
  medicaidOffice,
  keyPerson,
  milestones,
  activityName,
  activityFundingSource,
  nonPersonnelCosts,
  outcomeMetric,
  personCost,
  activityStartDate,
  activityEndDate,
  privateContractor,
  standardsAndConditions,
  statePersonnel
} = require('./index');

const Joi = require('joi');

const combinedApdSchema = Joi.object({
  _id: Joi.any(),
  __v: Joi.any(),
  name: Joi.any(),
  years: Joi.any(),
  stateId: Joi.any(),
  status: Joi.any(),
  createdAt: Joi.any(),
  updatedAt: Joi.any(),
  budget: Joi.object({
    _id: Joi.any(),
    __v: Joi.any(),
    federalShareByFFYQuarter: Joi.any(),
    years: Joi.any(),
    hie: Joi.any(),
    hit: Joi.any(),
    mmis: Joi.any(),
    hitAndHie: Joi.any(),
    mmisByFFP: Joi.any(),
    combined: Joi.any(),
    activityTotals: Joi.any(),
    activities: Joi.object().pattern(
      /[a-zA-Z0-9]{8}/,
      Joi.object({
        _id: Joi.any(),
        costsByFFY: Joi.any(),
        quarterlyFFP: Joi.object({
          years: Joi.object().pattern(
            /\d{4}/,
            Joi.object({
              1: Joi.any(),
              2: Joi.any(),
              3: Joi.any(),
              4: Joi.any(),
              subtotal: Joi.object({
                combined: Joi.any(),
                contractors: Joi.object({
                  dollars: Joi.any(),
                  percent: Joi.number().precision(3).valid(1).messages({
                    'any.default':
                      'Private Contractor Costs quarterly percentages must total 100%',
                    'any.only':
                      'Private Contractor Costs quarterly percentages must total 100%'
                  })
                }),
                inHouse: Joi.object({
                  dollars: Joi.any(),
                  percent: Joi.number().precision(3).valid(1).messages({
                    'any.default':
                      'State Staff and Expenses (In-House Costs) quarterly percentages must total 100%',
                    'any.only':
                      'State Staff and Expenses (In-House Costs) quarterly percentages must total 100%'
                  })
                })
              })
            })
          ),
          total: Joi.any()
        })
      })
    )
  }),
  apdOverview: apdOverview,
  keyStatePersonnel: Joi.object({
    medicaidDirector: medicaidDirector,
    medicaidOffice: medicaidOffice,
    keyPersonnel: Joi.array().items(keyPerson)
  }),
  previousActivities: Joi.any(),
  // activities schema copied from schemas/activitiesDashboard.js
  activities: Joi.array()
    .min(1)
    .messages({
      'array.base': 'Activities have not been added for this APD.',
      'array.min': 'Activities have not been added for this APD.'
    })
    .items({
      activityId: Joi.any(),
      name: activityName,
      fundingSource: activityFundingSource,
      activityOverview: {
        summary: activitySummary,
        description: activityDescription,
        alternatives: Joi.any(),
        standardsAndConditions: standardsAndConditions
      },
      activitySchedule: {
        plannedStartDate: activityStartDate,
        plannedEndDate: activityEndDate
      },
      milestones: Joi.array().items(milestones),
      outcomes: Joi.array().items(outcomeMetric),
      statePersonnel: Joi.array().items(
        statePersonnel.keys({
          years: personCost
        })
      ),
      expenses: Joi.array().items(nonPersonnelCosts),
      contractorResources: Joi.array().items(privateContractor),
      costAllocation: Joi.object().pattern(
        /\d{4}/,
        Joi.object({
          ffp: activityCostAllocationFFP,
          other: activityCostAllocationOther
        })
      ),
      costAllocationNarrative: costAllocation,
      quarterlyFFP: Joi.any() // quarterlyFFP is validated in the budget
    }),
  proposedBudget: Joi.object({
    incentivePayments: Joi.object({
      ehCt: Joi.any(),
      epCt: Joi.any(),
      ehAmt: proposedBudgetEhAmt,
      epAmt: proposedBudgetEpAmt
    })
  }),
  assurancesAndCompliances: assurancesAndCompliance
});

export default combinedApdSchema;
