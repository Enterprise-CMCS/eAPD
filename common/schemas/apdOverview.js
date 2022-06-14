import Joi from 'joi';

const apdOverviewSchema = fundingSources => {
  console.log('passed in fundingSources', fundingSources);
  return Joi.object({
    programOverview: Joi.string().trim().min(1).required().messages({
      'string.base': 'Provide a brief introduction to the state program.',
      'string.empty': 'Provide a brief introduction to the state program.',
      'string.min': 'Provide a brief introduction to the state program.'
    }),
    narrativeHIT: Joi.string().trim().min(1).required().messages({
      'string.base': 'Provide a summary of HIT-funded activities.',
      'string.empty': 'Provide a summary of HIT-funded activities.',
      'string.min': 'Provide a summary of HIT-funded activities.'
    }),
    narrativeHIE: Joi.string().trim().min(1).required().messages({
      'string.base': 'Provide a summary of HIE-funded activities.',
      'string.empty': 'Provide a summary of HIE-funded activities.',
      'string.min': 'Provide a summary of HIE-funded activities.'
    }),
    narrativeMMIS: Joi.string().trim().min(1).required().messages({
      'string.base': 'Provide a summary of MMIS-funded activities.',
      'string.empty': 'Provide a summary of MMIS-funded activities.',
      'string.min': 'Provide a summary of MMIS-funded activities.'
    })
  });
};

export default apdOverviewSchema;
