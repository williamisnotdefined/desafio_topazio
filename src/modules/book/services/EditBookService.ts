import AppError from '@shared/errors/AppError';

import Book, { IBook } from '../schema/BookSchema';
import IEditBookDTO from '@modules/book/dtos/IEditBookDTO';

const EditUserService = async (bookData: IEditBookDTO): Promise<IBook> => {
    const { id, title, isbn, category, year } = bookData;

    const user = await Book.findByIdAndUpdate(
        id,
        { title, isbn, category, year },
        { new: true }
    );

    if (!user) {
        throw new AppError('Livro não existe.', 404);
    }

    return user;
};

export default EditUserService;
