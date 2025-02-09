const express = require('express');
const jwt = require('jsonwebtoken');
const { urlCorta, listar, eliminarUrl, urlsMasUsadas, ReportePorFechas, urlsMenosUsadas, urlsUltimoMes } = require('../controllers/urlController');
const verificarToken = require('../middlewares/autenticador');
const router = express.Router();
const SECRET_KEY = 'shorturl';

/**
 * @swagger
 * /api/urls:
 *   post:
 *     summary: Crea una nueva URL corta.
 *     description: Guarda una URL original y devuelve una URL corta. El parámetro `maxUses` es opcional y tiene un valor predeterminado de 5.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 description: La URL original que se desea acortar.
 *               maxUses:
 *                 type: integer
 *                 description: Número máximo de usos (por defecto 5).
 *           examples:
 *             solourl:
 *               summary: Ejemplo con solo la URL original.
 *               value:
 *                 originalUrl: "https://example.com"
 *             conmaxuses:
 *               summary: Ejemplo con URL y maxUses.
 *               value:
 *                 originalUrl: "https://example.com"
 *                 maxUses: 10
 *     responses:
 *       201:
 *         description: URL creada con éxito.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               originalUrl: "https://example.com"
 *               shortUrl: "abc123"
 *               maxUses: 10
 *               createdAt: "2025-02-06 10:00:00"
 *       400:
 *         description: La URL original es obligatoria.
 *       500:
 *         description: Error al guardar la URL en la base de datos.
 */

router.post('/', urlCorta);

/**
 * @swagger
 * /api/urls:
 *   get:
 *     summary: Lista todas las URLs.
 *     description: Devuelve una lista de todas las URLs almacenadas en la base de datos.
 *     responses:
 *       200:
 *         description: Lista de URLs.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 originalUrl: "https://example.com"
 *                 shortUrl: "abc123"
 *                 useCount: 2
 *                 maxUses: 5
 *                 createdAt: "2025-02-06T10:00:00Z"
 *       500:
 *         description: Error al obtener las URLs.
 */
router.get('/', listar);

/**
 * @swagger
 * /api/urls/{id}:
 *   delete:
 *     summary: Eliminar una URL.
 *     description: Elimina una URL específica de la base de datos. Requiere un token de autenticación.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la URL a eliminar.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: URL eliminada con éxito.
 *       401:
 *         description: Acceso no autorizado o token inválido.
 *       404:
 *         description: URL no encontrada.
 *       500:
 *         description: Error al eliminar la URL.
 */


router.delete('/:id', verificarToken, eliminarUrl);

/**
 * @swagger
 * /api/urls/reports/top-urls:
 *   get:
 *     summary: Obtener las URLs más usadas.
 *     description: Devuelve una lista de las URLs ordenadas por el número de usos, de mayor a menor.
 *     responses:
 *       200:
 *         description: Lista de URLs más usadas.
 *       500:
 *         description: Error al obtener las URLs más usadas.
 */
router.get('/reports/top-urls', urlsMasUsadas);

/**
 * @swagger
 * /api/urls/reports/least-used:
 *   get:
 *     summary: Obtener las URLs menos usadas.
 *     description: Devuelve una lista de las URLs ordenadas por el número de usos, de menor a mayor.
 *     responses:
 *       200:
 *         description: Lista de URLs menos usadas.
 *       500:
 *         description: Error al obtener las URLs menos usadas.
 */
router.get('/reports/least-used', urlsMenosUsadas);

/**
 * @swagger
 * /api/urls/reports/fechas:
 *   get:
 *     summary: Obtener URLs por rango de fechas.
 *     description: Devuelve una lista de URLs creadas entre las fechas especificadas.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio (YYYY-MM-DD).
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin (YYYY-MM-DD).
 *     responses:
 *       200:
 *         description: Lista de URLs creadas en el rango de fechas.
 *       400:
 *         description: Debes proporcionar fecha de inicio y fecha de fin.
 *       500:
 *         description: Error al obtener el reporte por fechas.
 */
router.get('/reports/fechas', ReportePorFechas);

/**
 * @swagger
 * /api/urls/reports/last-month:
 *   get:
 *     summary: Obtener URLs creadas en el último mes.
 *     description: Devuelve una lista de las URLs creadas en los últimos 30 días.
 *     responses:
 *       200:
 *         description: Lista de URLs creadas en los últimos 30 días.
 *       500:
 *         description: Error al obtener el reporte del último mes.
 */
router.get('/reports/last-month', urlsUltimoMes);

/**
 * @swagger
 * /api/urls/token:
 *   get:
 *     summary: Obtener un token de autenticación.
 *     description: Genera un token de autenticación válido por 1 hora.
 *     responses:
 *       200:
 *         description: Token generado con éxito.
 *       500:
 *         description: Error al generar el token.
 */
router.get('/token', (req, res) => {
  const token = jwt.sign({ usuario: 'jary' }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;
