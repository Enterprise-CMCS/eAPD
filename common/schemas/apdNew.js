import Joi from 'joi';
import { medicaidBusinessAreasSchema } from './apdOverview.js';
import { APD_TYPE } from '../utils/constants.js';

export const updateStatusSchema = Joi.object({
  annualUpdate: Joi.boolean(),
  asNeededUpdate: Joi.boolean()
})
  .or('annualUpdate', 'asNeededUpdate', {
    isPresent: resolved => resolved === true
  })
  .messages({
    'object.missing': 'Select at least one type of update.'
  });

const apdNewSchema = Joi.object({
  apdType: Joi.string()
    .valid(APD_TYPE.HITECH, APD_TYPE.MMIS)
    .required()
    .messages({
      'any.only': 'Select an APD Type.',
      'any.required': 'Select an APD Type.'
    }),
  apdName: Joi.string().trim().min(1).required().messages({
    'any.only': 'Provide an APD name.',
    'any.required': 'Provide an APD name.',
    'string.empty': 'Provide an APD name',
    'string.min': 'Provide an APD name'
  }),
  years: Joi.array().min(1).required().messages({
    'array.min': 'Select at least one year.'
  }),
  updateAPD: Joi.when('apdType', {
    is: APD_TYPE.MMIS,
    then: Joi.string().valid('yes', 'no').required().messages({
      'any.only': 'Indicate whether this APD is an update.',
      'any.required': 'Indicate whether this APD is an update.'
    })
  }),
  updateStatus: Joi.when('apdType', {
    is: APD_TYPE.HITECH,
    then: updateStatusSchema,
    otherwise: Joi.when('updateAPD', {
      is: 'yes',
      then: updateStatusSchema,
      otherwise: Joi.object({
        annualUpdate: Joi.boolean().valid(false),
        asNeededUpdate: Joi.boolean().valid(false)
      })
    })
  }),
  medicaidBusinessAreas: medicaidBusinessAreasSchema
});

export default apdNewSchema;
