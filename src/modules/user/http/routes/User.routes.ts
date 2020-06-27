import Router from 'express';
import asyncHandler from 'express-async-handler';

import { Role as UserRole } from '@modules/user/schema/UserSchema';
import UserController from '../controllers/UserController';
import {
    isAuthenticated,
    isAcceptableRole,
    isOwnUserOrAdmin
} from '@middleware/auth';

import {
    CreateUserValidator,
    PaginateUserValidation,
    EditUserValidator
} from './validator/user';

const routes = Router();

routes.post('', [CreateUserValidator], UserController.create);

routes.use(asyncHandler(isAuthenticated));

routes.get(
    '',
    [isAcceptableRole(UserRole.ADMIN), PaginateUserValidation],
    UserController.index
);

routes.get('/:id', [isOwnUserOrAdmin], UserController.view);

routes.put('/:id', [isOwnUserOrAdmin, EditUserValidator], UserController.edit);

export default routes;
