# Developer documentation

## Getting Started

AirLab application is split into four separate packages:

- **shared**: common package used by other three packages.
- **backend**: main API gateway. Deployed in a separate container.
- **worker**: background worker that handles long-running tasks, like sending emails. Deployed in a separate container.
- **frontend**: front-end Vue application, served as a static content by nginx server.

There are other services deployed together with AirLab application:

- Postgres database
- Redis (cache/pub-sub)
- RabbitMQ (job queue)
- Traefik (load-balancer)
- pgAdmin (Postgres admin app)
- RedisInsight (Redis admin app)
- Portainer (Docker admin app)

!!! info "Info"
    Services configuration is defined in `.deploy/shared.yml` file. Please also check `.deploy/development.yml`, `.deploy/production.yml` or `.deploy/staging.yml` depending on your deployment scenario.

Three deployment configurations are available by default: `development`, `staging` and `production`.
It is highly recommended to use `make` commands (see `Makefile` for available options) to manage all tasks.

By default, there is a [.env.template](https://github.com/BodenmillerGroup/airlab-web/blob/master/.env.template) file in the repo with default values.
Please rename it to `.env` and set all environment variables values according to your needs and server configuration.

!!! warning "Warning"
    `.env` file is ignored by Git in order to avoid putting sensitive information to Git repository!

As you can see, some variables values are duplicated across several env variables.
This is due to some existing limitations: for instance, in order for a Webpack bundler to inject env variable values into the compiled Vue front-end application, they should have a prefix `VUE_APP_`.
This could be improved in the future for sure.

!!! important "Important"
    Main setting you should care about is `DOMAIN` environment variable. In case of local development (with hot-reloading dev proxy server) it should be set to `localhost`.

- [.env.template](https://github.com/BodenmillerGroup/airlab-web/blob/master/.env.template)

## Development deployment

Local development deployment supports debugging and hot-reloading both on back-end and front-end. To get a local development instance up and running please follow the following steps.

Recommended and tested environment for development and deployment is Ubuntu Linux distribution. If you are going to use another OS or distribution please make changes accordingly. Make sure that the following tools are installed globally on your machine:

* [Docker](https://docs.docker.com/engine/install/ubuntu/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* [Node.js LTS](https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
* [Yarn Classic (v1)](https://classic.yarnpkg.com/en/docs/install#debian-stable)
* [Lerna](https://lerna.js.org/#getting-started)

### Installation

Clone the AirLab repo
```sh
git clone https://github.com/BodenmillerGroup/airlab-web.git
```

Install all necessary NPM packages on your local machine
```sh
make bootstrap
```

Deploy development Docker containers locally 
```sh
make deploy-development
```

Run database migrations to initialize database 
```sh
make db-migration
```

One can access locally deployed version of AirLab at [http://localhost](http://localhost).

Run development version of front-end app (with automatic hot-reloading).
```sh
make serve-frontend
```

One can access locally deployed version of AirLab with hot-reloading and debugging capabilities at [http://localhost:9999](http://localhost:9999).
Please keep in mind that this functionality is only supported on local machines with `DOMAIN` env variable set to `localhost`!


## Staging deployment

`staging` build is used to test production build of AirLab in environment similar to `production` environment, but it runs on a separate test server.
The difference is another domain name address.

Unlike production deployment, staging deployment doesn't require pre-build Docker images as it will build them during deployment process.

### Installation

Clone the AirLab repo
```sh
git clone https://github.com/BodenmillerGroup/airlab-web.git
```

Later on you can update the repo by running:
```sh
git pull
```

Rename `.env.template` file in the root repo folder to `.env` and set all environment variables values accordingly to staging configuration. (Usually it should be done only once as `.env` file is ignored by Git and it won't be overwritten by `git pull` command).

!!! warning "Warning"
    Please check that env variable `DOMAIN` is properly set in `.env` file on staging server before deployment!

Build and deploy Docker containers on the staging server:
```sh
make deploy-staging
``` 


## Production deployment

### Preparing production Docker images

Production deployment requires pre-build production Docker images to be available. Images names are defined by the following env variables:

- DOCKER_IMAGE_BACKEND
- DOCKER_IMAGE_WORKER
- DOCKER_IMAGE_FRONTEND

!!! important "Important"
    It is strongly recommended to use tagged Docker images in production deployment scenario to enforce stability! `DOCKER_TAG` env variable in `.env` file defines Docker image tag used during build and deployment. 

In order to build these images and then push them to Docker image registry (e.g. Docker Hub), run the following command in your development environment:
```sh
make build-push
```

This operation should be done each time you are planning to release new production version.

### Installation

As soon as Docker images are build and published to a registry, one can deploy production version of AirLab by running the following commands on a production server:

Clone the AirLab repo
```sh
git clone https://github.com/BodenmillerGroup/airlab-web.git
```

Later on you can update the repo by running:
```sh
git pull
```

Rename `.env.template` file in the root repo folder to `.env` and set all environment variables values accordingly to production configuration. (Usually it should be done only once as `.env` file is ignored by Git and it won't be overwritten by `git pull` command).

!!! warning "Warning"
    Please check that env variable `DOMAIN` is properly set in `.env` file on production server before deployment!

Deploy production Docker containers 
```sh
make deploy-production
```

Run database migrations to initialize database (usually should be used only once during first deployment).
```sh
make db-migration
```

!!! info "Info"
    Production deployment doesn't support debugging and hot-reloading because it is compiled to minimize bundle size and optimize performance. 
