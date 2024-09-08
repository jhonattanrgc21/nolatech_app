// Modules
import { Router } from 'express';

import authRouter from './auth.routes';
import seedRouter from './seed.routes';
import employeeRouter from './employee.routes';
import evaluationRouter from './evaluation.routes';
import { authMiddleware } from '../middlewares/authMiddleware';
import { verifyRole } from '../middlewares/roleMiddleware';

const routes = Router();

routes.use('/seed', seedRouter)
routes.use('/auth', authRouter)
routes.use('/employees', authMiddleware, verifyRole(["Admin", "Manager"]), employeeRouter)
routes.use('/evaluations', evaluationRouter)

export default routes