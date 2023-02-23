import Joi from 'joi';

const medicaidBusinessAreasSchema = Joi.object({
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
  otherMedicaidBusinessAreas: Joi.when('other', {
    is: true,
    then: Joi.string().trim().min(1).required().messages({
      'string.base': 'Provide Other Medicaid Business Area(s).',
      'string.empty': 'Provide Other Medicaid Business Area(s).',
      'string.required': 'Provide Other Medicaid Business Area(s).'
    }),
    otherwise: Joi.any()
  })
})
  .or(
    'waiverSupportSystems',
    'assetVerificationSystem',
    'claimsProcessing',
    'decisionSupportSystemDW',
    'electronicVisitVerification',
    'encounterProcessingSystemMCS',
    'financialManagement',
    'healthInformationExchange',
    'longTermServicesSupports',
    'memberManagement',
    'pharmacyBenefitManagementPOS',
    'programIntegrity',
    'providerManagement',
    'thirdPartyLiability',
    'other',
    { isPresent: resolved => resolved === true }
  )
  .messages({
    'object.missing': 'Select at least one Medicaid Business Area.'
  });

export default medicaidBusinessAreasSchema;
