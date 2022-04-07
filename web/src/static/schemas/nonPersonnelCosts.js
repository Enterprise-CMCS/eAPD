import Joi from 'joi';

const nonPersonnelCostsSchema = Joi.object({
	key: Joi.string(),
	category: Joi.string()
		.valid('Hardware, software, and licensing', 'Equipment and supplies', 'Training and outreach', 'Travel', 'Administrative operations', 'Miscellaneous expenses for the project')
		.messages({
			'any.only': 'Provide an expense category.',
		}),
	description: Joi.string()
		.required()
		.messages({
			'string.empty': 'Provide an expense description.',
		}),
	years: Joi.object().pattern(
		/\d{4}/,
		Joi.number()
			.positive()
			.greater(0)
			.required()
			.messages({
				'number.base': 'Provide an annual cost.',
				'number.empty': 'Provide an annual cost.',
				'number.format': 'Provide a valid dollar value.',
				'number.positive': 'Provide an annual cost greater than $0.',
				'number.greater': 'Provide an annual cost greater than $0.',
			})
	),
});

export default nonPersonnelCostsSchema;
