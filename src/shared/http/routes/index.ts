import { Router } from 'express';

import UserRouter from '@modules/user/http/routes/User.routes';
import AuthRouter from '@modules/user/http/routes/Auth.routes';
import BookRouter from '@modules/book/http/routes/Book.routes';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/user', UserRouter);
routes.use('/book', BookRouter);

export default routes;
