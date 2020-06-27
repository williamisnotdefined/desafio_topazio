import AppError from '@shared/errors/AppError';

import User, { IUser, Role } from '../schema/UserSchema';
import IEditUserDTO from '@modules/user/dtos/IEditUserDTO';

const EditUserService = async (userData: IEditUserDTO): Promise<IUser> => {
    const { id, name, age, phone, email } = userData;

    const user = await User.findByIdAndUpdate(
        id,
        { name, age, phone, email },
        { new: true }
    );

    if (!user) {
        throw new AppError('Usuário não existe.');
    }

    return user;
};

export default EditUserService;
