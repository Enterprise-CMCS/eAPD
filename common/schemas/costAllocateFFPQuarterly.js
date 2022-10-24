const Joi = require('joi');

const costAllocateFFPQuarterlySchema = Joi.object({
  1: Joi.object({
    combined: Joi.any(),
    contractors: Joi.object({
      dollars: Joi.number(),
      percent: Joi.number()
    }),
    inHouse: Joi.object({
      dollars: Joi.number(),
      percent: Joi.number()
    })
  }),
  2: Joi.object({
    combined: Joi.any(),
    contractors: Joi.object({
      dollars: Joi.number(),
      percent: Joi.number()
    }),
    inHouse: Joi.object({
      dollars: Joi.number(),
      percent: Joi.number()
    })
  }),
  3: Joi.object({
    combined: Joi.any(),
    contractors: Joi.object({
      dollars: Joi.number(),
      percent: Joi.number()
    }),
    inHouse: Joi.object({
      dollars: Joi.number(),
      percent: Joi.number()
    })
  }),
  4: Joi.object({
    combined: Joi.any(),
    contractors: Joi.object({
      dollars: Joi.number(),
      percent: Joi.number()
    }),
    inHouse: Joi.object({
      dollars: Joi.number(),
      percent: Joi.number()
    })
  }),
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
});

export default costAllocateFFPQuarterlySchema;
