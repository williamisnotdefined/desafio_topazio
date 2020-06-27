import { Request, Response } from 'express';

import CreateBookService from '@modules/book/services/CreateBookService';
import ListBookService from '@modules/book/services/ListBookService';
import IListBookDTO from '@modules/book/dtos/IListBookDTO';

class BookController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { title, isbn, category, year } = request.body;

        const book = await CreateBookService({
            title,
            isbn,
            category,
            year
        });

        return response.json(book);
    }

    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const q = request.query;
        const { title, isbn, category, year, page = 1, limit = 5 } = q;

        const books = await ListBookService({
            title,
            isbn,
            category,
            year,
            page,
            limit
        } as IListBookDTO);

        return response.json(books);
    }

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
