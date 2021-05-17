FROM node:14.17.0-alpine3.13
LABEL maintainer="Anton Rau <anton.rau@gmail.com>"

RUN yarn global add pm2@4.5.6

WORKDIR /app

COPY package.json lerna.json yarn.lock ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/backend/package.json ./packages/backend/

RUN yarn install --frozen-lockfile --non-interactive

COPY packages/shared ./packages/shared/
COPY packages/backend ./packages/backend/

# Comment out the next line to disable tests
# RUN yarn test:backend

RUN yarn build:backend
