import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

import User, { IUser } from '../schema/UserSchema';

interface IRequestDTO {
    email: string;
    password: string;
}

interface IResponseDTO {
    user: IUser;
    token: string;
}

const CreateUserService = async ({
    email,
    password
}: IRequestDTO): Promise<IResponseDTO> => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError('Credenciais inválidas.', 401);
    }

    const correctPassword = compare(user.password, String(password));

    if (!correctPassword) {
        throw new AppError('Credenciais inválidas.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
        subject: user.id,
        expiresIn
    });

    return { user, token };
};

export default CreateUserService;
