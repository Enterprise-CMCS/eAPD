import DateExtension from '@joi/date';
import JoiImport from 'joi';

const Joi = JoiImport.extend(DateExtension);

export const activityStartDate = Joi.date()
  .format('YYYY-MM-DD')
  .iso()
  .required()
  .messages({
    'date.required': 'Provide a start date.',
    'date.base': 'Provide a start date.',
    'date.empty': 'Provide a start date.',
    'date.format': 'Provide a start date.'
  });
export const activityEndDate = Joi.date()
  .format('YYYY-MM-DD')
  .iso()
  .allow('')
  .min(Joi.ref('plannedStartDate'))
  .messages({
    'date.base': 'Provide an end date.',
    'date.format': 'Provide an end date.',
    'date.min': 'Provide an end date that is after the start date.',
    'any.ref': 'Provide an end date that is after the start date.'
  });

const scheduleSchema = Joi.object({
  plannedStartDate: activityStartDate,
  plannedEndDate: activityEndDate
});

export default scheduleSchema;
