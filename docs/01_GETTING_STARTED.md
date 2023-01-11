# Getting Started

## Requirements

You must use Docker and Node.js (npm) to install and run this project as local dev environnement.

You must have the port 80, 443 and 8080  available on local dev environnement :

```sh
# Check if port 80, 443 or 8080 are used 
lsof -nP -iTCP -sTCP:LISTEN | grep 443
```

Please make sure to fulfill all these requirements:

- [Install Docker](https://docs.docker.com/get-docker/)
- [Install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)

## Quick start

```sh
# Deploy and start devs containers
npm run start

# Create the database
npm run schema:create

# The application is available
curl https://app.traefik.me
```
