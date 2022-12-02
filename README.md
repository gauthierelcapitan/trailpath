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

# launch dev 
pnx serve
```
