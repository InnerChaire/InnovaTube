import * as usuarioService from '../services/usuarioService.js';

export async function registrarUsuario(req, res) {
  const { nombre, apellido, correo, password } = req.body;
  try {
    const usuario = await usuarioService.registrar({ nombre, apellido, correo, password });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function loginUsuario(req, res) {
  const { correo, password } = req.body;
  try {
    const { token, usuario } = await usuarioService.login({ correo, password });
    res.json({ token, usuario });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

export async function actualizarUsuario(req, res) {
  const usuarioId = req.usuario.id;
  const datos = req.body;

  try {
    await usuarioService.actualizarPerfil(usuarioId, datos);
    res.json({ mensaje: 'Datos actualizados correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function obtenerPerfil(req, res) {
  try {
    const usuario = await usuarioService.obtenerPerfil(req.usuario.id);
    res.json(usuario);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

