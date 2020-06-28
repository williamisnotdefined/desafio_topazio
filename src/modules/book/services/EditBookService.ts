import AppError from '@shared/errors/AppError';

import Book, { IBook } from '../schema/BookSchema';
import IEditBookDTO from '@modules/book/dtos/IEditBookDTO';

const editBookService = async (bookData: IEditBookDTO): Promise<IBook> => {
    const { id, title, isbn, category, year } = bookData;

    const book = await Book.findByIdAndUpdate(
        id,
        { title, isbn, category, year },
        { new: true }
    );

    if (!book) {
        throw new AppError('Livro não existe.', 404);
    }

    return book;
};

export default editBookService;
