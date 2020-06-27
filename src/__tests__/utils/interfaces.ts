export interface IFakeUser {
    _id?: string;
    favorites?: IFakeBook[];
    name: string;
    age: number;
    phone: string;
    email: string;
    password: string;
    role: number;
}

export interface IFakeBook {
    _id?: string;
    title: string;
    isbn: string;
    category: string;
    year: number;
    cover?: string;
}
