## Client Gateway
El Gateway es el punto de comunicación entre nuestros clientes y nuestros servicios.
Es el encargado de recibir las peticiones, enviarlas a los servicios correspondientes y devolver la respuesta al cliente.

## Dev

1. Clonar el repositorio
2. Instalar las dependencias `npm install && npm update`
3. Crear el archivo `.env` basado en el  `env.example`
4. Levantar el servidor de NATS
```
docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats
```
5. Tener levantados los microservicios que se van a consumir
6. Levantar el servidor con `npm run start:dev`
```