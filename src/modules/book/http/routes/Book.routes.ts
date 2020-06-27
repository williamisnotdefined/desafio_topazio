import Router from 'express';
import asyncHandler from 'express-async-handler';

import { Role as UserRole } from '@modules/user/schema/UserSchema';
import BookController from '../controllers/BookController';

import { isAuthenticated, isAcceptableRole } from '@middleware/auth';

import { CreateBookValidator } from './validator/book';

const routes = Router();

// routes.post('', [CreateUserValidator], UserController.create);

routes.use(asyncHandler(isAuthenticated));

routes.post(
    '',
    [isAcceptableRole(UserRole.ADMIN), CreateBookValidator],
    BookController.create
);

// routes.get(
//     '',
//     [isAcceptableRole(UserRole.ADMIN), PaginateUserValidation],
//     UserController.index
// );

// routes.get('/:id', [isOwnUserOrAdmin], UserController.view);

// routes.put('/:id', [isOwnUserOrAdmin, EditUserValidator], UserController.edit);

// routes.delete('/:id', [isOwnUserOrAdmin], UserController.delete);

export default routes;
