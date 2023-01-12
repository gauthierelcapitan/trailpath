# Repository

This code repository use [Nx](https://nx.dev/) as build system

## Library

```shell
# Enter the container
npm run zsh:api

# Create a new library
pnpm nx generate @nrwl/workspace:lib ign-elevation

# Run library test 
pnpm nx run ign-elevation:test --output-style=static
```

pnpm config set store-dir /pnpm-store/v3 --global
