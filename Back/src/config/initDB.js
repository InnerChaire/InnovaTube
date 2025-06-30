import db from './db.js';

export async function inicializarTablas() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      apellido VARCHAR(100) NOT NULL,
      correo VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      UNIQUE(nombre, apellido)
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS favoritos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      video_id VARCHAR(50) NOT NULL,
      titulo VARCHAR(255),
      url TEXT,
      UNIQUE(usuario_id, video_id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS historial (
      id INT AUTO_INCREMENT PRIMARY KEY,
      usuario_id INT NOT NULL,
      video_id VARCHAR(50) NOT NULL,
      titulo VARCHAR(255),
      url TEXT,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
    )
  `);
}
