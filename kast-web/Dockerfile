# build environment
FROM node:14.0.0-alpine3.11 as build-deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY src src
COPY public public
COPY scripts scripts
COPY config-overrides.js tsconfig.json ./
COPY .env* ./

FROM build-deps as build
ARG buildEnv
RUN yarn build:$buildEnv

# production environment
FROM nginx:1.17.10-alpine
ARG buildEnv
COPY config/etc-$buildEnv etc
ARG buildPath
COPY --from=build app/build /usr/share/nginx/html$buildPath
CMD ["nginx", "-g", "daemon off;"]
