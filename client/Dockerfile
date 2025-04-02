# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto en el que corre tu aplicación
EXPOSE 5173

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]