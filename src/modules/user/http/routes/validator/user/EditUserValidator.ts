import { celebrate, Segments, Joi } from 'celebrate';

const EditUserValidator = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        age: Joi.number().required(),
        phone: Joi.string().required(),
        email: Joi.string().email().required()
    })
});

export default EditUserValidator;
