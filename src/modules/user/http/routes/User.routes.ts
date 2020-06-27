import Router from 'express';
import asyncHandler from 'express-async-handler';
import { Segments } from 'celebrate';

import { Role as UserRole } from '@modules/user/schema/UserSchema';
import UserController from '../controllers/UserController';
import {
    isAuthenticated,
    isAcceptableRole,
    isOwnUserOrAdmin
} from '@middleware/auth';

import {
    CreateUserValidator,
    PaginateUserValidatior,
    EditUserValidator
} from './validator/user';

import objectIdValidator from '@utils/objectIdValidator';

const routes = Router();

routes.post('', [CreateUserValidator], UserController.create);

routes.use(asyncHandler(isAuthenticated));

routes.get(
    '',
    [isAcceptableRole(UserRole.ADMIN), PaginateUserValidatior],
    UserController.index
);

routes.get(
    '/:id',
    [objectIdValidator(Segments.PARAMS), isOwnUserOrAdmin],
    UserController.view
);

routes.put(
    '/:id',
    [objectIdValidator(Segments.PARAMS), isOwnUserOrAdmin, EditUserValidator],
    UserController.edit
);

routes.delete(
    '/:id',
    [objectIdValidator(Segments.PARAMS), isOwnUserOrAdmin],
    UserController.delete
);

routes.post('/favorite-book/:id', UserController.favoriteBook);

export default routes;
