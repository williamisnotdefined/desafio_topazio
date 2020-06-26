import { Request, Response } from 'express';

import CreateUserService from '@modules/user/services/CreateUserService';

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
}

export default new UsersController();
