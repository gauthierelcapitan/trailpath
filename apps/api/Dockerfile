FROM node:lts-buster-slim AS development

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN apt-get update && apt-get install -y wget
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.3/zsh-in-docker.sh)"

RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm run build:api

