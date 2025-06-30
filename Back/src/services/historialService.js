import * as repo from '../repositories/historialRepository.js';

export async function agregar(usuarioId, { videoId, titulo, url }) {
  const total = await repo.contarHistorial(usuarioId);

  if (total >= 30) {
    await repo.eliminarMasAntiguo(usuarioId);
  }

  await repo.agregarHistorial({ usuarioId, videoId, titulo, url });
}

export async function listar(usuarioId) {
  return await repo.obtenerHistorial(usuarioId);
}

export async function buscar(usuarioId, termino) {
  return await repo.buscarEnHistorial(usuarioId, termino);
}

export async function limpiar(usuarioId) {
  await repo.eliminarTodo(usuarioId);
}
