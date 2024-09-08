// Modules
import { Router } from 'express';

import authRouter from './auth.routes';
import seedRouter from './seed.routes';
import employeeRouter from './employee.routes';

const routes = Router();

routes.use('/seed', seedRouter)
routes.use('/auth', authRouter)
routes.use('/employees', employeeRouter)

export default routes