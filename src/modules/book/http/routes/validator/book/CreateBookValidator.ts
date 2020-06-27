import { celebrate, Segments, Joi } from 'celebrate';

const CreateBookValidator = celebrate({
    [Segments.BODY]: {
        title: Joi.string().required(),
        isbn: Joi.string().max(13, 'utf8').min(10, 'utf8').required(),
        category: Joi.string().required(),
        year: Joi.number().required()
    }
});

export default CreateBookValidator;
