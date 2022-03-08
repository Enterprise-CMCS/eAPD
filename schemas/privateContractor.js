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
  start: Joi.date().iso().required().messages({
    'date.empty': 'Start date is required',
    'date.format': 'Start date must be a valid date'
  }),
  end: Joi.date().iso().min(Joi.ref('start')).required().messages({
    'date.empty': 'End date is required',
    'date.format': 'End date must be a valid date',
    'date.min': 'End date must be after start date'
  }),
  totalCost: Joi.number().positive().required(),
  hourly: Joi.object({
    data: Joi.object().pattern(/\d{4}/, hourlySchema).when('hourly.useHourly', {
      is: true,
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
    useHourly: Joi.string().required()
  }),
  years: Joi.object().pattern(/\d{4}/, Joi.number().required())
});

export default schemas;
