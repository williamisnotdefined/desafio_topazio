import Router from 'express';
// import AuthController from '../controllers/AuthController';
import AuthController from '../controllers/AuthController';
// import isAuthenticated from '@middleware/isAuthenticated';

import * as validator from './validator/auth';

const routes = Router();

routes.post('', [validator.AuthLoginValidator], AuthController.login);
/*
created only to check who is authenticated to be used by dev when coding,
can be removed after test done
*/
// routes.get('/who-am-i', [isAuthenticated], AuthController.whoAmI);

export default routes;
