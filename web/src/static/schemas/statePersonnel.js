import Joi from 'joi';

const statePersonnelSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'Title is required',
    'string.empty': 'Title is required'
  }),
  description: Joi.string().required().messages({
    'string.base': 'Description is required',
    'string.empty': 'Description is required'
  }),
  years: Joi.object().pattern(
    /\d{4}/,
    Joi.object({
      amt: Joi.number().positive().required().messages({
        'number.base': 'Provide a cost.',
        'number.empty': 'Provide a cost.',
        'number.format': 'Provide a valid amount.',
        'number.positive':
          'Provide an amount greater than or equal to 0.'
      }),
      perc: Joi.number().positive().greater(0).required().messages({
        'number.base': 'Provide number of FTEs.',
        'number.empty': 'Provide number of FTEs.'
      })
    })
  )
});

export default statePersonnelSchema;