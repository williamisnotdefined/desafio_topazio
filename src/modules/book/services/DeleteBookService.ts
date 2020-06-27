import AppError from '@shared/errors/AppError';

import Book from '../schema/BookSchema';

const DeleteBookService = async (id: string): Promise<void> => {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
        throw new AppError('Livro não existe.', 404);
    }
};

export default DeleteBookService;
