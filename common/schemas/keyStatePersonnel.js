import Joi from 'joi';

export const medicaidDirectorSchema = Joi.object().keys({
  name: Joi.string().required().messages({
    'string.base': 'Provide the name of the State Medicaid Director.',
    'string.empty': 'Provide the name of the State Medicaid Director.',
    'string.min': 'Provide the name of the State Medicaid Director.',
    'string.required': 'Provide the name of the State Medicaid Director.'
  }),
  email: Joi.string().required().messages({
    'string.base': 'Provide the email address of the State Medicaid Director.',
    'string.empty': 'Provide the email address of the State Medicaid Director.'
  }),
  phone: Joi.string().required().messages({
    'string.base':
      'Provide a valid phone number for the State Medicaid Director.',
    'string.empty':
      'Provide a valid phone number for the State Medicaid Director.'
  })
});

export const medicaidOfficeSchema = Joi.object({
  address1: Joi.string().min(1).required().messages({
    'string.base': 'Provide a mailing street address for the Medicaid office.',
    'string.empty': 'Provide a mailing street address for the Medicaid office.'
  }),
  address2: Joi.any(),
  state: Joi.any(),
  city: Joi.string().min(1).required().messages({
    'string.base': 'Provide a city name.',
    'string.empty': 'Provide a city name.'
  }),
  zip: Joi.string().required().messages({
    'string.base': 'Provide a zip code.',
    'string.empty': 'Provide a zip code.'
  })
});

export const keyPersonnelSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'Provide a name for the point of contact.',
    'string.empty': 'Provide a name for the point of contact.'
  }),
  email: Joi.string().required().messages({
    'string.base': 'Provide an email address for the point of contact.',
    'string.empty': 'Provide an email address for the point of contact.'
  }),
  position: Joi.string().required().messages({
    'string.base': 'Provide a role for the point of contact.',
    'string.empty': 'Provide a role for the point of contact.'
  }),
  hasCosts: Joi.alternatives()
    .try(Joi.string(), Joi.boolean()) // The frontend validates with 'yes' and 'no' whereas the backend/db uses a boolean
    .required()
    .messages({
      'alternatives.types': 'Indicate whether or not this person has costs.',
      'string.base': 'Indicate whether or not this person has costs.',
      'string.empty': 'Indicate whether or not this person has costs.'
    }),
  costs: Joi.alternatives().conditional('hasCosts', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().allow(0).required().messages({
        'number.base': 'Provide a cost with benefits.',
        'number.empty': 'Provide a cost with benefits.',
        'number.format': 'Provide a cost greater than or equal to $0.',
        'number.positive': 'Provide a cost greater than or equal to $0.'
      })
    ),
    otherwise: Joi.any()
  }),
  isPrimary: Joi.any(),
  fte: Joi.alternatives().conditional('hasCosts', {
    is: 'yes',
    then: Joi.object().pattern(
      /\d{4}/,
      Joi.number().positive().allow(0).max(1).required().messages({
        'number.base':
          'Provide a number less than or equal to 1. Provide a number greater than or equal to 0.',
        'number.empty':
          'Provide a number less than or equal to 1. Provide a number greater than or equal to 0.',
        'number.format':
          'Provide a number less than or equal to 1. Provide a number greater than or equal to 0.',
        'number.max':
          'Provide a number less than or equal to 1. Provide a number greater than or equal to 0.',
        'number.positive':
          'Provide a number less than or equal to 1. Provide a number greater than or equal to 0.'
      })
    ),
    otherwise: Joi.any()
  })
});

const keyMedicaidSchema = Joi.object({
  medicaidDirector: medicaidDirectorSchema,
  medicaidOffice: medicaidOfficeSchema,
  keyPersonnel: Joi.array().items(keyPersonnelSchema)
});
export default keyMedicaidSchema;
