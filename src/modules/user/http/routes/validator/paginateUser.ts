import { celebrate, Segments, Joi } from 'celebrate';

export const PaginateUserValidation = celebrate({
    [Segments.QUERY]: {
        name: Joi.string(),
        age: Joi.number(),
        phone: Joi.string(),
        email: Joi.string().email(),
        role: Joi.number(),

        page: Joi.number(),
        limit: Joi.number()
    }
});
