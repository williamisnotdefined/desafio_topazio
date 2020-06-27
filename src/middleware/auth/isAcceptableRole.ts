import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

const isAcceptableRole = (minimunRole: number) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): NextFunction | void => {
        const { user } = req;

        if (!user) {
            throw new AppError('É necessário fazer login.', 401);
        }

        if (user.role >= minimunRole) {
            next();
        } else {
            throw new AppError(
                'Você não tem permissão para esta requisição.',
                401
            );
        }
    };
};

export default isAcceptableRole;
