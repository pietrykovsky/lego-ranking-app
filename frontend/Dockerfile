FROM node:18-alpine3.15

WORKDIR /app/frontend

COPY package.json ./
COPY package-lock.json ./
RUN npm install 
RUN npm install react-scripts@3.4.1 -g 
COPY . ./
RUN npm run build