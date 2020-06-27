import Router from 'express';

import AuthController from '../controllers/AuthController';

import * as validator from './validator/auth/auth';

const routes = Router();

routes.post('', [validator.AuthLoginValidator], AuthController.login);

export default routes;
