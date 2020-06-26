import { Router } from 'express';

import UserRouter from '@modules/user/http/routes/User.routes';

const routes = Router();

routes.use('/user', UserRouter);

export default routes;
