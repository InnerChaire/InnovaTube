import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import db from './config/db.js';
import usuarios from './routes/usuarios.js';
import favoritosRoutes from './routes/favoritos.js';
import historialRoutes from './routes/historial.js';
import { inicializarTablas } from './config/initDB.js';

const app = express();
const corsOptions = {
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   allowedHeaders: ['Authorization', 'Content-Type'],
   optionSuccessStatus: 200
}
const PORT = process.env.PORT || 3000;

// Verificar conexión a la base de datos
try {
  const connection = await db.getConnection();
  console.log('Conexión a la base de datos MySQL establecida');
  await inicializarTablas();
  console.log('Tablas creadas/verificadas');
  connection.release();
} catch (error) {
  console.error('Error al conectar a la base de datos:', error.message);
  process.exit(1);
}

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/favoritos', favoritosRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/usuarios', usuarios); 
// Ruta base
app.get('/', (req, res) => {
  res.send('¡Bienvenido a InnovaTube!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
