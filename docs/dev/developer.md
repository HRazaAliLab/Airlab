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
    Services configuration is defined in `.deploy/shared.yml`file. 

Three deployment configurations are available by default: `development`, `staging` and `production`.
It is highly recommended to use `make` commands (see `Makefile` for available options) to manage all tasks.

Please set environment variables accordingly either in `.env` file in the project root folder or globally in `/etc/environment` file (please don't forget to restart terminal session in order for env variables to take effect).

As you can see, some variables values are duplicated across several env variables.
This is due to some existing limitations: for instance, in order for a Webpack bundler to inject env variable values into the compiled Vue front-end application, they should have a prefix `VUE_APP_`.
This could be improved in the future for sure.

!!! warning "Warning"
    Avoid storing sensitive information (i.e. passwords, API secrets, etc.) in `.env` file if it committed to Git repository!

## Configuration

In order to tweak the platform according to your needs, please modify environment variables configured in the project root `.env` file:

- [.env](https://github.com/BodenmillerGroup/airlab-web/blob/master/.env)

## Development deployment

To get a local development copy up and running please follow the following steps.

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

Install all necessary NPM packages
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

Run development version of front-end app (with automatic hot-reloading)
```sh
make serve-frontend
```

Access locally deployed version of AirLab at [http://localhost:9999](http://localhost:9999)


## Production deployment

Production deployment requires pre-build production Docker images to be available. Images names are defined by the following env variables:

- DOCKER_IMAGE_BACKEND
- DOCKER_IMAGE_WORKER
- DOCKER_IMAGE_FRONTEND

!!! info "Info"
    DOCKER_TAG env variable defines Docker image tag used during build and deployment. 

In order to build these images and then push them to Docker image registry (e.g. Docker Hub), run the following command in your development environment:
```sh
make build-push
```

As soon as Docker images are build and published to a registry, one can deploy production version of AirLab by running the following command on a production server:
```sh
make deploy-production
```

!!! warning "Warning"
    Please check that env variables DOMAIN, VUE_APP_DOMAIN, DOMAIN_PROD, etc. are properly set on production server before deployment! 


## Staging deployment

`staging` build is used to test production build of AirLab in environment similar to `production` environment, but it runs on a separate test server.
The difference is another domain name address.

Staging deployment requires pre-build staging Docker images to be available. Images names are defined by the following env variables:

- DOCKER_IMAGE_BACKEND_STAGING
- DOCKER_IMAGE_WORKER_STAGING
- DOCKER_IMAGE_FRONTEND_STAGING

!!! info "Info"
    DOCKER_TAG env variable defines Docker image tag used during build and deployment. 

In order to build these images and then push them to Docker image registry (e.g. Docker Hub), run the following command in your development environment:
```sh
make build-staging-push
```

As soon as Docker images are build and published to a registry, one can deploy staging version of AirLab by running the following command on a test server:
```sh
make deploy-staging
```

!!! warning "Warning"
    Please check that env variables DOMAIN, VUE_APP_DOMAIN, DOMAIN_STAGE, etc. are properly set on production server before deployment! 
