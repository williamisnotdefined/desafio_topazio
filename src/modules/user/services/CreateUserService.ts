import AppError from '@shared/errors/AppError';

import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User, { IUser } from '../schema/UserSchema';

const CreateUserService = async (user: ICreateUserDTO): Promise<IUser> => {
    const hasUser = await User.findOne({ email: user.email });

    if (!hasUser) {
        // const newUser = await User.create(user);
        // return newUser;
    }

    throw new AppError('Endereço de e-mail já cadastrado.');
};

export default CreateUserService;
