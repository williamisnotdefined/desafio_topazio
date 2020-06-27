import { celebrate, Segments, Joi } from 'celebrate';

const CreateUserValidator = celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        age: Joi.number().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.number().required()
    }
});

export default CreateUserValidator;
