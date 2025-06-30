# Imagen base
FROM node:22

# Crear directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de tu API
EXPOSE 3000

# Comando por defecto para producción
CMD ["npm", "start"]
