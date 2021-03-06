import AppError from '@shared/errors/AppError';

import User, { IUser } from '../schema/UserSchema';

const viewUserService = async (id: string): Promise<IUser> => {
    const user = await User.findById(id).populate('favorites');

    if (!user) {
        throw new AppError('Usuário não existe.', 404);
    }

    return user;
};

export default viewUserService;
