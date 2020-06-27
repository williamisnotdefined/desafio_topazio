import { Request, Response } from 'express';

import IListUsersDTO from '@modules/user/dtos/IListUsersDTO';
import IEditUserDTO from '@modules/user/dtos/IEditUserDTO';

import createUserService from '@modules/user/services/CreateUserService';
import listUsersService from '@modules/user/services/ListUsersService';
import viewUserService from '@modules/user/services/ViewUserService';
import editUserService from '@modules/user/services/EditUserService';
import deleteUserService from '@modules/user/services/DeleteUserService';
import addFavoriteBookUserService from '@modules/user/services/AddFavoriteBookUserService';

class UserController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { name, age, phone, email, password, role } = request.body;

        const user = await createUserService({
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
        const q = request.query;
        const { name, age, phone, email, role, page = 1, limit = 5 } = q;

        const filters = <IListUsersDTO>{
            name,
            age,
            phone,
            email,
            role,
            page,
            limit
        };

        const users = await listUsersService(filters);

        return response.json(users);
    }

    public async view(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const user = await viewUserService(id);

        return response.json(user);
    }

    public async edit(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, age, phone, email } = request.body;

        const userData = {
            id,
            name,
            age,
            phone,
            email
        } as IEditUserDTO;

        const user = await editUserService(userData);

        return response.json(user);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params;

        await deleteUserService(id);

        return response.status(204).send();
    }

    public async favoriteBook(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { user } = request;
        const { id: bookId } = request.params;

        const updatedUser = await addFavoriteBookUserService(bookId, user._id);

        return response.json({ user: updatedUser });
    }
}

export default new UserController();
