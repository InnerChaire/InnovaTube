import express from 'express';
import { autenticarToken } from '../middleware/authMiddleware.js';
import {
  agregarFavorito,
  obtenerFavoritos,
  eliminarFavorito
} from '../controllers/favoritosController.js';

const router = express.Router();

router.use(autenticarToken); // protege todas las rutas

router.get('/', obtenerFavoritos);
router.post('/', agregarFavorito);
router.delete('/:videoId', eliminarFavorito);

export default router;
