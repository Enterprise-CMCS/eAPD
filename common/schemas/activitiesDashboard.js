import Joi from 'joi';

const activitiesDashboardSchema = Joi.array().min(1);

export default activitiesDashboardSchema;
