import { Request, Response } from 'express';

import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListUsersService';
import IListUsersDTO from '@modules/user/dtos/IListUsersDTO';

class UsersController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { name, age, phone, email, password, role } = request.body;

        const user = await CreateUserService({
            name,
            age,
            phone,
            email,
            password,
            role
        });

        return response.json(user);
    }

    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const {
            name,
            age,
            phone,
            email,
            role,
            page = 1,
            limit = 5
        } = request.query;

        const filters = {
            name,
            age,
            phone,
            email,
            role,
            page,
            limit
        } as IListUsersDTO;

        const users = await ListUsersService(filters);

        return response.json(users);
    }
}

export default new UsersController();
