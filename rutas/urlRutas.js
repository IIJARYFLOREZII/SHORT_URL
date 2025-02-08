const express = require('express');
const jwt = require('jsonwebtoken');
const { urlCorta, listar, eliminarUrl, urlsMasUsadas, ReportePorFechas, urlsMenosUsadas, urlsUltimoMes } = require('../controllers/urlController');
const verificarToken = require('../middlewares/autenticador');
const router = express.Router();
const SECRET_KEY = 'shorturl';  // Clave secreta para  el token

// Rutas para manejar las URLs
router.post('/', urlCorta);
router.get('/', listar);
router.delete('/:id', verificarToken, eliminarUrl);
router.get('/reports/top-urls', urlsMasUsadas);
router.get('/reports/least-used', urlsMenosUsadas);
router.get('/reports/fechas', ReportePorFechas);
router.get('/reports/last-month', urlsUltimoMes);

// generar el token
router.get('/token', (req, res) => {
  const token = jwt.sign({ usuario: 'jary' }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
