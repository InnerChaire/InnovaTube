import { verificarToken } from '../config/jwt.js';

export function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Formato: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const payload = verificarToken(token);

  if (!payload) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }

  // Agregar el usuario al request para usarlo después
  req.usuario = payload;
  next();
}
