import { PaginateOptions, PaginateResult, FilterQuery } from 'mongoose';

import IListUsersDTO from '@modules/user/dtos/IListUsersDTO';
import User, { IUser, Role } from '../schema/UserSchema';

interface PaginationQuery {
    name?: FilterQuery<IUser>;
    age?: number;
    phone?: string;
    email?: FilterQuery<IUser>;
    role?: number;
}

const CreateUserService = async (
    filters: IListUsersDTO
): Promise<PaginateResult<IUser>> => {
    const { name, age, phone, email, role, page, limit } = filters;

    const query: PaginationQuery = {};

    if (name) query.name = { $regex: new RegExp(name), $options: 'i' };
    if (age) query.age = age;
    if (phone) query.phone = phone;
    if (email) query.email = { $regex: new RegExp(email), $options: 'i' };

    if (role === Role.ADMIN || role === Role.USER) {
        query.role = role;
    }

    const paginateOpts: PaginateOptions = {
        sort: '-createAt',
        limit: limit,
        page: page
    };

    const users = await User.paginate(query, paginateOpts);

    return users;
};

export default CreateUserService;
