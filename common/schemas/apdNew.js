import Joi from 'joi';

const apdNewSchema = Joi.object({
  apdType: Joi.string().valid('hitech', 'mmis').required().messages({
    'any.only': 'Select an APD Type.'
  }),
  apdname: Joi.any(),
  years: Joi.array().min(1).required().messages({
    'array.min': 'Select at least one year.'
  }),
  hitechStatus: Joi.when('apdType', {
    is: 'hitech',
    then: Joi.array().min(1).required().messages({
      'array.min': 'Select at least one type of update.'
    }),
    otherwise: Joi.any()
  }),
  mmisStatus: Joi.when('apdType', {
    is: 'mmis',
    then: Joi.object({
      updateValue: Joi.string().valid('yes', 'no').required().messages({
        'any.only': 'Select an update type.'
      }),
      updateTypes: Joi.when('value', {
        is: 'yes',
        then: Joi.array().min(1).required().messages({
          'array.min': 'Select at least one type of update.'
        }),
        otherwise: Joi.any()
      })
    }),
    otherwise: Joi.any()
  }),
  medicaidBA: Joi.when('apdType', {
    is: 'mmis',
    then: Joi.array().min(1).required(),
    otherwise: Joi.any()
  }),
  otherDetails: Joi.when('medicaidBA', {
    is: Joi.array().items(Joi.string()).has(Joi.string().valid('other')),
    then: Joi.string().min(1).required(),
    otherwise: Joi.any()
  })
});

export default apdNewSchema;
