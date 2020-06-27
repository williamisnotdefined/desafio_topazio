import AppError from '@shared/errors/AppError';

import User, { IUser } from '../schema/UserSchema';
import Book from '@modules/book/schema/BookSchema';

const AddFavoriteBookUserService = async (
    bookId: string,
    userId: string
): Promise<IUser> => {
    const book = await Book.findById(bookId);

    if (!book) {
        throw new AppError('Livro não existe.', 404);
    }

    const user = await User.findByIdAndUpdate(
        userId,

        { $addToSet: { favorites: book._id } },
        { new: true }
    );

    if (!user) {
        throw new AppError('Usuário não existe.', 404);
    }

    return user;
};

export default AddFavoriteBookUserService;
