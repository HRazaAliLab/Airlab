FROM node:12.13.1-alpine
LABEL maintainer="Anton Rau <anton.rau@gmail.com>"

RUN yarn global add pm2@4.2.0

WORKDIR /app

COPY package.json lerna.json yarn.lock ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/backend/package.json ./packages/backend/

RUN yarn install --non-interactive

COPY packages/shared ./packages/shared/
COPY packages/backend ./packages/backend/

# Comment out the next line to disable tests
# RUN yarn test:backend

RUN yarn build:backend
