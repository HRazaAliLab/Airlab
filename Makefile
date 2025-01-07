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
	docker exec -it airlab-backend-1 yarn run migration:run

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

# Build Docker images and push them to Docker Hub
build-push:
	./scripts/build-push.sh

# Clean local development environment
clean:
	sudo find . -type d -name node_modules -exec rm -rf {} \+
	sudo find . -type d -name dist -exec rm -rf {} \+
	rm docker-stack.yml

# Some Docker-related helper commands
start:
	docker ps -qa | xargs docker start

stop:
	docker ps -q | xargs docker stop

restart:
	docker ps -qa | xargs docker restart
