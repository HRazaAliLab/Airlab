#! /usr/bin/env bash

# Exit in case of error
set -e

NODE_ENV=staging \
TAG=${DOCKER_TAG-latest} \
docker-compose -f .deploy/build-staging.yml config > docker-stack.yml

docker-compose -f docker-stack.yml build --parallel
