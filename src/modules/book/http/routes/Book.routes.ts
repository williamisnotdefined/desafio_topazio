import Router from 'express';
import asyncHandler from 'express-async-handler';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { Role as UserRole } from '@modules/user/schema/UserSchema';
import BookController from '../controllers/BookController';

import { isAuthenticated, isAcceptableRole } from '@middleware/auth';

import {
    CreateBookValidator,
    PaginateBookValidator,
    EditBookValidator
} from './validator/book';

const upload = multer(uploadConfig);
const routes = Router();

routes.get('', [PaginateBookValidator], BookController.index);
routes.get('/:id', [PaginateBookValidator], BookController.view);

routes.use(asyncHandler(isAuthenticated));

routes.post(
    '',
    [isAcceptableRole(UserRole.ADMIN), CreateBookValidator],
    BookController.create
);

routes.put(
    '/:id',
    [isAcceptableRole(UserRole.ADMIN), EditBookValidator],
    BookController.edit
);

routes.delete(
    '/:id',
    [isAcceptableRole(UserRole.ADMIN)],
    BookController.delete
);

routes.post(
    '/save-cover/:id',
    [isAcceptableRole(UserRole.ADMIN), upload.single('cover')],
    BookController.saveCover
);

export default routes;
