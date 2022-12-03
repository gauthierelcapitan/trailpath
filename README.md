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
```
