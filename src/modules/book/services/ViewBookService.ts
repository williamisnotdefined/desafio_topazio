import AppError from '@shared/errors/AppError';

import Book, { IBook } from '../schema/BookSchema';

const viewBookService = async (id: string): Promise<IBook> => {
    const book = await Book.findById(id);

    if (!book) {
        throw new AppError('Livro não existe.', 404);
    }

    return book;
};

export default viewBookService;
