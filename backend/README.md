# Ejecutar en desarrollo

1. Clonar el repositorio
2. Instalar Node.js v20.14.0 

3. Instalar las dependencias
```
npm i
```

4. Levantar la Base de Datos de docker
```
docker-compose up -d
```

5. Ejecutar el API
```
npm run dev
```

6. Cargar la coleccion de endpoints en postman mediante el archivo Nolatech_API.postman_collection.json

7. Generar la data de prueba
```
http://localhost:3000/api/seed
```

