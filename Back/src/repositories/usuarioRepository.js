import db from '../config/db.js';

export async function crear({ nombre, apellido, correo, password }) {
  const [result] = await db.execute(
    'INSERT INTO usuarios (nombre, apellido, correo, password) VALUES (?, ?, ?, ?)',
    [nombre, apellido, correo, password]
  );
  return { id: result.insertId, nombre, apellido, correo };
}

export async function buscarPorCorreo(correo) {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE correo = ?', [correo]);
  return rows[0] || null;
}

export async function buscarPorNombreApellido(nombre, apellido) {
  const [rows] = await db.execute(
    'SELECT * FROM usuarios WHERE nombre = ? AND apellido = ?',
    [nombre, apellido]
  );
  return rows[0] || null;
}

export async function actualizarUsuario(id, { nombre, apellido, correo }) {
  await db.execute(
    `UPDATE usuarios 
     SET nombre = ?, apellido = ?, correo = ? 
     WHERE id = ?`,
    [nombre, apellido, correo, id]
  );
}

export async function actualizarPassword(id, nuevaPasswordHasheada) {
  await db.execute(
    'UPDATE usuarios SET password = ? WHERE id = ?',
    [nuevaPasswordHasheada, id]
  );
}

export async function obtenerPorId(id) {
  const [rows] = await db.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0] || null;
}

export async function obtenerDatosPorId(id) {
  const [rows] = await db.execute('SELECT id, nombre, apellido, correo FROM usuarios WHERE id = ?', [id]);
  return rows[0] || null;
}
