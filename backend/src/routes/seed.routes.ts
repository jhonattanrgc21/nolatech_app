import { Router } from 'express';
import { seed } from '../controllers/seed.controller';

const seedRouter = Router();

// Ruta para el seeder
seedRouter.get('/', seed);

export default seedRouter;
