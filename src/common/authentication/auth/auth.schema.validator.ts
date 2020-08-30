// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('@hapi/joi');

export const authSchema = Joi.object({
    username: Joi.string().email().required(),

    password: Joi.string().alphanum().min(6).max(10).required(),
});