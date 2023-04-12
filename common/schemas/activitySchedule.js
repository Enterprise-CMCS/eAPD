import DateExtension from '@joi/date';
import JoiImport from 'joi';
import { DATE_EXTREMES } from '../utils/constants.js';

const Joi = JoiImport.extend(DateExtension);

const activityScheduleSchema = Joi.object({
  plannedStartDate: Joi.date()
    .utc()
    .max(DATE_EXTREMES.max)
    .min(DATE_EXTREMES.min)
    .required()
    .messages({
      'date.required': 'Provide a valid start date.',
      'date.base': 'Provide a valid start date.',
      'date.empty': 'Provide a valid start date.',
      'date.utc': 'Provide a valid start date.',
      'date.max': 'Provide a valid start year.',
      'date.min': 'Provide a valid start year.'
    }),
  plannedEndDate: Joi.date()
    .utc()
    .allow('', null)
    .min(Joi.ref('plannedStartDate') || DATE_EXTREMES.min)
    .max(DATE_EXTREMES.max)
    .messages({
      'date.base': 'Provide a valid end date.',
      'date.utc': 'Provide a valid end date.',
      'any.ref': 'Provide an end date that is after the start date.',
      'date.min': 'Provide an end date that is after the start date.',
      'date.max': 'Provide a valid end year.'
    })
});

export default activityScheduleSchema;
