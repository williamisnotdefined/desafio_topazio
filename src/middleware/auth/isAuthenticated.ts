import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import User, { IUser } from '@modules/user/schema/UserSchema';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default async function isAuthenticated(
    req: Request,
    resp: Response,
    next: NextFunction
): Promise<NextFunction | void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('É necessário fazer login.', 401);
    }

    const [, token] = authHeader.split(' ');

    const { sub: userId } = verify(
        token,
        authConfig.jwt.secret
    ) as TokenPayload;

    const user = <IUser>await User.findById(userId);

    if (!user) {
        throw new AppError('Token inválido.', 401);
    }

    req.user = user as IUser;

    return next();
}
