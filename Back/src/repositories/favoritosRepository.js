import db from '../config/db.js';

export async function agregarFavorito({ usuarioId, videoId, titulo, url }) {
  const [result] = await db.execute(
    'INSERT INTO favoritos (usuario_id, video_id, titulo, url) VALUES (?, ?, ?, ?)',
    [usuarioId, videoId, titulo, url]
  );
  return result.insertId;
}

export async function obtenerFavoritos(usuarioId) {
  const [rows] = await db.execute(
    'SELECT video_id, titulo, url FROM favoritos WHERE usuario_id = ?',
    [usuarioId]
  );
  return rows;
}

export async function eliminarFavorito(usuarioId, videoId) {
  await db.execute(
    'DELETE FROM favoritos WHERE usuario_id = ? AND video_id = ?',
    [usuarioId, videoId]
  );
}

export async function existeFavorito(usuarioId, videoId) {
  const [rows] = await db.execute(
    'SELECT id FROM favoritos WHERE usuario_id = ? AND video_id = ?',
    [usuarioId, videoId]
  );
  return rows.length > 0;
}
