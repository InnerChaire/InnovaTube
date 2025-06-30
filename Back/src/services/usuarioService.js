import bcrypt from 'bcryptjs';
import * as usuarioRepo from '../repositories/usuarioRepository.js';
import { generarToken } from '../config/jwt.js';

export async function registrar({ nombre, apellido, correo, password }) {
  const existenteCorreo = await usuarioRepo.buscarPorCorreo(correo);
  if (existenteCorreo) throw new Error('Este correo ya está registrado');

  const existenteNombre = await usuarioRepo.buscarPorNombreApellido(nombre, apellido);
  if (existenteNombre) throw new Error('Ya existe un usuario con este nombre y apellido');

  const hashed = await bcrypt.hash(password, 10);
  const usuario = await usuarioRepo.crear({ nombre, apellido, correo, password: hashed });

  const token = generarToken({ id: usuario.id, correo: usuario.correo });

  return { usuario, token };
}


export async function login({ correo, password }) {
  const usuario = await usuarioRepo.buscarPorCorreo(correo);
  if (!usuario) throw new Error('Correo no encontrado');

  const validado = await bcrypt.compare(password, usuario.password);
  if (!validado) throw new Error('Contraseña incorrecta');

  const token = generarToken({ id: usuario.id, correo: usuario.correo });
  return { token, usuario: { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo } };
}

export async function actualizarPerfil(usuarioId, datos) {
  const usuario = await usuarioRepo.obtenerPorId(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');

  if (datos.correo && datos.correo !== usuario.correo) {
    const existente = await usuarioRepo.buscarPorCorreo(datos.correo);
    if (existente) throw new Error('Este correo ya está en uso');
  }

  await usuarioRepo.actualizarUsuario(usuarioId, {
    nombre: datos.nombre || usuario.nombre,
    apellido: datos.apellido || usuario.apellido,
    correo: datos.correo || usuario.correo
  });

  if (datos.password_actual && datos.nueva_password) {
    const coincide = await bcrypt.compare(datos.password_actual, usuario.password);
    if (!coincide) throw new Error('La contraseña actual es incorrecta');

    const nuevaPasswordHasheada = await bcrypt.hash(datos.nueva_password, 10);
    await usuarioRepo.actualizarPassword(usuarioId, nuevaPasswordHasheada);
  }
}

export async function obtenerPerfil(usuarioId) {
  const usuario = await usuarioRepo.obtenerDatosPorId(usuarioId);
  if (!usuario) throw new Error('Usuario no encontrado');
  return usuario;
}
