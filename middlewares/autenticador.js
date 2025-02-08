const jwt = require('jsonwebtoken');
const SECRET_KEY = 'shorturl';  // Clave secreta para verificar el token

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];  // Leer el token del encabezado

  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado. Token requerido.' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Error al verificar el token:', err.message);  // Mostrar el mensaje de error en la consola
      return res.status(401).json({ error: 'Token inválido o expirado.' });
    }
    req.user = decoded;  // Guardar los datos decodificados del token en `req.user`
    next();  // Continuar con la siguiente función de la ruta
  });
};

module.exports = verificarToken;
