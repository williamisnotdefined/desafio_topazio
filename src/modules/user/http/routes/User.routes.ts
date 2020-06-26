import Router from 'express';

import { Role as UserRole } from '@modules/user/schema/UserSchema';
import UserController from '../controllers/UserController';
import { isAuthenticated, isAcceptableRole } from '@middleware/auth';

import { CreateUserValidator, PaginateUserValidation } from './validator/user';

const routes = Router();

routes.post('', [CreateUserValidator], UserController.create);

routes.use(isAuthenticated);

routes.get(
    '',
    [isAcceptableRole(UserRole.ADMIN), PaginateUserValidation],
    UserController.index
);

routes.get('/:id', [isAcceptableRole(UserRole.ADMIN)], UserController.view);

export default routes;
