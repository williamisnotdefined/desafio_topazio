import { Request, Response } from 'express';

import createBookService from '@modules/book/services/CreateBookService';
import listBookService from '@modules/book/services/ListBookService';
import viewBookService from '@modules/book/services/ViewBookService';
import editBookService from '@modules/book/services/EditBookService';
import deleteBookService from '@modules/book/services/DeleteBookService';
import saveCoverBookService from '@modules/book/services/SaveCoverBookService';

import IListBookDTO from '@modules/book/dtos/IListBookDTO';

class BookController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { title, isbn, category, year } = request.body;

        const book = await createBookService({
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

        const books = await listBookService({
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

        const book = await viewBookService(id);

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

        const user = await editBookService(bookData);

        return response.json(user);
    }

    public async delete(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { id } = request.params;

        await deleteBookService(id);

        return response.status(204).send();
    }

    public async saveCover(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { filename: coverFilename } = request.file;
        const { id: bookId } = request.params;

        const book = await saveCoverBookService(bookId, coverFilename);

        return response.json(book);
    }
}

export default new BookController();
