import fs from 'fs';
import path from 'path';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import Book from '../schema/BookSchema';

const deleteBookService = async (id: string): Promise<void> => {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
        throw new AppError('Livro não existe.', 404);
    }

    if (book.cover) {
        const bookCoverFilePath = path.join(uploadConfig.directory, book.cover);

        const coverFileExists = await fs.promises.stat(bookCoverFilePath);

        if (coverFileExists) {
            await fs.promises.unlink(bookCoverFilePath);
        }
    }
};

export default deleteBookService;
