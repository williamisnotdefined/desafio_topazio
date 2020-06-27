import { Request, Response } from 'express';

import CreateBookService from '@modules/book/services/CreateBookService';

class BookController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { title, isbn, category, year } = request.body;

        const user = await CreateBookService({
            title,
            isbn,
            category,
            year
        });

        return response.json(user);
    }

    // public async index(
    //     request: Request,
    //     response: Response
    // ): Promise<Response> {
    //     const q = request.query;
    //     const { name, age, phone, email, role, page = 1, limit = 5 } = q;

    //     const filters = <IListUsersDTO>{
    //         name,
    //         age,
    //         phone,
    //         email,
    //         role,
    //         page,
    //         limit
    //     };

    //     const users = await ListUsersService(filters);

    //     return response.json(users);
    // }

    // public async view(request: Request, response: Response): Promise<Response> {
    //     const { id } = request.params;

    //     const user = await ViewUserService(id);

    //     return response.json(user);
    // }

    // public async edit(request: Request, response: Response): Promise<Response> {
    //     const { id } = request.params;
    //     const { name, age, phone, email } = request.body;

    //     const userData = {
    //         id,
    //         name,
    //         age,
    //         phone,
    //         email
    //     } as IEditUserDTO;

    //     const user = await EditUserService(userData);

    //     return response.json(user);
    // }

    // public async delete(
    //     request: Request,
    //     response: Response
    // ): Promise<Response> {
    //     const { id } = request.params;

    //     await DeleteUserService(id);

    //     return response.status(204).send();
    // }
}

export default new BookController();
