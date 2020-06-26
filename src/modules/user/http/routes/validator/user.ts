import Joi from '@hapi/joi';
import expressJoiValidation from 'express-joi-validation';

const validator = expressJoiValidation.createValidator({});

export const CreateUserValidator = validator.body(
    Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        phone: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.number().required()
    })
);
