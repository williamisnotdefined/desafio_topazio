import { celebrate, Segments, Joi } from 'celebrate';

const PaginateUserValidation = celebrate({
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

export default PaginateUserValidation;
