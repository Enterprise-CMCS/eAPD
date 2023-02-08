import Joi from 'joi';
import { APD_TYPE } from '../utils/constants.js';

const apdNewSchema = Joi.object({
  apdType: Joi.string()
    .valid(APD_TYPE.HITECH, APD_TYPE.MMIS)
    .required()
    .messages({
      'any.only': 'Select an APD Type.',
      'any.required': 'Select an APD Type.'
    }),
  name: Joi.any(),
  years: Joi.array().min(1).required().messages({
    'array.min': 'Select at least one year.'
  }),
  mmisUpdate: Joi.when('apdType', {
    is: APD_TYPE.MMIS,
    then: Joi.string().valid('yes', 'no').required().messages({
      'any.only': 'Indicate whether this APD is an update.',
      'any.required': 'Indicate whether this APD is an update.'
    }),
    otherwise: Joi.string().valid('')
  }),
  updateStatus: Joi.when('apdType', {
    is: APD_TYPE.HITECH,
    then: Joi.object({
      typeStatus: Joi.object({
        annualUpdate: Joi.boolean(),
        asNeededUpdate: Joi.boolean()
      })
        .or('annualUpdate', 'asNeededUpdate', {
          isPresent: resolved => resolved === true
        })
        .messages({
          'object.missing': 'Select at least one type of update.'
        })
    }),
    otherwise: Joi.when('mmisUpdate', {
      is: 'yes',
      then: Joi.object({
        typeStatus: Joi.object({
          annualUpdate: Joi.boolean(),
          asNeededUpdate: Joi.boolean()
        })
          .or('annualUpdate', 'asNeededUpdate', {
            isPresent: resolved => resolved === true
          })
          .messages({
            'object.missing': 'Select at least one type of update.'
          })
      })
    })
  }),
  businessList: Joi.when('apdType', {
    is: APD_TYPE.MMIS,
    then: Joi.array().min(1).required().messages({
      'array.min': 'Provide Other Medicaid Business Area(s)',
      'any.only': 'Provide Other Medicaid Business Area(s)',
      'any.required': 'Provide Other Medicaid Business Area(s)'
    }),
    otherwise: Joi.any()
  }),
  otherDetails: Joi.when('businessList', {
    is: Joi.array().items(Joi.string()).has(Joi.string().valid('other')),
    then: Joi.string().min(1).required().messages({
      'string.empty': 'Provide Other Medicaid Business Area(s)',
      'any.required': 'Provide Other Medicaid Business Area(s)',
      'any.only': 'Provide Other Medicaid Business Area(s)'
    }),
    otherwise: Joi.any()
  })
});

export default apdNewSchema;
