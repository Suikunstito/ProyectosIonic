const jsonServer = require('json-server');
const express = require('express');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('_JSON-SERVER/publicaciones.json'); // Reemplaza con la ruta correcta a tu archivo de datos JSON
const middlewares = jsonServer.defaults();

server.use(cors()); // Habilita CORS

server.use(middlewares);
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
