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
  name: Joi.string(),
  years: Joi.array().min(1).required().messages({
    'array.min': 'Select at least one year.'
  }),
  apdOverview: Joi.object({
    programOverview: Joi.string(),
    updateStatus: Joi.object({
      annualUpdate: Joi.boolean(),
      asNeededUpdate: Joi.boolean(),
      isUpdateAPD: Joi.boolean()
    }),
    medicaidBusinessAreas: Joi.object({
      waiverSupportSystems: Joi.boolean(),
      assetVerificationSystem: Joi.boolean(),
      claimsProcessing: Joi.boolean(),
      decisionSupportSystemDW: Joi.boolean(),
      electronicVisitVerification: Joi.boolean(),
      encounterProcessingSystemMCS: Joi.boolean(),
      financialManagement: Joi.boolean(),
      healthInformationExchange: Joi.boolean(),
      longTermServicesSupports: Joi.boolean(),
      memberManagement: Joi.boolean(),
      pharmacyBenefitManagementPOS: Joi.boolean(),
      programIntegrity: Joi.boolean(),
      providerManagement: Joi.boolean(),
      thirdPartyLiability: Joi.boolean(),
      other: Joi.boolean(),
      otherMedicaidBusinessAreas: Joi.string()
    })
  })
});

export default apdNewSchema;
