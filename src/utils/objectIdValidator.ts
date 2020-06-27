import { RequestHandler } from 'express';
import { celebrate, Joi } from 'celebrate';

const objectIdValidator = (param: string): RequestHandler =>
    celebrate({
        [param]: Joi.object({
            id: Joi.string()
                .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i)
                .required()
        })
    });

export default objectIdValidator;
