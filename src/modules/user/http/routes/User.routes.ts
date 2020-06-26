import Router from 'express';
// import AuthController from '../controllers/AuthController';
import UserController from '../controllers/UserController';
// import isAuthenticated from '@middleware/isAuthenticated';

import * as validator from './validator/user';

const routes = Router();

routes.post('', [validator.CreateUserValidator], UserController.create);
/*
created only to check who is authenticated to be used by dev when coding,
can be removed after test done
*/
// routes.get('/who-am-i', [isAuthenticated], AuthController.whoAmI);

export default routes;
