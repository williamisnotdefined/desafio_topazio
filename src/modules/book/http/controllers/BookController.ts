import { Request, Response } from 'express';

import CreateBookService from '@modules/book/services/CreateBookService';
import ListBookService from '@modules/book/services/ListBookService';
import ViewBookService from '@modules/book/services/ViewBookService';
import EditBookService from '@modules/book/services/EditBookService';
import DeleteBookService from '@modules/book/services/DeleteBookService';

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

    public async view(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const book = await ViewBookService(id);

        return response.json(book);
    }

    public async edit(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { title, isbn, category, year } = request.body;

        const bookData = {
            id,
            title,
            isbn,
            category,
            year
        };

        const user = await EditBookService(bookData);

        return response.json(user);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params;

        await DeleteBookService(id);

        return response.status(204).send();
    }
}

export default new BookController();
