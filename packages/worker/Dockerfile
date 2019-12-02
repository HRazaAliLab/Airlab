FROM node:12.13.1-alpine3.10
LABEL maintainer="Anton Rau <anton.rau@gmail.com>"

RUN yarn global add pm2@4.2.0

WORKDIR /app

COPY package.json lerna.json yarn.lock ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/worker/package.json ./packages/worker/

RUN yarn install --non-interactive

COPY packages/shared ./packages/shared/
COPY packages/worker ./packages/worker/

# Comment out the next line to disable tests
# RUN yarn test:worker

RUN yarn build:worker
