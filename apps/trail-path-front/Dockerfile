FROM node:18-alpine3.15 As development

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN  npm install -g pnpm &&\
     pnpm install minimist &&\
  pnpm install

COPY . .

RUN pnpm run build:front
