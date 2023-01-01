FROM node:lts-buster-slim AS development

WORKDIR /app

RUN --mount=type=cache,id=pnpm-store,target=/pnpm-store\

RUN apt-get update && apt-get install -y wget vim
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.3/zsh-in-docker.sh)"

RUN npm install -g pnpm

COPY .npmrc package.json pnpm-*.yaml ./
ADD patches /app/patches

RUN pnpm config set store-dir /pnpm-store
RUN pnpm install --frozen-lockfile --store /pnpm-store

COPY . .

RUN pnpm run build:api
