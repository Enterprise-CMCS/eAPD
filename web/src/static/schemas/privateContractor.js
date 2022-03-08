import Joi from 'joi';

const hourlySchema = Joi.object({
  hours: Joi.number().required(),
  rate: Joi.number().required()
});

const schemas = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required'
  }),
  description: Joi.string().required().messages({
    'string.empty': 'Description is required'
  }),
  start: Joi.date().iso().required(),
  end: Joi.date().iso().greater(Joi.ref('start')).required(),
  totalCost: Joi.number().required(),
  hourly: Joi.object({
    data: Joi.object().pattern(/\d{4}/, hourlySchema).when('hourly.useHourly', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
    useHourly: Joi.boolean().required()
  }),
  years: Joi.object().pattern(/\d{4}/, Joi.number().required())
});

export default schemas;
