import AppError from '@shared/errors/AppError';

import ICreateBookDTO from '@modules/book/dtos/ICreateBookDTO';
import Book, { IBook } from '../schema/BookSchema';

const CreateBookService = async (book: ICreateBookDTO): Promise<IBook> => {
    const hasBook = await Book.findOne({ title: book.title });

    if (!hasBook) {
        const newBook = await Book.create(book);
        return newBook;
    }

    throw new AppError('Livro já cadastrado.');
};

export default CreateBookService;
