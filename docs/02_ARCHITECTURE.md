# Architecture

## Reverse proxy

[Traefik](https://doc.traefik.io/traefik/) is used as reverse proxy and edge router. 

[Traefik.me](https://traefik.me/) is used as domain name to support SSL using with wildcard DNS.

After launching the dev environment, Traefik UI is available at [http://localhost:8080](http://localhost:8080/dashboard/#/) 

## Database

[PostgreSQL](https://www.postgresql.org/) is used as relational SQL database.

Database :
* Host : **trail-path-db** *or **localhost** outside containers*
* Port : **5432**
* User : **postgres**
* Password : **postgres**
* Database : **trailpath**

[pgAdmin](https://www.pgadmin.org/) is used as Database administration tools and is available at [http://pgadmin.traefik.me/](http://pgadmin.traefik.me/)

To get started, login using : 

* Login : **admin@trailpath.run** 
* Password : **admin**

## API

## APP
