import express from 'express';
import { autenticarToken } from '../middleware/authMiddleware.js';
import {
  agregarHistorial,
  obtenerHistorial, 
  limpiarHistorial,
  buscarHistorial
} from '../controllers/historialController.js';

const router = express.Router();

router.use(autenticarToken); // proteger rutas

router.get('/', obtenerHistorial);
router.post('/', agregarHistorial);
router.delete('/', limpiarHistorial);       
router.get('/buscar', buscarHistorial);   


export default router;
