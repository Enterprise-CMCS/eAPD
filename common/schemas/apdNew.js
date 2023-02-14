import Joi from 'joi';
import { APD_TYPE } from '../utils/constants.js';

const apdNewSchema = Joi.object({
  apdType: Joi.string()
    .valid(APD_TYPE.HITECH, APD_TYPE.MMIS)
    .required()
    .messages({
      'any.only': 'Select an APD Type.',
      'any.required': 'Select an APD Type.'
    }),
  apdName: Joi.string().trim().min(1).required().messages({
    'any.only': 'Provide an APD name.',
    'any.required': 'Provide an APD name.',
    'string.empty': 'Provide an APD name',
    'string.min': 'Provide an APD name'
  }),
  years: Joi.array().min(1).required().messages({
    'array.min': 'Select at least one year.'
  }),
  updateStatus: Joi.when('apdType', {
    is: APD_TYPE.HITECH,
    then: Joi.object({
      typeStatus: Joi.object({
        annualUpdate: Joi.boolean(),
        asNeededUpdate: Joi.boolean()
      })
        .or('annualUpdate', 'asNeededUpdate', {
          isPresent: resolved => resolved === true
        })
        .messages({
          'object.missing': 'Select at least one type of update.'
        })
    }),
    otherwise: Joi.when('updateStatus.typeStatus.isUpdateAPD', {
      is: true,
      then: Joi.object({
        typeStatus: Joi.object({
          annualUpdate: Joi.boolean(),
          asNeededUpdate: Joi.boolean()
        })
          .or('annualUpdate', 'asNeededUpdate', {
            isPresent: resolved => resolved === true
          })
          .messages({
            'object.missing': 'Select at least one type of update.'
          })
      })
    })
  }),
  businessList: Joi.when('apdType', {
    is: APD_TYPE.MMIS,
    then: Joi.array().min(1).required().messages({
      'array.min': 'Provide Other Medicaid Business Area(s)',
      'any.only': 'Provide Other Medicaid Business Area(s)',
      'any.required': 'Provide Other Medicaid Business Area(s)'
    }),
    otherwise: Joi.any()
  }),
  otherDetails: Joi.when('businessList', {
    is: Joi.array().items(Joi.string()).has(Joi.string().valid('other')),
    then: Joi.string().min(1).required().messages({
      'string.empty': 'Provide Other Medicaid Business Area(s)',
      'any.required': 'Provide Other Medicaid Business Area(s)',
      'any.only': 'Provide Other Medicaid Business Area(s)'
    }),
    otherwise: Joi.any()
  })
});

export default apdNewSchema;

// const apdNewSchema = Joi.object({
//   apdType: Joi.string()
//     .valid(APD_TYPE.HITECH, APD_TYPE.MMIS)
//     .required()
//     .messages({
//       'any.only': 'Select an APD Type.',
//       'any.required': 'Select an APD Type.'
//     }),
//   name: Joi.string().trim().min(1).required().messages({
//     'any.only': 'Provide an APD name.',
//     'any.required': 'Provide an APD name.',
//     'string.empty': 'Provide an APD name',
//     'string.min': 'Provide an APD name'
//   }),
//   years: Joi.array().min(1).required().messages({
//     'array.min': 'Select at least one year.'
//   }),
//   updateStatus: Joi.when('apdType', {
//     is: APD_TYPE.HITECH,
//     then: Joi.object({
//       typStatus: Joi.object({
//         annualUpdate: Joi.boolean(),
//         asNeededUpdate: Joi.boolean(),
//         isUpdateAPD: Joi.boolean()
//       })
//     })
//       .or('annualUpdate', 'asNeededUpdate', {
//         isPresent: resolved => resolved === true
//       })
//       .messages({
//         'object.missing': 'Select at least one type of update.'
//       })
//   }),
//   medicaidBusinessAreas: Joi.object({
//     waiverSupportSystems: Joi.boolean(),
//     assetVerificationSystem: Joi.boolean(),
//     claimsProcessing: Joi.boolean(),
//     decisionSupportSystemDW: Joi.boolean(),
//     electronicVisitVerification: Joi.boolean(),
//     encounterProcessingSystemMCS: Joi.boolean(),
//     financialManagement: Joi.boolean(),
//     healthInformationExchange: Joi.boolean(),
//     longTermServicesSupports: Joi.boolean(),
//     memberManagement: Joi.boolean(),
//     pharmacyBenefitManagementPOS: Joi.boolean(),
//     programIntegrity: Joi.boolean(),
//     providerManagement: Joi.boolean(),
//     thirdPartyLiability: Joi.boolean(),
//     other: Joi.boolean(),
//     otherMedicaidBusinessAreas: Joi.string()
//   })
// });

// export default apdNewSchema;
