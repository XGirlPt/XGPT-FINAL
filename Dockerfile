# Utiliser une image de base Node.js dev
FROM node:18-alpine

# Installer les dépendances système nécessaires pour node-gyp et canvas
RUN apk add --no-cache python3 make g++ pkgconf cairo-dev pango-dev pixman-dev jpeg-dev giflib-dev

# Lier python3 à python pour node-gyp
RUN ln -sf python3 /usr/bin/python

# Définir le répertoire de travail
WORKDIR /src/app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire le projet
RUN npm run build

# Exposer le port sur lequel l'application va tourner
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "start"]

# Instructions pour exécuter le conteneur après sa création (en commentaire)
# docker run -d --name Supportxjs-app --env-file /path/to/.env -p 3001:3000 nextjs-app:latest