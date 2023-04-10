import Joi from 'joi';

export const dollarFieldReqAndMsg = Joi.number()
  .positive()
  .allow(0)
  .required()
  .messages({
    'number.base': 'Provide a dollar amount greater than or equal to $0',
    'number.empty': 'Provide a dollar amount greater than or equal to $0',
    'number.format': 'Provide a dollar amount greater than or equal to $0',
    'number.positive': 'Provide a dollar amount greater than or equal to $0',
    'number.allow': 'Provide a dollar amount greater than or equal to $0'
  });

export const previousActivityObject = Joi.object({
  totalApproved: dollarFieldReqAndMsg,
  federalActual: dollarFieldReqAndMsg
});

export const previousHitechActivitySchema = Joi.object().pattern(
  /\d{4}/,
  Joi.object({
    hithie: previousActivityObject,
    mmis: Joi.object({
      50: previousActivityObject,
      75: previousActivityObject,
      90: previousActivityObject
    })
  })
);

export const previousMmisActivitySchema = Joi.object().pattern(
  /\d{4}/,
  Joi.object({
    ddi: Joi.object({
      50: previousActivityObject,
      75: previousActivityObject,
      90: previousActivityObject
    }),
    mando: Joi.object({
      50: previousActivityObject,
      75: previousActivityObject
    })
  })
);
