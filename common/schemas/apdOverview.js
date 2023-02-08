import Joi from 'joi';

const updateStatusSchema = Joi.object({
  isUpdateAPD: Joi.boolean().required().messages({
    'boolean.base': 'Select yes or no',
    'boolean.empty': 'Select yes or no',
    'boolean.required': 'Select yes or no'
  }),
  annualUpdate: Joi.when('isUpdateAPD', {
    is: true,
    then: Joi.boolean(),
    otherwise: Joi.any()
  }),
  asNeededUpdate: Joi.when('isUpdateAPD', {
    is: true,
    then: Joi.boolean(),
    otherwise: Joi.any()
  })
})
  .or('annualUpdate', 'asNeededUpdate')
  .messages({
    'object.missing': 'Select an update type'
  });

export const apdNameSchema = Joi.string()
  .pattern(/^((?!untitled).)*$/i)
  .min(1)
  .required()
  .messages({
    'any.required': 'Provide an APD name.',
    'string.empty': 'Provide an APD name.',
    'string.base': 'Provide an APD name.',
    'string.pattern.base': 'APD name cannot contain "untitled".'
  });

export const sharedApdOverviewFields = Joi.object({
  name: apdNameSchema
});

export const hitechOverviewSchema = Joi.object({
  updateStatus: updateStatusSchema,
  // Funding sources is not a user input but we use this as a dependency for
  // conditionally validating the narratives below
  fundingSources: Joi.array().items(Joi.string()).required().messages({
    'string.base': 'Funding sources are required',
    'string.empty': 'Funding sources are required'
  }),
  programOverview: Joi.string().messages({
    'string.base': 'Provide a brief introduction to the state program.',
    'string.empty': 'Provide a brief introduction to the state program.'
  }),
  narrativeHIT: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('HIT').required(), Joi.any()),
    then: Joi.string().messages({
      'string.base': 'Provide a summary of HIT-funded activities.',
      'string.empty': 'Provide a summary of HIT-funded activities.'
    }),
    otherwise: Joi.any()
  }),
  narrativeHIE: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('HIE').required(), Joi.any()),
    then: Joi.string().messages({
      'string.base': 'Provide a summary of HIE-funded activities.',
      'string.empty': 'Provide a summary of HIE-funded activities.'
    }),
    otherwise: Joi.any()
  }),
  narrativeMMIS: Joi.when('fundingSources', {
    is: Joi.array().items(Joi.string().valid('MMIS').required(), Joi.any()),
    then: Joi.string().messages({
      'string.base': 'Provide a summary of MMIS-funded activities.',
      'string.empty': 'Provide a summary of MMIS-funded activities.'
    }),
    otherwise: Joi.any()
  })
});

export const medicaidBusinessAreasSchema = Joi.object({
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

export const mmisOverviewSchema = Joi.object({
  updateStatus: updateStatusSchema,
  medicaidBusinessAreas: medicaidBusinessAreasSchema
});
