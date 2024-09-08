// Modules
import { Router } from 'express';

import authRouter from './auth.routes';
import seedRouter from './seed.routes';

const routes = Router();

routes.use('/seed', seedRouter)
routes.use('/auth', authRouter)

export default routes