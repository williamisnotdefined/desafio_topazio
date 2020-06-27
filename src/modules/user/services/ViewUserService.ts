import AppError from '@shared/errors/AppError';

import User, { IUser } from '../schema/UserSchema';

const ViewUserService = async (id: string): Promise<IUser> => {
    const user = await User.findById(id);

    if (!user) {
        throw new AppError('Usuário não existe.', 404);
    }

    return user;
};

export default ViewUserService;
