


// Modules
import App from './app.module';
import './database/database';
import dotenv from 'dotenv';

async function main(){
	// Para leer las variables de entorno
	dotenv.config();

	const PORT = process.env.NODE_PORT || 4000;

	// Iniciando la conexion a la BD
	try {
		const app = App();

		app.listen(PORT, () =>
			console.log(`Application is running on: http://localhost:${PORT}`),
		);
	} catch (error) {
		console.log('Error, database not found');
	}
}

main();