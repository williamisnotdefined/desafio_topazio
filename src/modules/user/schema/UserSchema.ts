import { Schema, model, Document, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '@config/auth';
import { IBook } from '@modules/book/schema/BookSchema';

export enum Role {
    USER = 0,
    ADMIN = 1
}

export interface IUser extends Document {
    name: string;
    age: number;
    phone: string;
    email: string;
    password: string;
    favorites?: IBook[];
    role: Role;

    checkIfUnencryptedPasswordIsValid(pwd: string): boolean;
    generateToken(): Promise<string>;
}

const UserSchmea = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        favorites: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
        role: {
            type: Number,
            enum: [Role.ADMIN, Role.USER],
            required: true,
            default: Role.USER
        }
    },
    {
        timestamps: true
    }
);

UserSchmea.plugin(paginate);

UserSchmea.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

UserSchmea.methods = {
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    },

    toJSON(): IUser {
        const user = this.toObject();
        delete user.password;
        return user;
    },

    generateToken(): string {
        const { expiresIn, secret } = authConfig.jwt;

        return jwt.sign({}, secret, {
            subject: this.id,
            expiresIn
        });
    }
};

type UserModel<T extends Document> = PaginateModel<T>;
const UserModel: UserModel<IUser> = model<IUser>('User', UserSchmea);

export default UserModel;
