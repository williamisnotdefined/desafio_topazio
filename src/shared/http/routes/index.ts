import { Router } from 'express';

import UserRouter from '@modules/user/http/routes/User.routes';
import AuthRouter from '@modules/user/http/routes/Auth.routes';

const routes = Router();

routes.use('/auth', AuthRouter);
routes.use('/user', UserRouter);

export default routes;
