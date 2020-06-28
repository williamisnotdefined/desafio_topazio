import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import Book, { IBook } from '../schema/BookSchema';

const saveCoverBookService = async (
    id: string,
    coverFilename: string
): Promise<IBook> => {
    const book = await Book.findById(id);

    if (!book) {
        const bookCoverFilePath = path.join(
            uploadConfig.directory,
            coverFilename
        );

        const coverFileExists = await fs.promises.stat(bookCoverFilePath);

        if (coverFileExists) {
            await fs.promises.unlink(bookCoverFilePath);
        }

        throw new AppError('Livro não existe.', 404);
    }

    if (book.cover) {
        const bookCoverFilePath = path.join(uploadConfig.directory, book.cover);

        const coverFileExists = await fs.promises.stat(bookCoverFilePath);

        if (coverFileExists) {
            await fs.promises.unlink(bookCoverFilePath);
        }
    }

    book.cover = coverFilename;
    await book.save();

    return book;
};

export default saveCoverBookService;
