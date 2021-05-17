# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.17.0-alpine3.13 as build-stage

WORKDIR /app

COPY package.json lerna.json yarn.lock ./
COPY packages/shared/package.json ./packages/shared/
COPY packages/frontend/package.json ./packages/frontend/

RUN yarn install --frozen-lockfile --non-interactive

COPY packages/shared ./packages/shared/
COPY packages/frontend ./packages/frontend/

ARG VUE_APP_NAME
ENV VUE_APP_NAME=${VUE_APP_NAME}

ARG VUE_APP_PROTOCOL
ENV VUE_APP_PROTOCOL=${VUE_APP_PROTOCOL}

ARG VUE_APP_DOMAIN
ENV VUE_APP_DOMAIN=${VUE_APP_DOMAIN}

# Comment out the next line to disable tests
# RUN yarn test:frontend

RUN yarn build:frontend



# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.20.0-alpine

LABEL maintainer="Anton Rau <anton.rau@uzh.ch>"

COPY --from=build-stage /app/packages/frontend/dist/ /usr/share/nginx/html

COPY ./packages/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./packages/frontend/nginx-backend-not-found.conf /etc/nginx/extra-conf.d/backend-not-found.conf
