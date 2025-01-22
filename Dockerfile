# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Crea y establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias
RUN npm install

# Expone el puerto en el que corre el servicio (ejemplo: 3000)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
