# Dockerfile
FROM node:latest

# Çalışma dizinini belirtin
WORKDIR /usr/src/app

# package.json ve package-lock.json'ı kopyalayın ve bağımlılıkları yükleyin
COPY package*.json ./
RUN npm install

# Proje dosyalarını kopyalayın
COPY . .

# Next.js uygulamasını başlatın
CMD ["npm", "run", "dev"]