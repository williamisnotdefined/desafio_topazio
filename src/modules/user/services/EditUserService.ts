import AppError from '@shared/errors/AppError';

import User, { IUser } from '../schema/UserSchema';
import IEditUserDTO from '@modules/user/dtos/IEditUserDTO';

const editUserService = async (userData: IEditUserDTO): Promise<IUser> => {
    const { id, name, age, phone, email } = userData;

    const user = await User.findByIdAndUpdate(
        id,
        { name, age, phone, email },
        { new: true }
    );

    if (!user) {
        throw new AppError('Usuário não existe.', 404);
    }

    return user;
};

export default editUserService;
