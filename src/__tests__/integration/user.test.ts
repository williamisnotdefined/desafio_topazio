import request from 'supertest';

import { Role } from '@modules/user/schema/UserSchema';

import app from '../../app';
import { connect, clearDatabase, closeDatabase } from '../utils/mockMongo';
import factory from '../utils/factories';

import { IFakeUser } from '../utils/interfaces';

const fakeUser = {
    name: 'Fake User',
    age: 20,
    phone: '55-123456789',
    email: 'fake@user.com',
    password: '123456',
    role: 0
};

const credentials = {
    email: fakeUser.email,
    password: fakeUser.password
};

const editedUser = {
    name: 'edited name',
    age: 1,
    phone: '51-989495739',
    email: 'edited@mail.com'
};

const api = request(app);

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
        const user = <IFakeUser>await factory.create('User', credentials);

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { status } = await api
            .delete(`/api/v1/user/${user._id}`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(204);
    });

    it('should be able to admin delete an another user account', async () => {
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
        await factory.create('User', { ...credentials, role: Role.ADMIN });

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { body, status } = await api
            .delete(`/api/v1/user/6ef664b678c5f0626e8a937d`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(404);
        expect(body.message).toBe('Usuário não existe.');
    });

    it('should be able to edit an user', async () => {
        const user = <IFakeUser>(
            await factory.create('User', { ...credentials })
        );
        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { body, status } = await api
            .put(`/api/v1/user/${user._id}`)
            .send(editedUser)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(200);
        expect(body.name).toBe(editedUser.name);
        expect(body.age).toBe(editedUser.age);
        expect(body.phone).toBe(editedUser.phone);
        expect(body.email).toBe(editedUser.email);
    });

    it('should not be able to edit an user that not exists', async () => {
        await factory.create('User', { ...credentials, role: Role.ADMIN });

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const user = <IFakeUser>await factory.create('User');

        await api
            .delete(`/api/v1/user/${user._id}`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        const { body, status } = await api
            .put(`/api/v1/user/${user._id}`)
            .send(editedUser)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(404);
        expect(body.message).toBe('Usuário não existe.');
    });

    it('should be able to list users to admin', async () => {
        await factory.create('User', { ...credentials, role: Role.ADMIN });

        await factory.create('User', {
            name: 'William',
            email: 'mail1@mail.com'
        });
        await factory.create('User', { age: 10, email: 'mail2@mail.com' });
        await factory.create('User', {
            phone: '51-989495739',
            email: 'mail3@mail.com'
        });

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { body: bodyName, status: statusName } = await api
            .get(`/api/v1/user?name=william`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(statusName).toBe(200);
        expect(bodyName).toHaveProperty('docs');
        expect(bodyName.docs.length).toBeGreaterThanOrEqual(1);

        const { body: bodyAge, status: statusAge } = await api
            .get(`/api/v1/user?age=10`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(statusAge).toBe(200);
        expect(bodyAge).toHaveProperty('docs');
        expect(bodyAge.docs.length).toBeGreaterThanOrEqual(1);

        const {
            body: bodyPhoneMailRole,
            status: statusPhoneMailRole
        } = await api
            .get(`/api/v1/user?phone=51-989495739&email=mail3@mail.com&role=0`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(statusPhoneMailRole).toBe(200);
        expect(bodyPhoneMailRole).toHaveProperty('docs');
        expect(bodyPhoneMailRole.docs.length).toBeGreaterThanOrEqual(1);
    });

    it('should be able to view an user', async () => {
        const user = <IFakeUser>(
            await factory.create('User', { ...credentials })
        );

        const authenticated = await api.post('/api/v1/auth').send(credentials);

        const { body, status } = await api
            .get(`/api/v1/user/${user._id}`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(200);
        expect(body.name).toBe(user.name);
        expect(body.age).toBe(user.age);
        expect(body.email).toBe(user.email);
        expect(body.phone).toBe(user.phone);
        expect(body.role).toBe(user.role);
        expect(body.favorites.length).toBe(user?.favorites?.length || 0);
    });

    it('should not be able to view an user that doest exist', async () => {
        await factory.create('User', { ...credentials, role: Role.ADMIN });
        const user = <IFakeUser>await factory.create('User');
        const authenticated = await api.post('/api/v1/auth').send(credentials);

        await api
            .delete(`/api/v1/user/${user._id}`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        const { body, status } = await api
            .get(`/api/v1/user/${user._id}`)
            .set('Authorization', `Bearer ${authenticated.body.token}`);

        expect(status).toBe(404);
        expect(body.message).toBe('Usuário não existe.');
    });
});
