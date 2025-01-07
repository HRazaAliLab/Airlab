#! /usr/bin/env bash

# Exit in case of error
set -e

source /etc/airlab.sh

NODE_ENV=production \
docker compose -f .deploy/build.yml config > docker-stack.yml

docker compose -f docker-stack.yml build --parallel
