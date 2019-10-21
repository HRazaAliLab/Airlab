FROM node:12.12.0-alpine
LABEL maintainer="Anton Rau <anton.rau@gmail.com>"

WORKDIR /app

COPY package.json lerna.json yarn.lock ./
COPY packages/backend/package.json ./packages/backend/

RUN yarn install --non-interactive

COPY packages/backend ./packages/backend/

# Comment out the next line to disable tests
# RUN yarn test:backend

RUN yarn build:backend
