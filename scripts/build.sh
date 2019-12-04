#! /usr/bin/env bash

# Exit in case of error
set -e

NODE_ENV=production \
TAG=${TAG-latest} \
docker-compose -f .deploy/build.yml config > docker-stack.yml

docker-compose -f docker-stack.yml build
