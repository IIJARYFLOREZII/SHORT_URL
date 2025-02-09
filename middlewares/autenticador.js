const jwt = require('jsonwebtoken');
const SECRET_KEY = 'shorturl';  // Clave secreta para verificar el token

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];  // Leer el encabezado Authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token requerido.' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
    return res.status(401).json({ error: 'Formato de token inválido. Debe ser Bearer <token>.' });
  }

  const token = tokenParts[1];  // Extraer solo el token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err.message);
      return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = verificarToken;
