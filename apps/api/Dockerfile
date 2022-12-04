FROM node:lts-buster-slim AS development

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN  npm install -g pnpm &&\
     pnpm install

COPY . .

RUN pnpm run build:api

