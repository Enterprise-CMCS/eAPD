import Joi from 'joi';
import { APD_TYPE } from '../utils/constants';

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
      }),
      updateList: Joi.array().min(1).required().messages({
        'array.min': 'Select at least type of update.',
        'any.only': 'Select at least one type of update.',
        'any.required': 'Select at least one type of update.'
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
          'any.only': 'Select at least one type of update.',
          'any.required': 'Select at least one type of update.'
        })
      })
    })
  }),
  apdOverview: Joi.when('apdType', {
    is: 'mmis',
    then: Joi.object({
      businessAreas: Joi.array()
        .items(
          Joi.object().keys({
            label: Joi.string().required(),
            value: Joi.string().required(),
            checked: Joi.boolean().required()
          })
        )
        .has(
          Joi.object().keys({
            label: Joi.string().required(),
            value: Joi.string().required(),
            checked: Joi.boolean().invalid(false).required()
          })
        )
      // medicaidBA: Joi.array().min(1).required().messages({
      //   'any.only': 'Select at least one Medicaid Business Area.',
      //   'any.required': 'Select at least one Medicaid Business Area.',
      //   'array.min': 'Select at least one Medicaid Business Area.',
      //   'array.required': 'Select at least one Medicaid Business Area.'
      // }),
      // otherDetails: Joi.when('medicaidBA', {
      //   is: Joi.array().items(Joi.string()).has(Joi.string().valid('other')),
      //   then: Joi.string().min(1).required().messages({
      //     'string.empty': 'Provide an other Medicaid Business Area(s)',
      //     'any.required': 'Provide an other Medicaid Business Area(s)',
      //     'any.only': 'Provide any other Medicaid Business Area(s)'
      //   }),
      //   otherwise: Joi.any()
      // })
    })
  })
});

export default apdNewSchema;
