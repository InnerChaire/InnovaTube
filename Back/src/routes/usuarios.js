import express from 'express';
import { autenticarToken } from '../middleware/authMiddleware.js';
import { registrarUsuario, loginUsuario, actualizarUsuario, obtenerPerfil } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.put('/editar', autenticarToken, actualizarUsuario);
router.get('/perfil', autenticarToken, obtenerPerfil);

export default router;
