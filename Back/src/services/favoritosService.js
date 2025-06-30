import * as repo from '../repositories/favoritosRepository.js';

export async function agregar(usuarioId, { videoId, titulo, url }) {
  const existe = await repo.existeFavorito(usuarioId, videoId);
  if (existe) throw new Error('Este video ya está en tus favoritos');
  return await repo.agregarFavorito({ usuarioId, videoId, titulo, url });
}

export async function listar(usuarioId) {
  return await repo.obtenerFavoritos(usuarioId);
}

export async function eliminar(usuarioId, videoId) {
  await repo.eliminarFavorito(usuarioId, videoId);
}
