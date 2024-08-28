FROM node:16.20.2 AS build


# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el código fuente de la aplicación al contenedor
COPY . .

# Construir la aplicación Angular
RUN npm run build -- --output-path=dist

# Etapa 2: Servidor NGINX
FROM nginx:alpine

# Copiar los archivos compilados de la aplicación desde la etapa de construcción
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar el archivo de configuración de NGINX personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]