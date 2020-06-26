import { Role } from '../schema/UserSchema';

export default interface ICreateUserDTO {
    name: string;
    age: number;
    phone: string;
    email: string;
    password: string;
    role: Role;
}
