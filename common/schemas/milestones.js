import DateExtension from '@joi/date';
import JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension);

const milestonesSchema = Joi.object({
  id: Joi.any(),
  key: Joi.any(),
  milestone: Joi.string().trim().required().messages({
    'string.base': 'Milestone is required.',
    'string.empty': 'Milestone is required.'
  }),
  endDate: Joi.date().format('YYYY-MM-DD').iso().required().messages({
    'date.required': 'Provide a completion date.',
    'date.base': 'Provide a completion date.',
    'date.empty': 'Provide a completion date.',
    'date.format': 'Provide a completion date.'
  })
});

export default milestonesSchema;
