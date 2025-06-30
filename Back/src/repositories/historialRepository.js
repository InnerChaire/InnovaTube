import db from '../config/db.js';

export async function agregarHistorial({ usuarioId, videoId, titulo, url }) {
  await db.execute(
    'INSERT INTO historial (usuario_id, video_id, titulo, url) VALUES (?, ?, ?, ?)',
    [usuarioId, videoId, titulo, url]
  );
}

export async function obtenerHistorial(usuarioId) {
  const [rows] = await db.execute(
    'SELECT video_id, titulo, url, fecha FROM historial WHERE usuario_id = ? ORDER BY fecha DESC',
    [usuarioId]
  );
  return rows;
}

export async function contarHistorial(usuarioId) {
  const [rows] = await db.execute(
    'SELECT COUNT(*) AS total FROM historial WHERE usuario_id = ?',
    [usuarioId]
  );
  return rows[0].total;
}

export async function eliminarMasAntiguo(usuarioId) {
  await db.execute(
    `DELETE FROM historial 
     WHERE id = (
       SELECT id FROM (
         SELECT id FROM historial WHERE usuario_id = ? ORDER BY fecha ASC LIMIT 1
       ) AS subquery
     )`,
    [usuarioId]
  );
}

export async function buscarEnHistorial(usuarioId, termino) {
  const [rows] = await db.execute(
    `SELECT video_id, titulo, url, fecha
     FROM historial
     WHERE usuario_id = ? AND (titulo LIKE ? OR video_id = ?) 
     ORDER BY fecha DESC`,
    [usuarioId, `%${termino}%`, termino]
  );
  return rows;
}

export async function eliminarTodo(usuarioId) {
  await db.execute('DELETE FROM historial WHERE usuario_id = ?', [usuarioId]);
}
