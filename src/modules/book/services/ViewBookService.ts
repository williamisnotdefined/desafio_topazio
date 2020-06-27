import AppError from '@shared/errors/AppError';

import Book, { IBook } from '../schema/BookSchema';

const ViewBookService = async (id: string): Promise<IBook> => {
    const book = await Book.findById(id);

    if (!book) {
        throw new AppError('Usuário não existe.');
    }

    return book;
};

export default ViewBookService;
