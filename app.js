const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlRutas = require('./rutas/urlRutas');
const { redirigirUrl } = require('./controllers/urlController');
const db = require('./database/db');
const swaggerSetup = require('./swagger');
const app = express();


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Swagger - documentacion
swaggerSetup(app);

// crear 'shorturl-client' para poder visualizar la interfaz
app.use(express.static('shorturl-client'));

// Rutas de la API
app.use('/api/urls', urlRutas);

// Ruta para redirigir a la URL original
app.get('/:shortUrl', redirigirUrl);

/**
 * @swagger
 * /{shortUrl}:
 *   get:
 *     summary: Redirigir a la URL original.
 *     description: Redirige a la URL original asociada a la URL corta si no ha alcanzado el número máximo de usos.
 *     parameters:
 *       - in: path
 *         name: shortUrl
 *         required: true
 *         schema:
 *           type: string
 *         description: Identificador único de la URL corta.
 *     responses:
 *       302:
 *         description: Redirección a la URL original.
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *             description: La URL original a la que se redirige.
 *       403:
 *         description: La URL ha alcanzado el número máximo de usos y ha expirado.
 *       404:
 *         description: La URL no fue encontrada.
 *       500:
 *         description: Error al buscar la URL en la base de datos.
 */


// Si el archivo se ejecuta directamente, inicia el servidor
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;
