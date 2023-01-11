# Available commands

## Environment

| Command            | Description                                             |
|--------------------|---------------------------------------------------------|
| `npm run start`    | Start the Docker environment                            |
| `npm run stop`     | Stop the Docker environment                             |
| `npm run status`   | Print the Docker environment status                     |
| `npm run drop`     | Drop the Docker environment (*container, data, volume*) |

## Terminal
| Command   | Description                              |
|-----------|------------------------------------------|
| `zsh:api` | Enter the **API** container with **ZSH** |
| `zsh:app` | Enter the **APP** container with **ZSH** |
| `psql:db` | Enter the **DB** container with **PSQL** |

## Code

| Command            | Description                        |
|--------------------|------------------------------------|
| `npm run lint`     | Lint the code                      |
| `npm run test`     | Run the unit tests                 |
| `npm run test:e2e` | Run the e2e tests                  |
| `npm run sync`     | Sync dependencies with local store |

## Database Schema

| Command            | Description                         |
|--------------------|-------------------------------------|
| `schema:create`    | Create the schema into the database |

## Repository Nx

These commands are used by others commands, don't use them directly.

| Command        | Description                         |
|----------------|-------------------------------------|
| `build:api`    | Create the schema into the database |


"": "pnpm nx build --project=api",
"build:app": "pnpm nx build --project=app",
"start:api": "pnpm nx serve --project=api",
"start:app": "pnpm nx serve --project=app --host 0.0.0.0 --poll 2000"
