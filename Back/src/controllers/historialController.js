import * as service from '../services/historialService.js';

export async function agregarHistorial(req, res) {
  const { videoId, titulo, url } = req.body;
  const usuarioId = req.usuario.id;

  try {
    await service.agregar(usuarioId, { videoId, titulo, url });
    res.status(201).json({ mensaje: 'Historial guardado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function obtenerHistorial(req, res) {
  const usuarioId = req.usuario.id;
  const historial = await service.listar(usuarioId);
  res.json(historial);
}

export async function buscarHistorial(req, res) {
  const usuarioId = req.usuario.id;
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Debes enviar un término de búsqueda con ?q=' });
  }

  const resultados = await service.buscar(usuarioId, q);
  res.json(resultados);
}

export async function limpiarHistorial(req, res) {
  const usuarioId = req.usuario.id;

  try {
    await service.limpiar(usuarioId);
    res.json({ mensaje: 'Historial eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al limpiar historial' });
  }
}
