import deleteTmpFile from '@utils/deleteTmpFile';

import AppError from '@shared/errors/AppError';

import Book, { IBook } from '../schema/BookSchema';

const saveCoverBookService = async (
    id: string,
    coverFilename: string
): Promise<IBook> => {
    const book = await Book.findById(id);

    if (!book) {
        await deleteTmpFile(coverFilename);

        throw new AppError('Livro não existe.', 404);
    }

    if (book.cover) {
        await deleteTmpFile(book.cover);
    }

    book.cover = coverFilename;
    await book.save();

    return book;
};

export default saveCoverBookService;
