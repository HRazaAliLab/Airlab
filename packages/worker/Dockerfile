FROM node:14.17.0-alpine3.13
LABEL maintainer="Anton Rau <anton.rau@uzh.ch>"

#RUN yarn global add pm2@4.2.3

WORKDIR /app

COPY package.json lerna.json yarn.lock ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/worker/package.json ./packages/worker/

RUN yarn install --frozen-lockfile --non-interactive

COPY packages/shared ./packages/shared/
COPY packages/worker ./packages/worker/

# Comment out the next line to disable tests
# RUN yarn test:worker

RUN yarn build:worker
