import Joi from 'joi';

const costsSchema = Joi.object({
  total: Joi.number(),
  federal: Joi.number(),
  medicaid: Joi.number(),
  state: Joi.number()
});

export const costsByFFYSchema = Joi.object().pattern(
  /^(\d{4}|total)$/,
  costsSchema
);

const quarterSchema = Joi.object({
  combined: Joi.any(),
  contractors: Joi.object({
    dollars: Joi.number(),
    percent: Joi.number()
  }),
  inHouse: Joi.object({
    dollars: Joi.number(),
    percent: Joi.number()
  })
});

export const quarterFFPSchema = Joi.object({
  1: quarterSchema,
  2: quarterSchema,
  3: quarterSchema,
  4: quarterSchema,
  subtotal: Joi.object({
    combined: Joi.any(),
    contractors: Joi.object({
      dollars: Joi.any(),
      percent: Joi.number().precision(3).valid(1).messages({
        'any.default':
          'Private Contractor Costs quarterly percentages must total 100%.',
        'any.only':
          'Private Contractor Costs quarterly percentages must total 100%.'
      })
    }),
    inHouse: Joi.object({
      dollars: Joi.any(),
      percent: Joi.number().precision(3).valid(1).messages({
        'any.default':
          'State Staff and Expenses (In-House Costs) quarterly percentages must total 100%.',
        'any.only':
          'State Staff and Expenses (In-House Costs) quarterly percentages must total 100%.'
      })
    })
  })
});

export const quarterlyFFPSchema = Joi.object({
  years: Joi.object().pattern(/\d{4}/, quarterFFPSchema),
  total: Joi.object({
    inHouse: Joi.number(),
    contractors: Joi.number(),
    combined: Joi.number()
  })
});

const budgetActivitiesSchema = Joi.object().pattern(
  /[a-zA-Z0-9]{8}/,
  Joi.object({
    _id: Joi.any(),
    costsByFFY: costsByFFYSchema,
    quarterlyFFP: quarterlyFFPSchema
  })
);

export default budgetActivitiesSchema;
