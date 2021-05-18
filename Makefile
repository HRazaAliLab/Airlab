PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

# Bootstrap the packages in the current Lerna repo. Installing all their dependencies and linking any cross-dependencies.
bootstrap:
	yarn bootstrap

# Deploy development version on a local machine
deploy-development:
	./scripts/deploy-development.sh

# Run database migrations
db-migration:
	docker exec -it airlab_backend_1 yarn run migration:run

# Serve development version of front-end app
serve-frontend:
	yarn run serve:frontend

# Deploy production version
deploy-production:
	./scripts/deploy-production.sh

# Deploy staging version
deploy-staging:
	./scripts/deploy-staging.sh

# Build Docker images
build:
	./scripts/build.sh

build-staging:
	./scripts/build-staging.sh

# Build Docker images and push them to Docker Hub
build-push:
	./scripts/build-push.sh

build-staging-push:
	./scripts/build-staging-push.sh

# Clean local development environment
clean:
	sudo find . -type d -name node_modules -exec rm -rf {} \+
	sudo find . -type d -name dist -exec rm -rf {} \+
	rm docker-stack.yml

# Some Docker-related helper commands
stop:
	docker container stop $(docker container ls -aq)

restart:
	docker container restart $(docker container ls -aq)
