PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

deploy-development:
	./scripts/deploy-development.sh

deploy-production:
	./scripts/deploy-production.sh

deploy-staging:
	./scripts/deploy-staging.sh

build:
	./scripts/build.sh

build-push:
	./scripts/build-push.sh

clean:
	sudo find . -type d -name node_modules -exec rm -rf {} \+
	sudo find . -type d -name dist -exec rm -rf {} \+
	rm docker-stack.yml
