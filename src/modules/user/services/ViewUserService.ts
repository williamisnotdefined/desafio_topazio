import AppError from '@shared/errors/AppError';

import User, { IUser } from '../schema/UserSchema';

const CreateUserService = async (id: string): Promise<IUser> => {
    const user = await User.findById(id);

    if (!user) {
        throw new AppError('Usuário não existe.');
    }

    return user;
};

export default CreateUserService;
