import request from 'supertest';

import app from '../../app';
import { connect, clearDatabase, closeDatabase } from '../utils/mockMongo';
import factory from '../utils/factories';

import { IFakeUser } from '../utils/interfaces';

const api = request(app);

describe('Auth', () => {
    beforeAll(async () => await connect());

    afterEach(async () => await clearDatabase());

    afterAll(async () => await closeDatabase());

    it('should be able to login with correct credentials', async () => {
        const user = <IFakeUser>(
            await factory.create('User', { password: '123456' })
        );

        const { body, status } = await api.post('/api/v1/auth').send({
            email: user.email,
            password: '123456'
        });

        expect(status).toBe(200);
        expect(body).toHaveProperty('user');
        expect(body).toHaveProperty('token');
    });

    it('should not be able to login with wrong email', async () => {
        const user = <IFakeUser>await factory.create('User');

        const { body, status } = await api.post('/api/v1/auth').send({
            email: 'wrong@mail.com',
            password: user.password
        });

        expect(status).toBe(401);
        expect(body.message).toBe('Credenciais inválidas.');
    });

    it('should not be able to login with wrong password', async () => {
        const user = <IFakeUser>await factory.create('User');

        const { body, status } = await api.post('/api/v1/auth').send({
            email: user.email,
            password: 'wrong_pwd_123456'
        });

        expect(status).toBe(401);
        expect(body.message).toBe('Credenciais inválidas.');
    });
});
