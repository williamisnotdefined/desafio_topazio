import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import User from '@modules/user/schema/UserSchema';

const isAcceptableRole = (minimunRole: number) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const { userId } = req;

        if (!userId) {
            throw new AppError('É necessário fazer login.', 401);
        }

        const user = await User.findOne({ _id: userId });

        if (user && user.role >= minimunRole) {
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
