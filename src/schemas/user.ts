const Joi = require('joi');

export const userSignInPostSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	user_name: Joi.string(),
});
