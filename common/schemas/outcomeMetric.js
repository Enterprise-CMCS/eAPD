import Joi from 'joi';

const outcomeMetricsSchemas = Joi.object({
  id: Joi.any(),
  outcome: Joi.string().required().messages({
    'string.base': 'Outcome is required',
    'string.empty': 'Outcome is required'
  }),
  metrics: Joi.array().items(
    Joi.object({
      id: Joi.any(),
      key: Joi.any(),
      metric: Joi.string().messages({
        'string.base': 'Metric is required',
        'string.empty': 'Metric is required',
        'string.null': 'Metric is required'
      })
    })
  )
});

export default outcomeMetricsSchemas;
