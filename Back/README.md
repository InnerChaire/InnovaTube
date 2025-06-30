# InnovaTube - Backend

API RESTful para una aplicación buscadora de videos de YouTube, con funcionalidades de registro/login de usuarios, favoritos e historial de reproducción.

---

## Tecnologías utilizadas

- **Node.js** 22.17.0
- **Express.js**
- **MySQL** 8
- **Docker & Docker Compose**
- **JWT** (autenticación)
- **bcryptjs**
- **YouTube Data API v3** (cliente externo)
- **ES Modules (`type: module`)**

---

## Instalación local (sin Docker)

```bash
# 1. Clona el repositorio
git clone https://github.com/InnerChaire/InnovaTube.git
cd Back

# 2. Instala dependencias
npm install

# 3. Configura tus variables de entorno
cp .env.example .env
# luego edita .env con tus valores

# 4. Corre el servidor
npm run dev
