import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '@config/auth';

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

export default model<IUser>('User', UserSchmea);
