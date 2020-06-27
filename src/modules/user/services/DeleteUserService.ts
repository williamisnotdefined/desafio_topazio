import AppError from '@shared/errors/AppError';

import User from '../schema/UserSchema';

const deleteUserService = async (id: string): Promise<void> => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        throw new AppError('Usuário não existe.', 404);
    }
};

export default deleteUserService;
