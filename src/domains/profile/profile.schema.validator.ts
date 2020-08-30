// eslint-disable-next-line @typescript-eslint/no-var-requires
const Joi = require('@hapi/joi');

export const profileSchema = Joi.object({
    fullName: Joi.string().min(8).max(200).required(),

    birthday: Joi.date().required(),

    ssn: Joi.number().required(),

    idCard: Joi.number().required(),

    user: Joi.object({
        username: Joi.string().email().required(),

        password: Joi.string().alphanum().min(6).max(10).required(),
    }),
});