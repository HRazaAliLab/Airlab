#! /usr/bin/env bash

# Exit in case of error
set -e

source /etc/airlab.sh

docker compose \
-f .deploy/shared.yml \
-f .deploy/staging.yml \
config > docker-stack.yml

docker compose -f docker-stack.yml up -d
