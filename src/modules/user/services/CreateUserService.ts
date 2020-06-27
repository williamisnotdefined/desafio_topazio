import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User, { IUser } from '../schema/UserSchema';

const createUserService = async (user: ICreateUserDTO): Promise<IUser> => {
    const hasUser = await User.findOne({ email: user.email });

    if (hasUser) {
        throw new AppError('Endereço de e-mail já cadastrado.');
    }

    const newUser = await User.create(user);
    return newUser;
};

export default createUserService;
