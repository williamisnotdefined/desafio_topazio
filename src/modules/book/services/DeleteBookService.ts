import deleteTmpFile from '@utils/deleteTmpFile';
import AppError from '@shared/errors/AppError';

import Book from '../schema/BookSchema';

const deleteBookService = async (id: string): Promise<void> => {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
        throw new AppError('Livro não existe.', 404);
    }

    if (book.cover) {
        await deleteTmpFile(book.cover);
    }
};

export default deleteBookService;
