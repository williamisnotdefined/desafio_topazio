import { celebrate, Segments, Joi } from 'celebrate';

export const AuthLoginValidator = celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
});
