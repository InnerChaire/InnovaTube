import * as service from '../services/favoritosService.js';

export async function agregarFavorito(req, res) {
  const { videoId, titulo, url } = req.body;
  const usuarioId = req.usuario.id;

  try {
    await service.agregar(usuarioId, { videoId, titulo, url });
    res.status(201).json({ mensaje: 'Favorito guardado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function obtenerFavoritos(req, res) {
  const usuarioId = req.usuario.id;
  const favoritos = await service.listar(usuarioId);
  res.json(favoritos);
}

export async function eliminarFavorito(req, res) {
  const usuarioId = req.usuario.id;
  const { videoId } = req.params;

  try {
    await service.eliminar(usuarioId, videoId);
    res.json({ mensaje: 'Favorito eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
}
