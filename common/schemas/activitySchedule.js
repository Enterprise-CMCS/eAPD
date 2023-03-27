import DateExtension from '@joi/date';
import JoiImport from 'joi';
import { DATE_EXTREMES } from '../utils/constants.js';

const Joi = JoiImport.extend(DateExtension);

const activityScheduleSchema = Joi.object({
  plannedStartDate: Joi.date()
    .format('YYYY-MM-DD')
    .iso()
    .max(DATE_EXTREMES.max)
    .min(DATE_EXTREMES.min)
    .required()
    .messages({
      'date.required': 'Provide a start date.',
      'date.base': 'Provide a start date.',
      'date.empty': 'Provide a start date.',
      'date.format': 'Provide a start date.',
      'date.max': 'Provide a valid year.',
      'date.min': 'Provide a valid year.'
    }),
  plannedEndDate: Joi.date()
    .format('YYYY-MM-DD')
    .iso()
    .allow('', null)
    .min(Joi.ref('plannedStartDate'))
    .max(DATE_EXTREMES.max)
    .messages({
      'date.base': 'Provide an end date.',
      'date.format': 'Provide an end date.',
      'date.min': 'Provide an end date that is after the start date.',
      'date.max': 'Provide a valid year.',
      'any.ref': 'Provide an end date that is after the start date.'
    })
});

export default activityScheduleSchema;
