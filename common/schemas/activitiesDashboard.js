import Joi from 'joi';

const activitiesDashboardSchema = Joi.array().min(1).messages({
  'array.min': 'Activities have not been added for this APD.'
});

export default activitiesDashboardSchema;
