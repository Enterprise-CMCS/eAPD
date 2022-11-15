import Joi from 'joi';

const expensesSchema = Joi.object({
  key: Joi.string(),
  category: Joi.string()
    .valid(
      'Hardware, software, and licensing',
      'Equipment and supplies',
      'Training and outreach',
      'Travel',
      'Administrative operations',
      'Miscellaneous expenses for the project'
    )
    .messages({
      'any.default': 'Select a category.',
      'any.only': 'Select a category.'
    }),
  description: Joi.string().required().messages({
    'string.base':
      'Provide a description of the selected non-personal category.',
    'string.empty':
      'Provide a description of the selected non-personal category.'
  }),
  years: Joi.object().pattern(
    /\d{4}/,
    Joi.number().positive().allow(0).required().messages({
      'number.base': 'Provide an annual cost.',
      'number.empty': 'Provide an annual cost.',
      'number.format': 'Provide an annual cost greater than or equal to $0.',
      'number.positive': 'Provide an annual cost greater than or equal to $0.',
      'number.greater': 'Provide an annual cost greater than or equal to $0.',
      'number.allow': 'Provide an annual cost greater than or equal to $0.'
    })
  )
});

export default expensesSchema;
