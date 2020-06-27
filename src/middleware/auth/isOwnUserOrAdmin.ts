import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';
import { Role } from '@modules/user/schema/UserSchema';

const isOwnUserOrAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
): NextFunction | void => {
    const { id } = req.params;
    const { user } = req;

    if (user.id === id || user.role === Role.ADMIN) {
        return next();
    }

    throw new AppError(
        'Somente o administrador do sistema ou o próprio usuário podem ver este usuário.'
    );
};

export default isOwnUserOrAdmin;
