import Joi from 'joi';

const apdNewSchema = Joi.object({
  apdType: Joi.string().valid('hitech', 'mmis').required().messages({
    'any.only': 'Select an APD Type.'
  }),
  name: Joi.any(),
  years: Joi.array().min(1).required().messages({
    'array.min': 'Select at least one year.'
  }),
  mmisUpdate: Joi.when('apdType', {
    is: 'mmis',
    then: Joi.string().valid('yes', 'no').required().messages({
      'any.only': 'Select an update type'
    }),
    otherwise: Joi.string().valid('')
  }),
  updateStatus: Joi.when('apdType', {
    is: 'hitech',
    then: Joi.object({
      typeStatus: Joi.object({
        annualUpdate: Joi.boolean(),
        asNeededUpdate: Joi.boolean()
      }),
      updateList: Joi.array().min(1).required().messages({
        'array.min': 'Select at least type of update.'
      })
    }),
    otherwise: Joi.when('mmisUpdate', {
      is: 'yes',
      then: Joi.object({
        typeStatus: Joi.object({
          annualUpdate: Joi.boolean(),
          asNeededUpdate: Joi.boolean()
        }),
        updateList: Joi.array().min(1).required().messages({
          'array.min': 'Select at least one type of update.',
          'any.only': 'Select at least one type of update.'
        })
      })
    })
  }),
  apdOverview: Joi.when('apdType', {
    is: 'mmis',
    then: Joi.object({
      medicaidBA: Joi.array().min(1).required().messages({
        'array.min': 'Select at least one business area.'
      }),
      otherDetails: Joi.when('medicaidBA', {
        is: Joi.array().items(Joi.string()).has(Joi.string().valid('other')),
        then: Joi.string().min(1).required(),
        otherwise: Joi.any()
      })
    })
  })
});

export default apdNewSchema;
