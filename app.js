const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const urlRutas = require('./rutas/urlRutas');
const { redirigirUrl } = require('./controllers/urlController');
const db = require('./database/db');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// crear 'shorturl-client' para poder visualizar la interfaz
app.use(express.static('shorturl-client'));

// Rutas de la API
app.use('/api/urls', urlRutas);

// Ruta para redirigir a la URL original
app.get('/:shortUrl', redirigirUrl);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
