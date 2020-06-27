import { Schema, model, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate';

export interface IBook extends Document {
    title: string;
    isbn: string;
    category: string;
    year: number;
    cover: string;
}

const BookSchmea = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 13
        },
        category: {
            type: String,
            required: true
        },
        cover: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

BookSchmea.plugin(paginate);

type BookModel<T extends Document> = PaginateModel<T>;
const BookModel: BookModel<IBook> = model<IBook>('Book', BookSchmea);

export default BookModel;
