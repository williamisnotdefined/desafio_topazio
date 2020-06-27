import AppError from '@shared/errors/AppError';

import User from '../schema/UserSchema';

const DeleteUserService = async (id: string): Promise<void> => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new AppError('Usuário não existe.');
    }
};

export default DeleteUserService;
