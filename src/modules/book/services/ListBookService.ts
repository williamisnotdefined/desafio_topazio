import { PaginateOptions, PaginateResult, FilterQuery } from 'mongoose';

import IListBookDTO from '@modules/book/dtos/IListBookDTO';
import Book, { IBook } from '../schema/BookSchema';

interface PaginationQuery {
    title?: FilterQuery<IBook>;
    isbn?: string;
    category?: FilterQuery<IBook>;
    year?: number;
    role?: number;
}

const ListUserServices = async (
    filters: IListBookDTO
): Promise<PaginateResult<IBook>> => {
    const { title, isbn, category, year, page, limit } = filters;

    const query: PaginationQuery = {};

    if (title) query.title = { $regex: new RegExp(title), $options: 'i' };
    if (isbn) query.isbn = isbn;
    if (year) query.year = year;

    if (category) {
        query.category = { $regex: new RegExp(category), $options: 'i' };
    }

    const paginateOpts: PaginateOptions = {
        sort: '-createAt',
        limit: limit,
        page: page
    };

    const books = await Book.paginate(query, paginateOpts);

    return books;
};

export default ListUserServices;
