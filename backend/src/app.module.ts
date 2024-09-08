// Modules
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.routes';


// ======================================
//				Bootstraping
// ======================================
export default function App(){

    const app = express();

	// middlewares
	app.use(express.json());
	app.use(morgan('dev'));

	// Configurar cabeceras y cors
	app.use(cors());

	// Configuracion de rutas
	app.use('/api', routes);

	return app;
}