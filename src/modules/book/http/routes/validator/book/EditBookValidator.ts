import { celebrate, Segments, Joi } from 'celebrate';

const EditBookValidator = celebrate({
    [Segments.BODY]: {
        title: Joi.string(),
        isbn: Joi.string().max(13, 'utf8').min(10, 'utf8'),
        category: Joi.string(),
        year: Joi.number()
    }
});

export default EditBookValidator;
