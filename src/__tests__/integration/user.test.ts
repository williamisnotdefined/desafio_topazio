import request from 'supertest';

import app from '../../app';
import { connect, clearDatabase, closeDatabase } from '../utils/mockMongo';
import factory from '../utils/factories';
import { Role } from '@modules/user/schema/UserSchema';

interface IFakeUser {
    _id?: string;
    name: string;
    age: number;
    phone: string;
    email: string;
    password: string;
    role: number;
}

const fakeUser = {
    name: 'Fake User',
    age: 20,
    phone: '55-123456789',
    email: 'fake@user.com',
    password: '123456',
    role: 0
};

const api = request(app);

// const fakeAdmin = {
//     ...fakeUser,
//     name: 'Fake Admin',
//     email: 'fake@admin.com',
//     role: 1
// };

describe('Users', () => {
    beforeAll(async () => await connect());

    afterEach(async () => await clearDatabase());

    afterAll(async () => await closeDatabase());

    it('should be able to create user with correct credentials', async () => {
        const { body, status } = await api.post('/api/v1/user').send(fakeUser);

        expect(status).toBe(200);
        expect(body.name).toBe(fakeUser.name);
        expect(body.age).toBe(fakeUser.age);
        expect(body.phone).toBe(fakeUser.phone);
        expect(body.email).toBe(fakeUser.email);
        expect(body.role).toBe(fakeUser.role);
    });

    it('should not be able to create user with duplicated email', async () => {
        await factory.create('User', { email: fakeUser.email });
        const { body, status } = await api.post('/api/v1/user').send(fakeUser);

        expect(status).toBe(400);
        expect(body.message).toBe('Endereço de e-mail já cadastrado.');
    });

    it('should be able to user delete your own account', async () => {
        const credentials = {
            email: fakeUser.email,
            password: '123456'
        };

        const user = <IFakeUser>await factory.create('User', credentials);

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { status } = await api
            .delete(`/api/v1/user/${user._id}`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(204);
    });

    it('should be able to admin delete an another user account', async () => {
        const credentials = {
            email: fakeUser.email,
            password: '123456'
        };

        const user = <IFakeUser>await factory.create('User');

        await factory.create('User', { ...credentials, role: Role.ADMIN });

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { status } = await api
            .delete(`/api/v1/user/${user._id}`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(204);
    });

    it('should not be able to unauthenticated user delete an account', async () => {
        const user = <IFakeUser>await factory.create('User');

        const { body, status } = await api.delete(`/api/v1/user/${user._id}`);

        expect(status).toBe(401);
        expect(body.message).toBe('É necessário fazer login.');
    });

    it('should not be  able to a not admin user delete another user account', async () => {
        const credentials = {
            email: fakeUser.email,
            password: '123456'
        };

        const user = <IFakeUser>await factory.create('User');

        await factory.create('User', { ...credentials });

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { body, status } = await api
            .delete(`/api/v1/user/${user._id}`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(400);
        expect(body.message).toBe(
            'Somente o administrador do sistema ou o próprio usuário podem ver este usuário.'
        );
    });

    it('should not be able to delete an account that doesnt exists', async () => {
        const credentials = {
            email: fakeUser.email,
            password: '123456'
        };

        await factory.create('User', { ...credentials, role: Role.ADMIN });

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { body, status } = await api
            .delete(`/api/v1/user/fakeid1213123`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(400);
        expect(body.message).toBe(
            'Somente o administrador do sistema ou o próprio usuário podem ver este usuário.'
        );
    });
});
