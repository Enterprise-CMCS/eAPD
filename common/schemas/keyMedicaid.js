import Joi from 'joi';

export const medicaidDirector = Joi.object().keys({
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
export const medicaidOffice = Joi.object({
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

const keyMedicaidSchema = Joi.object({
  medicaidDirector,
  medicaidOffice
});
export default keyMedicaidSchema;
