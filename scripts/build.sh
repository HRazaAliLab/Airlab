#! /usr/bin/env bash

# Exit in case of error
set -e

TAG=${TAG-latest} docker-compose -f .deploy/build.yml config > docker-stack.yml

docker-compose -f docker-stack.yml build
