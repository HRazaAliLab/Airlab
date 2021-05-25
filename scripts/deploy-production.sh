#! /usr/bin/env bash

# Exit in case of error
set -e

NODE_ENV=production \
TAG=${DOCKER_TAG-latest} \
docker-compose \
-f .deploy/shared.yml \
-f .deploy/production.yml \
config > docker-stack.yml

docker-compose -f docker-stack.yml up -d
