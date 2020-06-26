export default interface IListUsersDTO {
    name?: string;
    age?: number;
    phone?: string;
    email?: string;
    role?: number;

    page?: number;
    limit?: number;
}
