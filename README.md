## Trail Path project


### Commands 
```shell

# start dev
pnpx nx serve
```

### Setup

#### Requirement
```shell
vi ~/.aliases
alias pnx="pnpm nx --"
source ~/.aliases
```

```shell

# install plugins
pnpx create-nx-workspace@latest
pnpm install -D @nrwl/vite
pnpm install -D vite
pnpm install -D vitest
pnpm install -D nx
pnpm install -D typescript
pnx g @nrwl/vite:init
pnpm install -D @vitejs/plugin-react
pnpm install -D @vanilla-extract/vite-plugin

# create api
pnpm install -D @nrwl/nest
pnx g @nrwl/nest:app trail-path-api --frontendProject trail-path-front

# launch dev 
pnx serve

# launch prod
pnx serve --configuration production

# launch front / api
pnx run-many --target=serve --projects=trail-path-front,trail-path-api

# lint all
pnx run-many --target=lint --projects=app,api

pnpm i --frozen-lockfile
```

### Launch dev
```shell
docker-compose up

# Sync dependencies
docker cp $(docker-compose ps -q app):/app/node_modules ./
```

App will be available at : [https://app.traefik.me]
Api will be available at : [https://api.traefik.me/api]


https://dev.to/jonlauridsen/exploring-the-typescript-monorepo-a-practical-hands-on-adventure-your-help-is-needed-2ggb
https://github.com/gaggle/exploring-the-monorepo/tree/attempt-perfect-docker

pnpx nx generate @nrwl/workspace:lib api-interface


pnpm nx run gpx-distance:test --output-style=static
pnpm nx run gpx-distance:lint 



https://gitlab.com/sbrl/line-simplification/-/blob/master/simplify_line.js

https://gpstraces.net/comparaison-douglas-peucker-vs-visvalingam-whyatt
